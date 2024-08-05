import { createProduct, deleteProduct, updateProduct, findProductById, getAllProducts, createMultipleProducts } from '../services/product.service.js'

export const CreateProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body)        
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const DeleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await deleteProduct(productId)
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const UpdateProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await updateProduct(productId, req.body)
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const FindProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await findProductById(productId)
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const GetAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts(req.query)
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const CreateMultipleProducts = async (req, res) => {
    try {
        const products = await createMultipleProducts(req.body)
        return res.status(200).send({ message: "Products Created Successfully", success: true });
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}