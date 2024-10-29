const order = require('../Modal/Ordermodal');
const { connect } = require('../Router/orderRouter');

const handleCreateOrder = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });

        const result = await order.create({
            name: data.name,
            phoneNumber: data.phoneNumber,
            address: data.address,
            order: data.order,
            totalPrice : data.totalPrice
        })
        // if any error 
        if (!result) return res.status(500).json({ "Error": "Somthing went wrong Try After sometime" })

        // Sucessfully created
        return res.status(201).json({ "Message": "Order Created Sucessfully" });
    } catch (e) {
        // catch block
        console.log(e);
        return res.status(400).json({ "Error": "Somthing went wrong in adding product" })
    }
}

const handleUpdateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body && !!req.body.status) return res.status(400).json({ error: "Status Not Found" });
        const result = await order.findByIdAndUpdate(id, { OrderStatus: req.body.status }); 

        // if error
        if (!result) return res.status(500).json({ "Error": "Somthing went wrong in Updateing Status" })
        return res.status(200).json({ "Message": "Order Status Upadeted Sucessfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ "Error": "Somthing went wrong in Updateing Status" })
    }
}

const handleGetOrderList = async (req,res)=>{
    try{
        const result = await order.find({})

        if (!result) return res.status(500).json({"Error" : "Error In getting Orders"});
        return res.status(200).json(
            result.map((item)=>{
            const data = {
                id : item._id,
                name : item.name,
                phoneNumber : item.phoneNumber,
                address : item.address,
                createdAt : item.createdAt,
            }
            return data
        }));
    }catch(e){
        console.log(e)
        return res.status(500).json({"Error" : "Somthing Went Wrong Try after Some Time"})
    }
}

const handleGetSpecficProduct = async (req,res)=>{
    try{
        const param =  req.params.id
        if(!param) return res.status(500).json({"error" : "Product Id is required"});

        const result = await order.findById(req.params.id).populate('ordersid.productId');

        if (!result) return res.status(404).json({"error" : "No Product Found"});
        return res.status(200).json(result);
    }catch(e){
        console.log(e)
        return res.status(500).json({"Error" : "Somthing Went Wrong Try adter Some Time"})
    }
}

module.exports = {
    handleCreateOrder,
    handleUpdateOrder,
    handleGetOrderList,
    handleGetSpecficProduct
}