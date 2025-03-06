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



export const convertToUTC = (localDateTime: string): string => {
    return new Date(localDateTime).toISOString();
};



