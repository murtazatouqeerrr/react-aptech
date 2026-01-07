const Service = require("../models/auth-service");


const service = async (req,res) => {
    try {

        const getservice = await Service.find({});
        return res.status(200).json ({msg: "Service fetched succesfully", getservice})

        
    } catch (error) {
       
        console.log(error);
        
    }
}
module.exports = {service};
