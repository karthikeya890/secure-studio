import { sendMail } from "../utils/mail";
import {userMiscService} from "./user"

export class AuthService {

  async sendRegisterMail(otp: string,email:string) {
	try {
	    let placeholderData = {otp,action: "Register",name: "new User",};
		let mailData = { to: email };
		await sendMail("otpRequest", placeholderData, mailData).catch((error) => {});
    	return;	
	} catch (error) {
		throw error
	}
  }

  async sendLoginMail(otp: string,email:string) {
	try {
		const name = await userMiscService.getUserNameByEmail(email)
		let placeholderData = {otp,action: "Login",name};
		let mailData = { to: email };
		await sendMail("otpRequest", placeholderData, mailData).catch((error) => {});
    return;		
	} catch (error) {
		return error
	}
  }
}



export const authService = new AuthService();
