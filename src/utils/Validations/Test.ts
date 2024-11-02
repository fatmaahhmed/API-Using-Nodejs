import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

// أضفنا RequestHandler
import express from "express";
import { validationErrors } from "../../middlewares/validation/validatorMiddleware";

const app = express();

app.post(
  "/submit",
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("age").custom((value, { req }) => {
      if (req.body.name === "John") {
        if (value < 18) {
          throw new Error("Age must be greater than 18 if your name is John");
        }
      }

      return true;
    }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    res.send("Success");
    return;
  }
);
//
//   if (cartItem && product) {
//       // check if cartItemExists already exists
//       const updatedCartItem = await prisma.cartItem.update({
//         where: { cartItem_id: cartItem.cartItem_id },
//         data: {
//           quantity: cartItem.quantity + quantity,
//           subtotal: product.price * (cartItem.quantity + quantity),
//           subtotal_with_copon: copon_id
//             ? product.price * (cartItem.quantity + quantity) - copon_id.discount
//             : product.price * (cartItem.quantity + quantity),
//         },
//       });
//       // update product quantity
//       await prisma.product.update({
//         where: { product_id },
//         data: { quantity: product.quantity - quantity },
//       });
//       // update cart total
//       const cart = await prisma.cart.findUnique({
//         where: { user_id: cart_id },
//       });
//       if (!cart) {
//         // create new cart
//         await prisma.cart.create({
//           data: {
//             cart_id: +req.params.user_id,
//             user_id: +req.params.user_id,
//           },
//         });
//       }
//       if (cart)
//         await prisma.cart.update({
//           where: { cart_id: +req.params.user_id },
//           data: {
//             total: cart.total + cartItem.subtotal,
//             total_with_copon:
//               cart.total_with_copon + cartItem.subtotal_with_copon,
//           },
//         });
//     } else {
//       // add new item
//       cartItem = await prisma.cartItem.create({
//         data: {
//           cart_id,
//           product_id,
//           quantity,
//           unit_price: product_id.price,
//           subtotal: product_id.price * quantity,
//           subtotal_with_copon: copon_id
//             ? product_id.price * quantity - copon_id.discount
//             : product_id.price * quantity,
//         },
//       });
//     }

//     res.status(201).json({
//       message: "Cart item added successfully",
//     });
//   }
// );
