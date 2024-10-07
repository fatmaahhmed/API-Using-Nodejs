import express, { Request, Response } from "express";

import { applyMiddlewares } from "./middlewares/routes/server";
import { applyRoutes } from "./routes/MainRoutes/server";
import dotenv from "dotenv";
import { prisma } from "./prisma/config/prismaConfig";
import { testConnection } from "./prisma/testConnection";

const app = express();
const PORT = process.env.PORT || 3000;

// Define the async function
async function initializeServer() {
  try {
    await testConnection();
    // Apply middlewares and routes
    applyMiddlewares(app);
    // Apply routes
    applyRoutes(app);
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately, e.g., exit the process
    process.exit(1);
  }
}

// Immediately invoke the named async function
initializeServer();
