
export const convertDatePrimaryStyle = (utcDate: any): string => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",  // Example: 2025
        month: "long",    // Example: February
        day: "numeric"    // Example: 28
    });
};

// Helper function to calculate time left until endTime
export const getTimeLeft = (endDate: Date): string => {
    return formatTimeDifference(new Date(), endDate) + " left";
};

// Helper function to calculate time until startTime
export const getTimeUntilStart = (startDate: Date): string => {
    return formatTimeDifference(new Date(), startDate) + " to start";
};

// Function to format time difference into short format
const formatTimeDifference = (fromDate: Date, toDate: Date): string => {
    if (toDate <= fromDate) return "Starting soon";

    let diffMs = toDate.getTime() - fromDate.getTime();
    const units = [
        { label: "y", ms: 1000 * 60 * 60 * 24 * 365 },
        { label: "mo", ms: 1000 * 60 * 60 * 24 * 30 },
        { label: "d", ms: 1000 * 60 * 60 * 24 },
        { label: "h", ms: 1000 * 60 * 60 },
        { label: "m", ms: 1000 * 60 }
    ];

    const parts: string[] = [];
    for (const unit of units) {
        const value = Math.floor(diffMs / unit.ms);
        if (value > 0) {
            parts.push(`${value}${unit.label}`);
            diffMs -= value * unit.ms;
        }
    }

    return parts.length ? parts.join(" ") : "Less than a minute";
};