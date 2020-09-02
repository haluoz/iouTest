let requestDao = require("../dao/request");
let rewardDao = require("../dao/reward");
const mongoose = require("mongoose");

const getRequests = async () => {
    return requestDao.aggregate([{
        $lookup: {
            from: 'rewards',
            localField: 'reward',
            foreignField: '_id',
            as: 'reward'
        }
    }]);
    // let requests = await requestDao.find();
    // return requests;
};

const createRequest = async (request, description,  publisher, reward) => {
    let rewardId = mongoose.Types.ObjectId();
    const item = new rewardDao({
        _id: rewardId,
        item: reward,
        user: publisher,
    });
    await item.save(item);
    const newRequest = new requestDao({
        request: request,
        description: description,
        publisher: publisher,
        reward: rewardId
    });
    await newRequest.save(newRequest);
};

const addReward = async (requestId, publisher, reward) => {
    let request  = await requestDao.findOne({_id:requestId});
    if (request == null){
        throw new Error("request not exist");
    }
    let exRewardId = mongoose.Types.ObjectId();
    const item = new rewardDao({
        _id: exRewardId,
        item: reward,
        user: publisher,
    });
    await item.save(item);
    let rewardId = request.reward;
    rewardId.push(exRewardId);
    await requestDao.updateOne({_id: requestId}, {$set: {reward:rewardId}}, function(err, res){});
};

const deleteReward = async (requestId, userId) => {
    let request  = await requestDao.aggregate([
        {
            $lookup: {
                from: 'rewards',
                localField: 'reward',
                foreignField: '_id',
                as: 'reward'
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(requestId)
            }
        }
    ]);
    if (request == null){
        throw new Error("request not exist");
    }

    let rewards = request[0].reward;
    //console.log(rewards);
    request = await requestDao.findOne({_id: requestId});
    let oldReward = request.reward;
    let newReward = new Array();
    for (let i = 0; i < rewards.length; i++) {
        if (rewards[i].user === userId){
            await rewardDao.findByIdAndDelete({ _id: rewards[i]._id });
        }else {
            newReward.push(rewards[i]._id);
        }

    }
    await requestDao.updateOne({_id: requestId}, {$set: {reward: newReward}});
    //TODO reward is empty
    request = await requestDao.findOne({_id: requestId});

    return request;
};

module.exports = {
    getRequests,
    createRequest,
    addReward,
    deleteReward
};

