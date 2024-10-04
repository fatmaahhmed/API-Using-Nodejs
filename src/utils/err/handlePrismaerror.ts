import { Prisma, PrismaClient } from "@prisma/client";

import ApiError from "./ApiErrorHandler";

export const handlePrismaError = (error: any): ApiError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        console.log("A unique constraint failed on the database", 409);
        return new ApiError("A unique constraint failed on the database", 409);
      case "P2003": // Foreign key constraint failed
        console.log("Foreign key constraint failed");
        return new ApiError("A foreign key constraint failed", 400);
      case "P2025": // Record to update/delete not found
        console.log("Record to update/delete not found");
        return new ApiError("Record not found", 404);

      case "P2011": // The model was not found
        console.log("the model was not found");
        return new ApiError("The model was not found", 404);
      case "P2012": // Relation required
        console.log("A relation required was not provided");
        return new ApiError("A relation required was not provided", 400);
      case "P2014": // The query requires an implicit return
        return new ApiError("Query requires an implicit return", 400);
      default:
        return new ApiError("An unexpected error occurred", 500);
    }
  }
  return new ApiError("An unexpected error occurred", 500);
};
