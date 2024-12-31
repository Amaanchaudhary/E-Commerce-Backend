import Razorpay from 'razorpay';                       //1. import razorpay
import dotenv from 'dotenv'

//2. get apikey & apisecret from razorpay acc setting and put in .env file
dotenv.config();

export const razorPay = new Razorpay({              //3. create instance of razorpay 
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//4. Go to paymentService.js