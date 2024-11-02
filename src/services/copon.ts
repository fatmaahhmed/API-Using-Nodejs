import { prisma } from "../prisma/config/prismaConfig";
export const validateCopon = async (copon_id: number) => {
  if (copon_id) {
    copon_id = +copon_id;
    const copon = await prisma.copon.findUnique({
      where: { copon_id },
    });
    if (!copon) {
      return false;
    }
    if (copon) {
      if (
        copon.end_date < new Date() ||
        copon.is_active === false ||
        copon.start_date > new Date() ||
        copon.number_of_available_copons === 0
      ) {
        return null;
      }
      return copon;
    }
  }
};
// apply copon discount to cart
export const applyCopon = async (cart_id: number, copon_id: number) => {
  const cart = await prisma.cart.findUnique({
    where: { cart_id },
    include: { cartItems: true },
  });
  const copon = await prisma.copon.findUnique({
    where: { copon_id },
  });
  if (copon?.type == "percentage") {
    const discount = cart?.total_with_copon
      ? (cart.total_with_copon * copon?.discount) / 100
      : 0;
    return discount;
  } else if (copon?.type == "fixed") {
    return cart?.total_with_copon ? cart?.total_with_copon - copon.discount : 0;
  }
};
