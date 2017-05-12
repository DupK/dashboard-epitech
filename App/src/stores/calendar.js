/**
 * Created by desver_f on 26/01/17.
 */
import _ from 'lodash';
import storage from 'react-native-simple-store';
import autobind from 'autobind-decorator';
import moment from 'moment';
import { action, computed, observable } from 'mobx';
import ui from './uiState';
import { WEEK_DAYS } from '../features/calendar/constants';
import { wasRegistered } from '../features/calendar/utils';
import * as Intra from '../api/intra';

export const CALENDAR_START = moment().subtract(3, 'w');
export const CALENDAR_END = moment().add(3, 'w');

@autobind
class Calendar {

    @observable rawCalendar = null;
    @observable calendar = null;
    @observable startingDate = moment();
    @observable selectedDate = moment();
    @observable datePickerVisible = false;

    lastFetchedStart = CALENDAR_START;
    lastFetchedEnd = CALENDAR_END;

    @action
    async fetchCalendar(start = CALENDAR_START, end = CALENDAR_END) {
        try {

            this.lastFetchedStart = start.isBefore(this.lastFetchedStart) ?
                                    start :
                                    this.lastFetchedStart;
            this.lastFetchedEnd = end.isAfter(this.lastFetchedEnd) ? end : this.lastFetchedEnd;

            const rawCalendar = await Intra.fetchCalendar(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));

            await storage.save('calendar', rawCalendar);

            this.setCalendarFields(rawCalendar);

        } catch (e) {
            console.error(e);
        }
    }

    async retrieveCalendarFromCache() {
        const rawCalendar = await storage.get('calendar');

        if (rawCalendar) {
            this.setCalendarFields(rawCalendar);
        }
    }

    @action
    setCalendarFields(calendar) {
        this.rawCalendar = calendar;
        this.calendar = this.remapCalendar(calendar);
    }

    isRegistered(canRegister, registeredState) {
        if (registeredState === 'registered' || registeredState === 'present') {
            return registeredState;
        }

        if (!canRegister) {
            return 'forbidden';
        }

        return 'unregistered';
    }

    //Put english events at back so they're rendered in the last row on the calendar
    //in order to prioritize more important event
    remapRangesWithEnglishEventsAtBack(eventsRanges) {
        const [englishRanges, othersRanges] = _.partition(eventsRanges, (events) => (
            events.every((event) => event.codeModule.includes('B-ANG'))
        ));

        return [...othersRanges, ...englishRanges];
    }

    groupByRangesOfConsecutiveEvents(overlappingEvents) {

        if (overlappingEvents.length === 1) {
            return [overlappingEvents];
        }

        const sortedEvents = _.orderBy(overlappingEvents, [
            (date) => date.start,
            (date) => date.end,
        ], ['asc', 'asc']);

        let event = _.first(sortedEvents);
        let consecutiveRanges = [event];

        const markedEvents = [event.uid];
        const rangeOfConsecutiveEvents = [];

        while (markedEvents.length < sortedEvents.length) {

            const consecutiveEvent = sortedEvents.find((consEvent) => (
                (event.end === consEvent.start || consEvent.start >= event.end)
                && !markedEvents.includes(consEvent.uid)
            ));

            if (consecutiveEvent) {
                consecutiveRanges.push(consecutiveEvent);
                markedEvents.push(consecutiveEvent.uid);
                event = consecutiveEvent;
            } else {
                //take the one that starts and ends ealier amoung the remainings events
                event = _.first(sortedEvents.filter(({ uid }) => !markedEvents.includes(uid)));
                rangeOfConsecutiveEvents.push(consecutiveRanges);
                consecutiveRanges = [event];
                markedEvents.push(event.uid);

                if (markedEvents.length >= sortedEvents.length) {
                    rangeOfConsecutiveEvents.push(consecutiveRanges);

                    return this.remapRangesWithEnglishEventsAtBack(rangeOfConsecutiveEvents);
                }
            }

        }

        consecutiveRanges.length && rangeOfConsecutiveEvents.push(consecutiveRanges);

        return this.remapRangesWithEnglishEventsAtBack(rangeOfConsecutiveEvents);
    }

    groupByOverlappingRanges(events) {
        const endDatesValues = events.map((r) => moment(r.end).unix()).sort((a, b) => a - b);
        const datesRanges = events.sort((a, b) => moment(a.start).unix() - moment(b.start).unix());

        let i = 0,
            j = 0,
            n = datesRanges.length,
            active = 0;
        let groups = [],
            cur = [];
        while (true) {
            if (i < n && moment(datesRanges[i].start).unix() < endDatesValues[j]) {
                cur.push(datesRanges[i++]);
                ++active
            } else if (j < n) {
                ++j;
                if (--active === 0) {
                    groups.push(cur);
                    cur = []
                }
            } else {
                break
            }
        }
        return groups
    }

    remapCalendar(rawCalendar) {
        const remappedCalendar = _(rawCalendar)
            .filter((event) => event.start && event.module_registered)
            .map((event) => ({
                title: event.acti_title,
                type: event.type_title,
                module: event.titlemodule,
                instance: event.codeinstance,
                codeModule: event.codemodule,
                codeEvent: event.codeevent,
                activity: event.codeacti,
                year: event.scolaryear,
                start: event.start,
                end: event.end,
                date: moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'),
                room: event.room,
                duration: moment(event.end).diff(moment(event.start), 'minutes'),
                uid: event.codeevent,
                registered: this.isRegistered(event.allow_register, event.event_registered),
            }))
            .groupBy((event) => moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'))
            .toPairs()
            .map(([date, events]) => {
                const eventsGroupedByOverlappingTimes = this.groupByOverlappingRanges(events);
                const consecutiveEventsRanges = eventsGroupedByOverlappingTimes.map((range) => (
                    this.groupByRangesOfConsecutiveEvents(range)
                ));

                return [
                    date,
                    consecutiveEventsRanges
                ];
            })
            .fromPairs()
            .value();

        return {
            ...this.calendar,
            ...remappedCalendar
        }
    }

    @computed get hasEventsPerDay() {
        return _(this.datesForWeek)
            .map((date) => {
                const formattedDate = date.format('DD-MM-YYYY');
                const registeredEvents = _(this.calendar[formattedDate])
                    .flatMap((rangeEvents) => (
                        _.flatMap(rangeEvents, (events) => (
                            events.map((event) => event.registered)
                        )))
                    )
                    .value();
                const isRegisteredToAnEvent = _.some(registeredEvents, (registered) => (
                    wasRegistered(registered)
                ));

                return [
                    date,
                    isRegisteredToAnEvent
                ]
            })
            .fromPairs()
            .value();
    }

    @computed get nextEvent() {
        const flattenedEvents = _(this.calendar)
            .flatMap((dayWithEvents) => (
                _.flatMap(dayWithEvents, (events) => (
                    _.flatMap(events, (event) => event))
                )
            ))
            .orderBy((event) => event.start)
            .value();

        const nextEvent = _.find(flattenedEvents, (event) => (
            moment(event.start, 'YYYY-MM-DD HH:mm:ss').isAfter() &&
            event.registered === 'registered'
        ));

        return nextEvent
            ? `Your next event \"${nextEvent.title}\" starts ${moment(nextEvent.start).fromNow()}`
            : 'You\'re not registered to any future events';
    }

    //Set startingDate to the previous week
    @action
    async previousWeek() {
        const prevWeek = moment(this.startingDate).subtract(1, 'w');
        const shouldFetchMore = moment(prevWeek).isBefore(moment(this.lastFetchedStart));
        this.startingDate = prevWeek;
        this.selectedDate = prevWeek;

        if (shouldFetchMore) {
            try {
                ui.fetchingState();
                await this.fetchCalendar(moment(prevWeek).subtract(1, 'M'), this.lastFetchedStart);
                ui.defaultState();
            } catch (e) {
                console.error(e);
            }
        }
    }

    //Set startingDate to the next week
    @action
    async nextWeek() {
        const nextWeek = moment(this.startingDate).add(1, 'w');
        const shouldFetchMore = moment(nextWeek).isAfter(moment(this.lastFetchedEnd));
        this.startingDate = nextWeek;
        this.selectedDate = nextWeek;

        if (shouldFetchMore) {
            try {
                ui.fetchingState();
                await this.fetchCalendar(this.lastFetchedEnd, moment(nextWeek).add(1, 'M'));
                ui.defaultState();
            } catch (e) {
                console.error(e);
            }
        }

    }

    @action
    async previousMonth() {
        const prevMonth = moment(this.startingDate).subtract(1, 'M');
        const shouldFetchMore = moment(prevMonth).isBefore(moment(this.lastFetchedStart));
        this.startingDate = prevMonth;
        this.selectedDate = prevMonth;

        if (shouldFetchMore) {
            const nextDate = moment(prevMonth).subtract(1, 'M').startOf('isoWeek');

            try {
                ui.fetchingState();
                await this.fetchCalendar(nextDate, this.lastFetchedStart);
                ui.defaultState();
            } catch (e) {
                console.error(e);
            }
        }

    }

    @action
    async nextMonth() {
        const nextMonth = moment(this.startingDate).add(1, 'M');
        const shouldFetchMore = moment(nextMonth).isAfter(moment(this.lastFetchedEnd));
        this.startingDate = nextMonth;
        this.selectedDate = nextMonth;

        if (shouldFetchMore) {
            const nextDate = moment(nextMonth).add(1, 'M').endOf('isoWeek');

            try {
                ui.fetchingState();
                await this.fetchCalendar(this.lastFetchedEnd, nextDate);
                ui.defaultState();
            } catch (e) {
                console.error(e);
            }
        }
    }

    @action
    today() {
        this.startingDate = moment();
        this.selectedDate = moment();
    }

    @action
    onDateSelected(date) {
        this.selectedDate = moment(date);
    }

    //Using isoWeekday so that it will start from Monday
    @computed get datesForWeek() {
        const startDate = moment(this.startingDate);

        return WEEK_DAYS.map((day, i) => moment(startDate.isoWeekday(i + 1)));
    }

    isDateSelected(date) {
        return date.isSame(this.selectedDate, 'day');
    }

    @computed get isToday() {
        return this.isDateSelected(moment());
    }

    @action
    promptDatePicker() {
        this.datePickerVisible = !this.datePickerVisible;
    }

    @action
    async pickDate(date) {
        const pickedDate = moment(date);
        const currentSelectedDate = this.selectedDate;
        this.startingDate = pickedDate;
        this.selectedDate = pickedDate;
        this.promptDatePicker();

        if (pickedDate.isAfter(currentSelectedDate) && this.selectedDate.isAfter(this.lastFetchedEnd)) {
            ui.fetchingState();
            await this.fetchCalendar(this.lastFetchedEnd, moment(date).add(1, 'M').endOf('isoWeek'));
            ui.defaultState();
        }

        if (pickedDate.isBefore(currentSelectedDate) && this.selectedDate.isBefore(this.lastFetchedStart)) {
            ui.fetchingState();
            await this.fetchCalendar(moment(date).subtract(1, 'M').startOf('isoWeek'), this.lastFetchedStart);
            ui.defaultState();
        }
    }

    @action
    markEventAs(event, { registered }) {
        const calendarWithEventMarked = _.map(this.rawCalendar, (calendarEvent) => {
            if (calendarEvent.codeevent === event.codeEvent) {
                return {
                    ...calendarEvent,
                    event_registered: registered ? 'registered' : 'unregistered',
                }
            }

            return calendarEvent;
        });

        this.rawCalendar = calendarWithEventMarked;
        this.calendar = this.remapCalendar(calendarWithEventMarked);
    }
}

const calendarStore = new Calendar();
export default calendarStore;