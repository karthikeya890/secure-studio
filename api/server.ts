import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { verifyTokenHandler } from "./middlewares/tokenHandler";
import auth from "./routes/auth"
import user from "./routes/user"
import serviceCatergory from "./routes/serviceCategory"
import test from "./routes/test"
import payment from "./routes/payment"
import coupon from "./routes/coupon"
import booking from "./routes/bookings"
import invoice from "./routes/invoice"
import home from "./routes/home"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9001;

app.use(cors()); // Enable CORS
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/auth", auth);
app.use("/test", test)
app.use("/home", home)
app.use(verifyTokenHandler);
app.use("/user", user)
app.use("/serviceCatergory", serviceCatergory)
app.use("/coupon", coupon)
app.use("/payment", payment)
app.use("/booking", booking)
app.use("/invoice", invoice)

// Start the server
app.listen(PORT, () => { console.log(`✅ Server running on port ${PORT}`) });