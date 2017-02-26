const FEET_PER_METER = 3.28084;

const filter = item => item && item === 'foo';

const metersToFeet = m => m * FEET_PER_METER;

export {filter, metersToFeet};
