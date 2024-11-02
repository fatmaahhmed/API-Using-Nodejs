import { body, param, validationResult } from "express-validator";

import { ExtendedRequest } from "../Types/request/request";
import Request from "express";
import { prisma } from "../../prisma/config/prismaConfig";
import { user } from "@prisma/client";
import { validationErrors } from "../../middlewares/validation/validatorMiddleware";

//   product_name    String     @unique
//  quantity        Int        @default(0)
//   description     String
//   price           Float
// discount_price  Float?
// category_id     Int?
// user_id         Int
// color           String?
export const validateproduct = [
  // Validate product_name
  body("product_name")
    .notEmpty()
    .withMessage("product name is required")
    .isString()
    .withMessage("product name must be a string"),
  //  "brand_name"
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt()
    .withMessage("quantity must be an integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat()
    .withMessage("price must be a float"),
  body("discount_price")
    .optional()
    .custom((value, { req }) => {
      console.log("value", value);
      console.log("req.body.discount_price", req.body.discount_price);

      if (value > req.body.price) {
        throw new Error("discount_price must be less than price");
      }
      return true; // Important: return true if validation passes
    }),
  body("category_id")
    .custom(async (value, { req }) => {
      const category = await prisma.category.findFirst({
        where: {
          category_id: value,
        },
      });
      if (!category) {
        throw new Error("Category not found");
      }
      return true; // Important: return true if validation passes
    })
    .notEmpty()
    .withMessage("category_id is required"),
  body("color").optional().isString().withMessage("color must be a string"),
  param("user_id")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user_id; // Accessing req correctly
      const user = await prisma.user.findFirst({
        where: {
          user_id: value,
        },
      });
      if (!user) {
        throw new Error("User not found in the database");
      }
      return true; // Important: return true if validation
    })
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),

  validationErrors,
];

export const validateproductUpdate = [
  body("product_name")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user.id; // Accessing req correctly
      const product = await prisma.product.findFirst({
        where: {
          product_name: value,
          user_id: user_id, // Use the correct user_id from req
        },
      });
      if (!product) {
        throw new Error("Product not found in the database");
      }
      return true; // Important: return true if validation passes
    })
    .notEmpty()
    .isString()
    .withMessage("product name must be a string"),
  body("discount_price")
    .optional()
    .custom((value, { req }) => {
      if (value > req.body.discount_price) {
        throw new Error("discount_price must be less than price");
      }
      return true; // Important: return true if validation passes
    }),
  param("product_id")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user.id; // Accessing req correctly
      const product = await prisma.product.findFirst({
        where: {
          product_id: value,
          user_id: user_id, // Use the correct user_id from req
        },
      });
      if (!product) {
        throw new Error("Product not found in the database");
      }
      return true; // Important: return true if validation passes
    })
    .notEmpty()
    .withMessage("product_id is required")
    .isInt()
    .withMessage("product_id must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];

export const validateDeleteproduct = [
  body("product_name")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user.id; // Accessing req correctly
      const product = await prisma.product.findFirst({
        where: {
          product_name: value,
          user_id: user_id, // Use the correct user_id from req
        },
      });
    })
    .optional()
    .isString()
    .withMessage("product name must be a string"),
  param("product_id")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user.id; // Accessing req correctly
      const product = await prisma.product.findFirst({
        where: {
          product_id: value,
          user_id: user_id, // Use the correct user_id from req
        },
      });
      if (!product) {
        throw new Error("Product not found in the database");
      }
      return true; // Important: return true if validation passes
    })
    .notEmpty()
    .withMessage("product_id is required")
    .isInt()
    .withMessage("product_id must be an integer"),
  param("user_id")
    .custom(async (value, { req }) => {
      const user_id = req.params?.user.id; // Accessing req correctly
      const user = await prisma.user.findFirst({
        where: {
          user_id: value,
        },
      });
      if (!user) {
        throw new Error("User not found in the database");
      }
      return true; // Important: return true if validation
    })
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];
