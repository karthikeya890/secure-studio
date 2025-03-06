import jwt from "jsonwebtoken";
import { getPrivateKey, getPublicKey } from "./keys";
import { tokenService } from "../services/token";
import { UserData } from "../types/token";


export const generateAccessToken = async (userData: UserData) => {
	try {
		const privateKey = await getPrivateKey();
		return jwt.sign(userData, privateKey, {algorithm: "RS256",expiresIn: "15m"});
	} catch (error: any) {
		throw error;
	}
};

export const generateRefreshToken = async (userData: UserData) => {
	try {
		const privateKey = await getPrivateKey();
		const token = jwt.sign(userData, privateKey, {algorithm: "RS256",expiresIn: "7d"});
		await tokenService.upsertToken({userId:userData.id,token});
		return token;
	} catch (error) {
		throw error;
	}
};

export const verifyRefreshToken = async (token: string) => {
	try {
		const publicKey = await getPublicKey();
		const user = jwt.verify(token, publicKey, {algorithms: ["RS256"]},(error,decodedUser)=>{
			if(error) throw error;
			return decodedUser;
		});
		return user;
	} catch (error) {
		throw error;
	}
};