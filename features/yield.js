import {units} from "../utils/constants";
import Settings from "../config";
import {addCommas} from "../utils/utils";


export function calculateYieldPerHour(startTimeValue, lastTimeValue, totalXp) {
    if (startTimeValue === undefined) return;

    let diffTime = Date.now() - startTimeValue;

    let avg_per_second = (1/(diffTime/1000)) * totalXp;

    if (Number.isNaN(avg_per_second)) {
        return 0;
    }

    let unit = units[Settings.liveTrackerUnit];
    let unitModif, precisionModif;
    switch (unit) {
        case '/h':
            unitModif = 60 * 60;
            precisionModif = 1;
            break;
        case '/event':
            unitModif = 60 * 20;
            precisionModif = 1;
            break;
        case '/min':
            unitModif = 60;
            precisionModif = 10;
            break;
        case '/s':
            unitModif = 1;
            precisionModif = 1;
            break;
        case '/harvest':
            unitModif = 1;
            precisionModif = 100;
            break;
    }
    avg_per_second = avg_per_second * unitModif * precisionModif;
    return addCommas(Math.round(avg_per_second));
}