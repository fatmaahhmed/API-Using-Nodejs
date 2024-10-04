// import { Request, Response } from "express";

// import { PrismaClient } from "@prisma/client";
// import { UserImpl } from "../../DB/DAO/UserDAO";

// export interface ERequest extends Request {
//   role?: string;
//   email?: string;
// }

// const prisma = new PrismaClient();

// export class ProductService {
//   private userDAO: UserImpl;
//   constructor() {
//     this.userDAO = new UserImpl();
//     console.log("UserDAO initialized:", this.userDAO);
//   }

//   async addProduct(req: ERequest, res: Response) {
//     console.log("reqRole", req.role);
//     const userId = parseInt(req.params.user_id, 10);
//     const { name, description, price, category_id, category_name } = req.body;
//     //decoded header

//     if (!name || !description || !price || !category_id || !category_name) {
//       return res
//         .status(400)
//         .json({ error: "All fields except user_id are required" });
//     }

//     try {
//       // Check if category and user exist
//       const category = await prisma.category.findUnique({
//         where: {
//           category_id: category_id,
//           category_name: category_name,
//         },
//       });

//       if (!category) {
//         return res.status(400).json({ error: "Invalid category ID or name" });
//       }

//       const user = await prisma.user.findUnique({
//         where: {
//           email: req.email,
//           user_id: userId,
//         },
//       });

//       if (!user) {
//         return res.status(400).json({ error: "Invalid user ID" });
//       }

//       // Insert the new product
//       await prisma.product.create({
//         data: {
//           name,
//           description,
//           price,
//           category_id,
//           user_id: userId,
//         },
//       });

//       res.status(201).json({ message: "Product added successfully" });
//     } catch (err) {
//       console.error("Error adding product:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }

//   async updateProduct(req: Request, res: Response) {
//     const { userId, productId } = req.params; // Extract userId and productId from URL parameters
//     const { name, description, price, category_id, category_name } = req.body;

//     if (!name && !description && !price && !category_id && !category_name) {
//       return res
//         .status(400)
//         .json({ error: "At least one field must be provided to update" });
//     }

//     try {
//       // Check if the product exists and belongs to the user
//       const product = await prisma.product.findUnique({
//         where: {
//           product_id: Number(productId),
//         },
//       });

//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       // Check if the product belongs to the user
//       if (product.user_id !== Number(userId)) {
//         return res
//           .status(403)
//           .json({ error: "You do not have permission to update this product" });
//       }

//       // Optional: Validate category_id and category_name if provided
//       if (category_id || category_name) {
//         const categoryExists = await prisma.category.findFirst({
//           where: {
//             category_id: category_id ? Number(category_id) : undefined,
//             category_name: category_name || undefined,
//           },
//         });

//         if (!categoryExists) {
//           return res.status(400).json({ error: "Invalid category ID or name" });
//         }
//       }

//       // Build the update data dynamically
//       const updateData: any = {};
//       if (name) updateData.name = name;
//       if (description) updateData.description = description;
//       if (price) updateData.price = price;
//       if (category_id) updateData.category_id = Number(category_id);
//       if (category_name) updateData.category_name = category_name;

//       // Execute the update query
//       await prisma.product.update({
//         where: { product_id: Number(productId) },
//         data: updateData,
//       });

//       res.status(200).json({ message: "Product updated successfully" });
//     } catch (err) {
//       console.error("Error updating product:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }

//   async deleteProduct(req: Request, res: Response) {
//     const { userId = "0", productId } = req.params; // Extract userId and productId from URL parameters

//     try {
//       const reqPath = req.path; // Full path of the request
//       console.log(reqPath); // Log the full path for debugging
//       // Construct the full path for comparison if needed
//       const fullPath = `/admin/deleteproducts/${productId}`;

//       console.log("Full path:", fullPath); // Log the constructed path

//       if (userId === "0" && fullPath.startsWith("/admin/deleteproducts")) {
//         // Admin can delete any product
//         const product = await prisma.product.findFirst({
//           where: {
//             product_id: parseInt(productId, 10),
//           },
//         });

//         if (!product) {
//           return res.status(404).json({ error: "Product not found" });
//         }
//       }
//       // Check if the product exists and belongs to the user
//       const product = await prisma.product.findFirst({
//         where: {
//           product_id: parseInt(productId, 10),
//           user_id: parseInt(userId, 10),
//         },
//       });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ error: "Product not found or does not belong to the user" });
//       }

//       // Delete the product
//       await prisma.product.delete({
//         where: { product_id: parseInt(productId, 10) },
//       });

//       res.status(200).json({ message: "Product deleted successfully" });
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }

//   async getPaginatedProducts(req: Request, res: Response) {
//     const page = parseInt(req.query.page as string) || 1; // Default to page 1
//     const pageSize = parseInt(req.query.pageSize as string) || 10; // Default to 10 items per page

//     if (page < 1 || pageSize < 1) {
//       return res.status(400).json({ error: "Invalid page or pageSize value" });
//     }

//     try {
//       const products = await prisma.product.findMany({
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//         orderBy: {
//           product_id: "asc",
//         },
//       });

//       // Fetch total count of products
//       const totalProducts = await prisma.product.count();

//       // Send paginated response with product details
//       res.status(200).json({
//         page,
//         pageSize,
//         totalProducts,
//         totalPages: Math.ceil(totalProducts / pageSize),
//         products, // Detailed product information
//       });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

// export default ProductService;

// export const productService = new ProductService();
