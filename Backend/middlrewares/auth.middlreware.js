import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function authUser(req, res, next) {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token =
      (authHeader && authHeader.split(" ")[1]) || req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = await userModel.findById(decoded._id);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export { authUser };
