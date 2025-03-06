export const generateOTP = () => {
    switch (process.env.ENVIRONMENT) {
        case "prod":
            return Math.floor(100000 + Math.random() * 900000).toString();
        case "dev":
            return "123123";
        default:
            return "123456";
    }
};
  
export const generateRandomString = (length = 25) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};