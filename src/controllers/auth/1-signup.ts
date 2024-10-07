import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import asyncHandler from "express-async-handler";
import { handlePrismaError } from "../../utils/err/handlePrismaerror";
import { hashPassword } from "../../utils/HassingPasswordFunction/hashPassword";
import { prisma } from "../../prisma/config/prismaConfig";

export const signUp = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let { password } = req.body;
    password = await hashPassword(password);
    req.body.password = password;
    console.log(`req.body ${JSON.stringify(req.body)}`);
    const user = await prisma.user
      .create({
        data: { ...req.body },
        select: {
          user_id: true,
          email: true,
          role: true,
        },
      })
      .catch((error) => {
        console.log(error);
        throw handlePrismaError(error);
      });
    req.params.user_id = user.user_id.toString();
    req.body.role = user.role;
    req.body.email = user.email;
    next();
    const message = `User added successfully`;
    console.log(req.token);
    res.status(201).json({ message, user, token: req.token });
  }
);
