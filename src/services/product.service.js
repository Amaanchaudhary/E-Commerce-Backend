import categoryModel from "../Models/category.model.js";
import productModel from "../Models/product.model.js";

export async function createProduct(reqData) {
    
    let topLevel = await categoryModel.findOne({ name: reqData.topLevelCategory })
    
    if (!topLevel) {
        topLevel = new categoryModel({
            name: reqData.topLevelCategory,
            level: 1,
        })
    }
    
    let secondLevelCategory = await categoryModel.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    })

    if (!secondLevelCategory) {
        secondLevelCategory = new categoryModel({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
    }

    let thirtLevelCategory = await categoryModel.findOne({
        name: reqData.thirtLevelCategory,
        parentCategory: secondLevelCategory._id
    })

    if (!thirtLevelCategory) {
        thirtLevelCategory = new categoryModel({
            name: reqData.thirtLevelCategory,
            parentCategory: secondLevelCategory._id,
            level: 3
        })
    }

    const product = new productModel({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirtLevelCategory._id,
    })

    return await product.save();
}

export async function deleteProduct(productId) {
    const product = await findProductById(productId)

    await productModel.findOneAndDelete(productId)
    return "Product Deleted Successfully."
}

export async function updateProduct(productId, reqData) {
    return await productModel.findByIdAndUpdate(productId, reqData)
}

export async function findProductById(id) {
    const product = await productModel.findById(id)
        .populate("category").exec();  // replace with the actual document data

    if (!product) {
        throw new Error("Product not found with id : " , id)
    }

    return product
}

export async function getAllProducts(reqQuery) {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize }
        = reqQuery

    pageSize = pageSize || 10

    let query = productModel.find().populate("category");

    if (category) {
        const existCategory = await categoryModel.findOne({ name: category })
        if (existCategory) {
            query = query.where("category").equals(existCategory._id)
        }
        else {
            return { content : [] , currentPage : 1 , totalPages : 0}
        }
    }
    
    if(color){
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()))

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"),"i") : null

        query = query.where("color").regex(colorRegex)
    }

    if(sizes){
        const sizesSet = new Set(sizes);

        query = query.where("sizes.name").in([...sizesSet])
    }

    if(minPrice && maxPrice){
        query = query.where("discountedprice").gte(maxPrice).lte(maxPrice);
    }

    if(minDiscount){
        query = query.where("discountPercent").gte(minDiscount);
    }

    if(stock){
        if(stock == "in_stock"){
            query = query.where("quantity").gt(0)
        }
        else if(stock == "out_of_stock"){
            query = query.where("quantity").gt(1)
        }
    }

    if(sort){
        const sortDirection = sort === "price_high" ? -1 : 1
        query = query.sort({discountedPrice : sortDirection})
    }

    const totalProducts = await productModel.countDocuments(query)

    const skip = (pageNumber - 1)*pageSize

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec()

    const totalPages = Math.ceil(totalProducts/pageSize)

    return {content : products , currentPage : pageNumber , totalPages}
    
}

export async function createMultipleProducts(products){
    for(let product of products){
        await createProduct(product);
    }
}


