const product = require('../Modal/Prductmodal');

const handleaddproduct = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });

        const range = JSON.parse(data.range)
        let img = []
        if (req.files && req.files.length > 0) {
            img = req.files.map((file) => ({
                imageurl: file.path,
            }));
        }
        const result = await product.create({
            category: data.category,
            subcategory: data.subcategory,
            companyName: data.companyName,
            name: data.name,
            ourPrice: data.ourPrice,
            mrp: data.mrp,
            itemtype: data.itemtype,
            size: data?.size,
            composition: data?.composition,
            inventory: data?.inventory,
            productimage: img,
            range: range
        });

        // if any error 
        if (!result) return res.status(500).json({ "Error": "Somthing went wrong Try After sometime" })

        // Sucessfully created
        return res.status(201).json({ "Message": "Producta added Sucessfully" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ "Error": "Somthing went wrong in adding product" })
    }
}


const handleupdateproduct = async (req, res) => {
    try {
        const id = req.params.id

        // image update latter on


        // const productimage =  req?.file?.path
        // const data = productimage ?  {...req.body , productimage} : req.body;

        const result = await product.findByIdAndUpdate(id, req.body)
        if (!result) return res.status(404).json({ "error": "Error in deleting the Product" });
        return res.status(200).json({ "Message": "Product Updated Sucesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ "Error": "Somthing went wrong in uploading" })
    }
}

const handledeleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await product.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ "error": "Error in deleting the Product" });
        return res.status(200).json({ "Message": "Product Deleted Sucessfully" });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ "Error": "Product not found" });
    }
}

const handlGetProductList = async (req, res) => {
    try {
        const param = req.query
        let result = []
        if (param.type === "feature"){
            result = await product.find({featured : true}).limit(12)
        }else{
            result = await product.find(param)
        }
        if (!result) return res.status(404).json({ "error": "No Product Found" });
        return res.status(200).json(
            result.map((item) => {
                const data = {
                    companyName: item.companyName,
                    id: item._id,
                    name: item.name,
                    mrp: item.mrp,
                    ourPrice: item.ourPrice,
                    imageurl: item.productimage,
                    itemtype: item.itemtype,
                    inventory: item.inventory,
                    category : item.category,
                    subcategory : item.subcategory,
                    size : item.size,
                    range : item.range,
                    composition : item.composition
                }
                return data;
            })
        );
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}


const handleGetSpecficProduct = async (req, res) => {
    try {
        const param = req.params.id
        if (!param) return res.status(500).json({ "error": "Product Id is required" });

        const result = await product.findById(req.params.id);

        if (!result) return res.status(404).json({ "error": "No Product Found" });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}



module.exports = {
    handleaddproduct,
    handledeleteproduct,
    handleupdateproduct,
    handlGetProductList,
    handleGetSpecficProduct,
}