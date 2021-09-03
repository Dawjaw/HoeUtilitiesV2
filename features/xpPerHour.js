

export function calculateXpPerHour(startTimeValue, lastTimeValue, totalXp) {
    if (startTimeValue === undefined) return;

    let diffTime = Date.now() - startTimeValue;

    let timeRatio = (diffTime/1000) / 3600;

    let xpPerHour = totalXp / timeRatio;
    if (Number.isNaN(xpPerHour)) {
        return;
    }
    return Math.round(xpPerHour);
}