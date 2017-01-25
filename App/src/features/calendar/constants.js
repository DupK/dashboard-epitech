import _ from 'lodash';
import moment from 'moment';

export const WORKING_HOURS = _.range(9, 25).map((hour, i) => moment('1970-01-01T09:00:00-05:00').add(i, 'h').format('HH[h]'));
export const WEEK_DAYS = _.range(0, 7);

//size in pixel
export const QUARTER_SIZE = 10;
export const HOUR_SIZE = QUARTER_SIZE * 4;
