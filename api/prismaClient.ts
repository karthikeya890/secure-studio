import { PrismaClient } from "@prisma/client";

// Declare a global variable to store the Prisma Client instance.
// This is used to reuse the same instance in development mode.
declare global {
  var prisma: PrismaClient | undefined;
}

// Define a variable to hold the Prisma Client instance.
let prisma: PrismaClient;

try {
  // Check if the application is running in production mode.
  if (process.env.NODE_ENV === "production") {
    // In production, create a new Prisma Client instance.
    prisma = new PrismaClient();
  } else {
    // In development mode, reuse the existing Prisma Client instance if it exists.
    if (!globalThis.prisma) {
      // If no instance exists, create a new one and store it in the global variable.
      console.log("Initializing new Prisma Client");
      globalThis.prisma = new PrismaClient({
        // Enable logging for queries and errors in development mode.
        log: ["info", "warn", "error"], // Disable 'query' logs by not including it
      });
    } else {
      // If an instance already exists, log that it is being reused.
      console.log("Reusing existing Prisma Client");
    }
    // Assign the global Prisma Client instance to the local variable.
    prisma = globalThis.prisma;
  }
} catch (error) {
  // If an error occurs during initialization, log the error and throw it.
  console.error("Failed to initialize Prisma Client:", error);
  throw error;
}

// Export the Prisma Client instance for use in other parts of the application.
export { prisma };

// Define a function to gracefully disconnect the Prisma Client.
export const closePrisma = async (): Promise<void> => {
  try {
    // Disconnect the Prisma Client from the database.
    await prisma.$disconnect();
  } catch (error) {
    // If an error occurs during disconnection, log the error.
    console.error("Error disconnecting Prisma Client:", error);
  }
};

// Graceful shutdown handling

// Triggered when the event loop is empty and the application is about to exit naturally
process.on("beforeExit", async () => {
    console.log("Application is about to exit (beforeExit)");
    await closePrisma();
});
  
// Triggered when the user presses Ctrl+C in the terminal
process.on("SIGINT", async () => {
    console.log("Application is being interrupted (SIGINT)");
    await closePrisma();
    process.exit(0); // Exit with success code
});
  
// Triggered when a process manager (e.g., Docker, Kubernetes) requests the application to stop
process.on("SIGTERM", async () => {
    console.log("Application is being terminated (SIGTERM)");
    await closePrisma();
    process.exit(0); // Exit with success code
});