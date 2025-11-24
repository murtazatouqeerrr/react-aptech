const mongo = require("mongoose");

try {
    connectDb = async()=> {
    mongo.connect ("mongodb://localhost:27017/murtaza_mern")
    console.log("created db");
    
    }
} catch (error) {
    console.log(error);
    
}
module.exports = connectDb