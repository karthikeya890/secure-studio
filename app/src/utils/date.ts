// utils/dateUtils.tsx

export const convertDatePrimaryStyle = (utcDate: string): string => {
    if (!utcDate) return "Not-Provided";

    const date = new Date(utcDate);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-US", {
        // weekday: "long",  // Example: Monday
        year: "numeric",  // Example: 2025
        month: "long",    // Example: February
        day: "numeric"    // Example: 28
    });
};

export const convertDateSecondaryStyle = (utcDate: string): string => {
    if (!utcDate) return "Not-Provided";

    const date = new Date(utcDate);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString("en-US", {
        year: "numeric",  // Example: 2025
        month: "long",    // Example: February
        day: "numeric",   // Example: 28
        hour: "numeric",  // Example: 05
        minute: "2-digit", // Example: 30
        hour12: true      // Enable AM/PM format
    });
};

export const getTimeLeft = (endDate: string): string => {
    const now = new Date(); // Current UTC time
    const end = new Date(endDate);

    if (end <= now) return "Expired";

    let diffMs = end.getTime() - now.getTime();

    const units = [
        { label: "y", ms: 1000 * 60 * 60 * 24 * 365 }, // 1 year
        { label: "mo", ms: 1000 * 60 * 60 * 24 * 30 }, // 1 month (approx)
        { label: "d", ms: 1000 * 60 * 60 * 24 },       // 1 day
        { label: "h", ms: 1000 * 60 * 60 },           // 1 hour
        { label: "m", ms: 1000 * 60 }                 // 1 minute
    ];

    const parts: string[] = [];

    for (const unit of units) {
        const value = Math.floor(diffMs / unit.ms);
        if (value > 0) {
            parts.push(`${value}${unit.label}`);
            diffMs -= value * unit.ms;
        }
    }

    return parts.length ? parts.join(" ") + " left" : "Less than a minute left";
};

export const convertToUTC = (localDateTime: string): string => {
    return new Date(localDateTime).toISOString();
};



export const getFutureDateMonth = (date: Date, monthsToAdd: number) => {
    const futureDate = new Date(date);
    futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

    // Ensure the day does not exceed the 28th
    if (futureDate.getDate() > 28) {
        futureDate.setDate(28);
    }
    return futureDate;
};

export const getFutureDateYear = (date: Date, yearsToAdd: number) => {
    const futureDate = new Date(date);
    futureDate.setFullYear(futureDate.getFullYear() + yearsToAdd);
    if (futureDate.getDate() > 28) {
        futureDate.setDate(28);
    }
    return futureDate;
};

export const getFutureDateDay = (date: Date, daysToAdd: number) => {
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return futureDate;
};

export const getFutureHour = (date: Date, hoursToAdd: number) => {
    const futureDate = new Date(date);
    futureDate.setHours(futureDate.getHours() + hoursToAdd);
    return futureDate;
};

export const formatDate = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:00`;
};

export const formatDateTime = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:00`;
};

export const startDateEndDateMonth = (months?: number) => {

    // Get the current date-time and round to the next full hour
    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setHours(now.getHours() + 1); // Move to next hour
    }
    now.setMinutes(0, 0, 0); // Set minutes and seconds to 00

    // Default values
    const startTimeDefault = formatDate(now);
    const endTimeDefault = formatDate(getFutureDateMonth(now, months || 1));

    return { startTimeDefault, endTimeDefault }
}

export const startDateEndDateDay = (days?: number) => {

    // Get the current date-time and round to the next full hour
    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setHours(now.getHours() + 1); // Move to next hour
    }
    now.setMinutes(0, 0, 0); // Set minutes and seconds to 00

    // Default values
    const startTimeDefault = formatDate(now);
    const endTimeDefault = formatDate(getFutureDateDay(now, days || 1));

    return { startTimeDefault, endTimeDefault }
}

export const startDateEndDateHour = (hours?: number) => {

    // Get current time and round to the next full hour
    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setHours(now.getHours() + 1);
    }
    now.setMinutes(0, 0, 0);

    const startTimeDefault = formatDateTime(now);
    const endTimeDefault = formatDateTime(getFutureHour(now, hours || 1));


    return { startTimeDefault, endTimeDefault }
}

export const startDateEndDateYear = (years?: number) => {

    const now = new Date();
    if (now.getMinutes() > 0) {
        now.setHours(now.getHours() + 1);
    }
    now.setMinutes(0, 0, 0);

    const startTimeDefault = formatDate(now);
    const endTimeDefault = formatDate(getFutureDateYear(now, years || 1));

    return { startTimeDefault, endTimeDefault }
}


export const getDurationDates = (value: any, quantity?: number) => {
    let durationDates;
    if (value === "YEAR") {
        const { startTimeDefault, endTimeDefault } = startDateEndDateYear(quantity);
        const startTime = convertToUTC(startTimeDefault);
        const endTime = convertToUTC(endTimeDefault);
        durationDates = { startTime, endTime }
    } else if (value === "MONTH") {
        const { startTimeDefault, endTimeDefault } = startDateEndDateMonth(quantity);
        const startTime = convertToUTC(startTimeDefault);
        const endTime = convertToUTC(endTimeDefault);
        durationDates = { startTime, endTime }
    } else if (value === "DAY") {
        const { startTimeDefault, endTimeDefault } = startDateEndDateDay(quantity);
        const startTime = convertToUTC(startTimeDefault);
        const endTime = convertToUTC(endTimeDefault);
        durationDates = { startTime, endTime }
    } else if (value === "HOUR") {
        const { startTimeDefault, endTimeDefault } = startDateEndDateHour(quantity);
        const startTime = convertToUTC(startTimeDefault);
        const endTime = convertToUTC(endTimeDefault);
        durationDates = { startTime, endTime }
    }

    return durationDates;
}