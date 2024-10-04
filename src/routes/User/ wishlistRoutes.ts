// import { Router } from "express";

// // import { wishListService } from "../../controllers/UserServices/User.Whishlist";
// import { isUser } from "../../middlewares/IsUser";
// import jwtMiddleware from "../../middlewares/authMiddleware";
// import { requestLoggerMiddleware } from "../../middlewares/loggerMiddleware";
// import { WishList } from "../../utils/types";

// const WishList = Router();
// WishList.use(requestLoggerMiddleware);

// //todo: Apply JWT middleware to all subsequent routes
// WishList.use(jwtMiddleware);
// WishList.use(isUser);
// //todo: Wishlist routes for users
// WishList.get("/:userId/wish-list", (req, res) =>
//   wishListService.viewWishList(req, res)
// );
// WishList.post("/:userId/wish-list", (req, res) =>
//   wishListService.addToWishList(req, res)
// );

// WishList.delete("/:userId/wishlist/:productId", (req, res) =>
//   wishListService.deleteWishlistItem(req, res)
// );

// export default WishList;
