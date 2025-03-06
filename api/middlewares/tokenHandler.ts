import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getPublicKey } from "../utils/keys";
import { errorResponse } from "./responseHandler";

interface User {
	id: string;
	email: string;
}


declare module "express-serve-static-core" {
	interface Request {
		user?: User; // Add optional `user` property to Express Request
	}
}

// Middleware for token verification
export const verifyTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader?.split(" ")[1];
		if (!token) throw { status: 403, message: "Token is required" };
		const publicKey = await getPublicKey();
		jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, user) => {
			if (err) {
				if (err.name === "TokenExpiredError") throw { status: 403, message: "Token is Expired" };
				throw { status: 403, message: "Invalid token" };
			} else {
				(req).user = user as User;
				next();
			}
		});
	} catch (error: any) {
		error.status === 403 ? console.log(`⚠️  Token Error: ${error.message}`) : console.log(`🚫  Error: ${error}`)
		errorResponse(error, res);
	}
};