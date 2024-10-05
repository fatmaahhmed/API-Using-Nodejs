import express, { Request, Response } from "express";

import { applyMiddlewares } from "./middlewares/routes/server";
import { applyRoutes } from "./routes/MainRoutes/server";
import { databaseconfig } from "./DB/config";
import dotenv from "dotenv";
import { prisma } from "./prisma/config";

const app = express();
const port = process.env.PORT || 3000;

// Define the async function
async function initializeServer() {
  try {
    await databaseconfig();
    // Apply middlewares and routes
    applyMiddlewares(app);
    // Apply routes
    applyRoutes(app);
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately, e.g., exit the process
    process.exit(1);
  }
}

// Immediately invoke the named async function
initializeServer();
