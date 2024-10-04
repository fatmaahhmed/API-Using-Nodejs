import { RequestHandler } from "express";

export type Role = {
  role_id: number;
  role_name: "Admin" | "User";
};

// User Types
export type User = {
  user_id?: number;
  username?: string;
  name?: string;
  email?: string;
  password: string;
  role?: string | undefined | null;
  token?: string | "";
};
export interface ERequest extends Request {
  role?: string;
  email?: string;
}

// Admin Types
export type Admin = User & {};

// Category Types

export interface Category {
  category_id: number;
  category_name: string;
  parent_id?: number;
  products: Product[];
}

// Product Types
export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  user_id: number;
  category: Category;
  user: User;
  wishlists: WishList[];
}
// UpdateCategoryRequest type
export interface UpdateCategoryRequest {
  category_name?: string;
  parent_id?: number;
}
// WishList model type
export interface WishList {
  wishlist_id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  user: User;
  product: Product;
}

// Authentication Types
export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// API Response Types
// export type PaginatedResponse<T> = {
//   data: T[];
//   page: number;
//   pageSize: number;
//   total: number;
// };

// Admin Request Types
export type CreateAdminRequest = {
  username: string;
  email: string;
  password: string;
  role_id: number;
};

export type UpdateAdminRequest = {
  username?: string;
  email?: string;
  password?: string;
  role_id?: number;
};

// Product Request Types
export type CreateProductRequest = {
  product_name: string;
  user_id: number;
  category_id: number;
  price: number;
  description?: string;
};

export type UpdateProductRequest = {
  product_name?: string;
  category_id?: number;
  price?: number;
  description?: string;
};

// Category Request Types
export type CreateCategoryRequest = {
  category_name: string;
  parent_id?: number;
};

// WishList Request Types
export type AddToWishListRequest = {
  user_id: number;
  product_id: number;
};

export type RemoveFromWishListRequest = {
  user_id: number;
  product_id: number;
};

// User Request Types
export type CreateUserRequest = {
  role?: string | "user";
  username: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

// Additional User Request Types
export type GetUserRequest = {
  user_id: number;
};

export type DeleteUserRequest = {
  user_id: number;
};

export type JwtObject = {
  email: string;
  name: string;
};

type WithError<T> = T & { error: string };
export interface LoginRequest {
  email: string;
  password: string;
}

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
