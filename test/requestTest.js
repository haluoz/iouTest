var expect = require("chai").expect;
var should = require('chai').should();
const {getRequests, createRequest, addReward, deleteReward,getRequest} = require("../service/requestService");

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/iou',{ useNewUrlParser: true });

describe("RequestTest",function(){
    it("RequestList",  async function(){
        let list =  await getRequests();
        list.should.have.length(7);
    }).timeout(5000);

    it("AddRequest", async function(){
        await createRequest('clear the computer1','this is a description','5f4a1bec07dd6334ec6f87b9','sprite');
        let list =  await getRequests();
        list.should.have.length(8);
    });

    it("AddReward",  async function(){
        await addReward('5f5b3edf55e38961c0a2569c','5f4fa54a0ea3105f386c4480','coffee');
        let request = await getRequest('5f5b3edf55e38961c0a2569c');
        expect(request[0].reward.length).to.be.equal(2);
    });

    it("DeleteReward", async function(){
        await deleteReward('5f5b3edf55e38961c0a2569c','5f4fa54a0ea3105f386c4480');
        let request = await getRequest('5f5b3edf55e38961c0a2569c');
        expect(request[0].reward.length).to.be.equal(1);
    });
});



