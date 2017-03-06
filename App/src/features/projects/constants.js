/**
 * Created by desver_f on 13/02/17.
 */

import _ from 'lodash';
import moment from 'moment';

//SCALE VALUE
const DAY_IN_PIXEL = 5;

const MONTH_OFFSET = 11;
const PROJECT_LINE_HEIGHT = 8;
const MONTH_BAR_HEIGHT = 20;
const MONTHS = _.map(
    [...moment.monthsShort(), 'Jan'],
    (month) => ({
            name: month,
            days: moment(month, 'MMM').daysInMonth()
        }
    ));
const MONTH_BAR_WIDTH = _.sumBy(MONTHS, (month) => month.days * DAY_IN_PIXEL);

export {
    DAY_IN_PIXEL,
    MONTH_OFFSET,
    PROJECT_LINE_HEIGHT,
    MONTH_BAR_HEIGHT,
    MONTH_BAR_WIDTH,
    MONTHS,
};