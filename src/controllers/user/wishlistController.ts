// import { Request, Response } from "express";

// import { PrismaClient } from "@prisma/client";
// import { UserImpl } from "../../DB/DAO/UserDAO";
// import { WishList } from "../../utils/types";

// export interface ERequest extends Request {
//   role?: string;
//   email?: string;
// }
// const prisma = new PrismaClient();

// export class WishListService {
//   private userDAO: UserImpl;
//   constructor() {
//     this.userDAO = new UserImpl();
//     console.log("UserDAO initialized:", this.userDAO);
//   }
//   async viewWishList(req: Request, res: Response) {
//     console.log("req--", req.header);
//     const userId = parseInt(req.params.userId, 10); // Extract userId from URL parameters

//     if (isNaN(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     try {
//       // Fetch wish list items for the user
//       const wishListItems = await prisma.wishList.findMany({
//         where: { user_id: userId },
//         include: { product: true }, // Include product details
//         orderBy: { wishlist_id: "asc" }, // Optional: Order by wish list ID
//       });

//       if (wishListItems.length === 0) {
//         return res.status(404).json({ message: "No wish list items found" });
//       }

//       res.status(200).json({ wishListItems });
//     } catch (error) {
//       console.error("Error fetching wish list items:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
//   async addToWishList(req: Request, res: Response) {
//     const userId = parseInt(req.params.userId, 10); // Extract userId from URL parameters
//     const { productId, productName } = req.body; // Extract product details from request body

//     if (isNaN(userId) || !productId || !productName) {
//       return res
//         .status(400)
//         .json({ error: "Invalid user ID or missing product details" });
//     }

//     try {
//       //check if id is true
//       const user = await prisma.user.findUnique({ where: { user_id: userId } });
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       // Check if the product exists
//       const product = await prisma.product.findUnique({
//         where: { name: productName },
//       });

//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }
//       // Check if the product already exists in the user's wish list
//       const existingWishListItem = await prisma.wishList.findFirst({
//         where: { user_id: userId, product_id: productId },
//       });

//       if (existingWishListItem) {
//         return res.status(400).json({ error: "Product already in wish list" });
//       }

//       // Add the product to the wish list
//       const newWishListItem = await prisma.wishList.create({
//         data: {
//           user_id: userId,
//           product_id: productId,
//           product_name: productName,
//         },
//       });

//       res
//         .status(201)
//         .json({ message: "Product added to wish list", newWishListItem });
//     } catch (error) {
//       console.error("Error adding to wish list:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }

//   async deleteWishlistItem(req: Request, res: Response) {
//     const userId = +req.params.userId;

//     try {
//       // Check if the wish list item exists for the user
//       const wishListItem = await prisma.wishList.findFirst({
//         where: {
//           user_id: userId,
//         },
//       });

//       if (!wishListItem) {
//         return res.status(404).json({ error: "Wish list item not found" });
//       }

//       // Delete the wish list item
//       await prisma.wishList.delete({
//         where: {
//           wishlist_id: wishListItem.wishlist_id,
//         },
//       });

//       res.status(200).json({ message: "Product removed from wishlist" });
//     } catch (err) {
//       console.error("Error deleting wish list item:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

// export default WishListService;

// export const wishListService = new WishListService();
