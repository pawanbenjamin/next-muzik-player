import jwt from "jsonwebtoken";
import { z } from "zod";

const userTokenSchema = z.object({
  id: z.number(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string()
});

export type UserToken = z.infer<typeof userTokenSchema>;

export function signUserToken(payload: UserToken) {
  const token = jwt.sign(payload, "super secret");
  return token;
}

export function parseUserToken(token: string): UserToken {
  const user = jwt.verify(token, "super secret");
  return userTokenSchema.parse(user);
}
