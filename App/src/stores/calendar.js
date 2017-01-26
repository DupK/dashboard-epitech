/**
 * Created by desver_f on 26/01/17.
 */
import {observable, action, computed, autorun} from "mobx";
import moment from "moment";
import autobind from "autobind-decorator";
import {WEEK_DAYS} from "../features/calendar/constants";

import * as Intra from '../api/intra';

@autobind
class Calendar {

    @observable calendar = null;
    @observable startingDate = moment();
    @observable selectedDate = moment();

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

    async fetchCalendar(start = null, end = null) {
        try {
            const rawCalendar = await Intra.fetchCalendar();

            this.calendar = _(rawCalendar)
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
        } catch (e) {
            console.error(e);
        }
    }

    //Set startingDate to the previous week
    @action
    getPreviousWeek() {
        this.startingDate = moment(this.startingDate).subtract(1, 'w');
    }

    //Set startingDate to the next week
    @action
    getNextWeek() {
        this.startingDate = moment(this.startingDate).add(1, 'w');
    }

    @action
    getPreviousMonth() {
        this.startingDate = moment(this.startingDate).subtract(1, 'M');
    }

    @action
    getNextMonth() {
        this.startingDate = moment(this.startingDate).add(1, 'M');
    }

    @action
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

}

const calendarStore = new Calendar();
export default calendarStore;