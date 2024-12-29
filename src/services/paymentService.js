import { razorPay } from "../config/razorpayClient.js"
import { findOrderById } from "./order.service.js"

export const createPaymentLink = async (orderId) => {    //4. created a method
  try {
    //5. get order details, Payment need to be done
    const order = await findOrderById(orderId)
    if (!order) throw new Error("Order not found");

    // Validate customer contact information
    const { firstname, lastname, mobile, email } = order.user;
    if (!mobile || typeof mobile !== "string") {
      throw new Error("Invalid or missing customer contact number");
    }

    //6. create payment request obj
    const paymentLinkRequest = {
      amount: order.totalPrice * 100, //amount be in paise not RS, so 1rs = 100paisa
      currency: "INR",
      customer: {
        name: `${firstname} ${lastname}`,
        contact: mobile,
        email: email,
      },
      notify: {
        sms: true,    //razorpay number
        email: true   //razorpay email 
      },
      reminder_enable: true,
      //after payment redirect to user to this link, {frontend page link}
      callback_url: `http://localhost:3000/payment/${orderId}`,
      callback_method: 'get'
    }

    console.log(paymentLinkRequest,"req");
    

    //7. created "paymentLink" with the help of instance of razorPay we created.
    const paymentLink = await razorPay.paymentLink.create(paymentLinkRequest)
    console.log(paymentLink,"req2");

    //8. retrieve "id" and "short_url" from paymentLink 
    const paymentLinkId = paymentLink.id
    const payment_link_url = paymentLink.short_url

    //9. Created res obj to return
    const resData = {
      paymentLinkId,
      payment_link_url
    }

    //10. Return
    return resData

  } catch (error) {
    console.error("Error in createPaymentLink: ", error);
    throw new Error(error);
  }
}

export const updatePaymentInformation = async (reqData) => {
  try {
    const { payment_id, order_id } = reqData;
    if (!payment_id || !order_id) throw new Error("Invalid request data");

    const order = await findOrderById(order_id);
    if (!order) throw new Error("Order not found");

    const payment = await razorPay.payments.fetch(payment_id)

    if (payment.status == "captured") {
      order.paymentDetails = {
        ...order.paymentDetails,
        paymentId: payment_id,
        status: "COMPLETED",
      };
      order.orderStatus = "PLACED"
    }
    await order.save()

    return { message: "Your order is placed", success: true }

  } catch (error) {
    console.error("Error in updatePaymentInformation: ", error.message);
    throw new Error("Failed to update payment information");
  }
}

