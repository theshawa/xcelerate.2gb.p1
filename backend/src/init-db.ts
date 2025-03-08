import { User } from "./models/user";

export const initDb = async () => {
  console.log("initializing db");

  // db logic here
  User.sync({ alter: true });

  console.log("db initialized");
};

initDb();
