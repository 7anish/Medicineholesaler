const admin = require('../Modal/AdminModal')
const { generateToken } = require('../Config/Jwtauthentication');

const handleCreateAdmin = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.create({
            phonenumber: req.body.phonenumber,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            lcno: req.body?.lcno
        })
        return res.status(201).json({ Message: "Account Created Sucessfully" })
    } catch (e) {
        console.log(e)
        if (e.code == 11000) {
            return res.status(500).json({ error: "Account Alearady Exist" })
        }
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

const handleLoginAsAdmin = async (req, res) => {
    try {
        const data = req.body
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.matchpassword(data.email, data.password);

        console.log(result)
        if (!result) return res.status(404).json(("Error User not Found"))
        // if(result.role === 'NONE') return res.status(403).json({ error: "Unauthorised" });
        const token = generateToken(result.email, result._id, result.role); // Generatin the Jwt tokern

        return res.status(200).json({ token: token, name: result.name, email: result.email, phonenumber: result.phonenumber, role: result.role, id: result._id , wishlist : result.wishlist});

    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "not found" });
    }
}

const handleaddtowishlist = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id;
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });

        const result = await admin.findByIdAndUpdate(id ,{ $addToSet : {wishlist : req.body.productid}})
        console.log(result)
        if (!result) return res.status(404).json(("Unable to add to wish list"))
        return res.status(200).json({message : "Product added to wishlist"})
    } catch(e) {
        console.log(e);
        return res.status(500).json({ "Error": "Internal Server Error" })
    }
}


const handleremovefromwishlist = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id;
        console.log(req.body)
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });
        const result = await admin.findByIdAndUpdate(id, {$pull : {wishlist : req.body.productid}})
        if (!result) return res.status(404).json(("Unable to remove from wishlist"))
        return res.status(200).json({message : "Product Removed from wishlist"})
    } catch (e){
        console.log(e);
        return res.status(500).json({ "Error": "Internal Server Error" })
    }
}


const handlegetwishlist =async (req,res)=>{
    try {
        const id = req.params.id;
        const result = await admin.findById(id).populate('wishlist')

        if(!result) return res.status(404).json({"Error" : "No Wishlist item found"});
        return res.status(200).json(result.wishlist)
    } catch(e){
        console.log(e);
        return res.status(500).json({ "Error": "Internal Server Error" })
    }
}


module.exports = {
    handleLoginAsAdmin,
    handleCreateAdmin,
    handleaddtowishlist,
    handlegetwishlist,
    handleremovefromwishlist
}