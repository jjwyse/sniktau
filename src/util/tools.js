const FEET_PER_METER = 3.28084;

/**
 * Converts meters to feet, rounding to two decimal places
 * @param {Number} m The number of metersToFeet
 * @return {number} The number of feet that is roughly equivalent to the number of meters given
 */
const metersToFeet = m => Math.round(m * FEET_PER_METER * 100) / 100;

export {metersToFeet};
