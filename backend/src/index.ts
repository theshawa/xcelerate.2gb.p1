import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error";

import "express-async-errors";

import { loginHandler, loginHandlerBodySchema } from "./handlers/login";
import { registerHandler } from "./handlers/register";
import { bodyValidatorMiddleware } from "./middlewares/body-validator";

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json("pong");
});

app.post(
  "/login",
  bodyValidatorMiddleware(loginHandlerBodySchema),
  loginHandler
);
app.post("/register", registerHandler);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
