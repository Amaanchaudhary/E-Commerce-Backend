import Razorpay from 'razorpay';                       //1. import razorpay

const key_id = "rzp_test_jYUezCCXzlVOlI"               //2. get apikey & apisecret 
const key_secret = "nDSrktmKEeIl60iQ1dNBtJE7"          // from razorpay acc setting

export const razorPay = new Razorpay({              //3. create instance of razorpay 
  key_id,
  key_secret,
});

//4. Go to paymentService.js