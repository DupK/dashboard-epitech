/**
 * Created by desver_f on 13/02/17.
 */

import { Dimensions } from 'react-native';

//SCALE VALUE
const DAY_IN_PIXEL = 5;

const MONTH_OFFSET = 11;
const MONTH_BAR_OFFSET = Dimensions.get('window').width / 2;
const PROJECT_LINE_HEIGHT = 8;
const MONTH_BAR_HEIGHT = 20;

export {
    DAY_IN_PIXEL,
    MONTH_OFFSET,
    MONTH_BAR_OFFSET,
    PROJECT_LINE_HEIGHT,
    MONTH_BAR_HEIGHT,
};