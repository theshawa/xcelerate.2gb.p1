import { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../lib/error";
import { User } from "../models/user";
import { compareHash } from "../utils/hash";
import { createToken } from "../utils/jwt";

export const loginHandlerBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginHandler: RequestHandler = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { password, username } = req.body as z.infer<
    typeof loginHandlerBodySchema
  >;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new AppError("Invalid username", 404);
  }

  const isPasswordCorrect = compareHash(password, user.dataValues.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid password", 400);
  }

  const token = await createToken(user.dataValues.id, user.dataValues.username);

  res.json({ token });
};
