const mongoose = require("mongoose");

let rewardScheme = mongoose.Schema({
    item: {type:String, required: true},
    user: {type:String, required: true},
    create_time: {type: Date, default: Date.now},
});

let rewardModel = mongoose.model("Reward",rewardScheme);

module.exports = rewardModel;
