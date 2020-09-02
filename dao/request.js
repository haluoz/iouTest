const mongoose = require("mongoose");

let requestScheme = mongoose.Schema({
    request: {type:String, required: true},
    description: {type:String, required: true},
    publisher: {type:String, required: true},
    recipient: String,
    reward: {type:[mongoose.Types.ObjectId], required: true,ref:'Reward'},
    proof: String,
    status: {type: Number, default: 0},
    postTime: {type: Date, default: Date.now},
});

let requestModel = mongoose.model("Request",requestScheme);

module.exports = requestModel;
