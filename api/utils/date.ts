
export const convertDatePrimaryStyle = (utcDate: any): string => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",  // Example: 2025
        month: "long",    // Example: February
        day: "numeric"    // Example: 28
    });
};
