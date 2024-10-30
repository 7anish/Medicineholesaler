
const admin = require('../Modal/AdminModal')
const {generateToken} = require('../Config/Jwtauthentication');

const handleCreateAdmin = async (req , res)=>{
    try{
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.create({
            phonenumber : req.body.phonenumber,
            name : req.body.name,
            email : req.body.email,
            password: req.body.password,
            lcno : req.body?.lcno
        })
        return res.status(201).json({Message : "Account Created Sucessfully"})
    }catch(e){
        console.log(e)
        if(e.code == 11000){
            return res.status(500).json({error : "Account Alearady Exist"})
        }
        return res.status(500).json({error : "Internal Server Error"})
    }
}

const handleLoginAsAdmin = async (req,res)=>{
    try {
        const data = req.body
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.matchpassword( data.email , data.password);

        if(!result) return res.status(404).json(("Error User not Found"))
        console.log(result)
        // if(result.role === 'NONE') return res.status(403).json({ error: "Unauthorised" });
        const token = generateToken(result.email , result._id , result.role); // Generatin the Jwt tokern
        
        return res.status(200).json({ token : token , name : result.name , email : result.email , phonenumber : result.phonenumber});

    }catch(e){
        console.log(e);
        return res.status(400).json({error : "not found"});
    }
}

module.exports = {
    handleLoginAsAdmin,
    handleCreateAdmin
}