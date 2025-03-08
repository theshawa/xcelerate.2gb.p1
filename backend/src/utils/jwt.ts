import jwt from "jsonwebtoken";

const jwtSecret = "iAMBatman";
const jwtExpiration = "1h";
const jwtIssuer = "localhost";

export const createToken = async (id: number, username: string) => {
  return jwt.sign({ id, username }, jwtSecret, {
    expiresIn: jwtExpiration,
    issuer: jwtIssuer,
  });
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, jwtSecret, {
    issuer: jwtIssuer,
  });
};
