import { createPaymentLink, updatePaymentInformation } from "../services/paymentService.js"


export const CreatePaymentLink = async (req, res) => {
  try {    
    const paymentLink = await createPaymentLink(req.params.id)
    return res.status(200).send(paymentLink)
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false })
  }
}


export const UpdatePaymentInfo = async (req, res) => {
  try {
    await updatePaymentInformation(req.query)
    return res.status(200).send({
      message: "payment information updated",
      success: true
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}