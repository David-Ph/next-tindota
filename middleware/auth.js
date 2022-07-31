import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export const authenticated = (handler) => async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    // Signed in
    return await handler(req, res);
  } else {
    // Not Signed in
    return res.status(401).json({ message: "Not Authorized" });
  }
};
