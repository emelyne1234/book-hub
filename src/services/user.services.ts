import jwt, { Secret } from "jsonwebtoken";
// a method to generate token when user after authentication

export function generateAuthToken(id: string) {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable not set");
  }

  const secretKey = process.env.SECRET_KEY as Secret;

  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
}
