/**
 * Created by desver_f on 26/01/17.
 */
import _ from 'lodash';
import autobind from "autobind-decorator";
import moment from "moment";
import { observable, computed } from "mobx";

import {WEEK_DAYS} from "../features/calendar/constants";
import * as Intra from "../api/intra";

@autobind
class Calendar {

    @observable calendar = null;
    @observable startingDate = moment();
    @observable selectedDate = moment();
    @observable datePickerVisible = false;

    calendarStart = moment().subtract(3, 'w').format('YYYY-MM-DD');
    calendarEnd = moment().add(3, 'w').format('YYYY-MM-DD');
    lastFetchedStart = null;
    lastFetchedEnd = null;

    groupByOverlappingRanges(ranges) {
        const endDatesValues = ranges.map((r) => moment(r.end).unix()).sort((a, b) => a - b);
        const datesRanges = ranges.sort((a, b) => moment(a.start).unix() - moment(b.start).unix());

        let i = 0, j = 0, n = datesRanges.length, active = 0;
        let groups = [], cur = [];
        while (true) {
            if (i < n && moment(datesRanges[i].start).unix() < endDatesValues[j]) {
                cur.push(datesRanges[i++]);
                ++active
            } else if (j < n) {
                ++j;
                if (--active == 0) {
                    groups.push(cur);
                    cur = []
                }
            } else break
        }
        return groups
    }

    async fetchCalendar(start = this.calendarStart, end = this.calendarEnd) {
        try {
            this.lastFetchedStart = start;
            this.lastFetchedEnd = end;

            const rawCalendar = await Intra.fetchCalendar(start, end);

            this.calendar = this.remapCalendar(rawCalendar);
        } catch (e) {
            console.error(e);
        }
    }

    remapCalendar(rawCalendar) {
        const remappedCalendar = _(rawCalendar)
            .filter((event) => event.start && event.module_registered === true)
            .map((event) => ({
                title: event.acti_title,
                type: event.type_title,
                module: event.titlemodule,
                start: event.start,
                end: event.end,
                room: event.room,
                duration: moment(event.end).diff(moment(event.start), 'minutes'),
                uid: event.codeevent,
                registered: event.event_registered === 'registered',
                canRegister: event.allow_register,
            }))
            .groupBy((event) => moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'))
            .toPairs()
            .map(([date, events]) => {
                const eventsGroupedByOverlappingTimes = this.groupByOverlappingRanges(events);

                return [
                    date,
                    eventsGroupedByOverlappingTimes
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

       const eventsPerDay = _(this.getDatesForWeek())
            .map((date) => {
                const formattedDate = date.format('DD-MM-YYYY');
                const registeredEvents = _(this.calendar[formattedDate])
                    .flatMap((events) => (
                        _.flatMap(events, (event) => event.registered))
                    )
                    .value();
                const isRegisteredToAnEvent = _.some(registeredEvents, (registered) => registered);

                return [
                    date,
                    isRegisteredToAnEvent
                ]
            })
            .fromPairs()
            .value();

        return eventsPerDay;
    }

    getNextEvent() {
        const flattenedEvents = _(this.calendar)
            .flatMap((dayWithEvents) => (
                _.flatMap(dayWithEvents, (events) => (
                    _.flatMap(events, (event) => event))
                )
            ))
            .orderBy((event) => event.start)
            .value();

        return _.find(flattenedEvents, (event) => moment(event.start, 'YYYY-MM-DD HH:mm:ss').isAfter()) || {};
    }

    //Set startingDate to the previous week
    getPreviousWeek() {
        const prevWeek = moment(this.startingDate).subtract(1, 'w');
        const shouldFetchMore = moment(prevWeek).isBefore(moment(this.lastFetchedStart).add(1, 'w'));

        if (shouldFetchMore) {
            try {
                this.fetchCalendar(moment(prevWeek).subtract(1, 'M').format('YYYY-MM-DD'), this.lastFetchedStart);
            } catch (e) {
                console.error(e);
            }
        }
        this.startingDate = prevWeek;
        this.selectedDate = moment(this.selectedDate).subtract(1, 'w');
    }

    //Set startingDate to the next week
    getNextWeek() {
        const nextWeek = moment(this.startingDate).add(1, 'w');
        const shouldFetchMore = moment(nextWeek).isAfter(moment(this.lastFetchedEnd).subtract(1, 'w'));

        if (shouldFetchMore) {
            try {
                this.fetchCalendar(this.lastFetchedEnd, moment(nextWeek).add(1, 'M').format('YYYY-MM-DD'));
            } catch (e) {
                console.error(e);
            }
        }
        this.startingDate = nextWeek;
        this.selectedDate = moment(this.selectedDate).add(1, 'w');
    }

    getPreviousMonth() {
        const prevMonth = moment(this.startingDate).subtract(1, 'M');
        const shouldFetchMore = moment(prevMonth).isBefore(moment(this.lastFetchedStart).add(1, 'w'));

        if (shouldFetchMore) {
            try {
                this.fetchCalendar(moment(prevMonth).subtract(1, 'M').format('YYYY-MM-DD'), this.lastFetchedStart);
            } catch (e) {
                console.error(e);
            }
        }
        this.startingDate = prevMonth;
        this.selectedDate = moment(this.selectedDate).subtract(1, 'M');
    }

    getNextMonth() {
        const nextMonth = moment(this.startingDate).add(1, 'M');
        const shouldFetchMore = moment(nextMonth).isAfter(moment(this.lastFetchedEnd).subtract(1, 'w'));

        if (shouldFetchMore) {
            try {
                this.fetchCalendar(this.lastFetchedEnd, moment(nextMonth).add(1, 'M').format('YYYY-MM-DD'));
            } catch (e) {
                console.error(e);
            }
        }
        this.startingDate = nextMonth;
        this.selectedDate = moment(this.selectedDate).add(1, 'M');
    }

    today() {
        this.startingDate = moment();
        this.selectedDate = moment();
    }

    onDateSelected(date) {
        this.selectedDate = moment(date);
    }

    //Using isoWeekday so that it will start from Monday
    getDatesForWeek() {
        const startDate = moment(this.startingDate);

        return WEEK_DAYS.map((day, i) => moment(startDate.isoWeekday(i + 1)));
    }

    isDateSelected(date) {
        return date.isSame(this.selectedDate, 'day');
    }

    promptDatePicker() {
        this.datePickerVisible = !this.datePickerVisible;
    }

    pickDate(date) {
        this.startingDate = moment(date);
        this.selectedDate = moment(date);
        this.promptDatePicker();
    }
}

const calendarStore = new Calendar();
export default calendarStore;