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
        if (!product) {
            return res.status(500).send({ success: false, message: `product not found with id ${productId}` })
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export const GetAllProducts = async (req, res) => {
    console.log("hello , product");
    console.log("Request query:", req.query);

    try {
        const products = await getAllProducts(req.query)
        console.log("Fetched products:", products); // 
        return res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
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