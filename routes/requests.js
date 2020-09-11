const express = require('express');
const router = express.Router();
const baseResult = require("../base/baseResult");
const {getRequests, createRequest, addReward, deleteReward} = require("../service/requestService");
//const redis = require("redis");

//const client = redis.createClient("6379");

/* GET home page. */
// router.get('/', async function(req, res, next) {
//   let requests = null;
//   requests = await new Promise( (resolve) => {
//     client.get("requestsList",function(err, res){
//       return resolve(res);
//     });
//   });
//   if (requests != null && requests.length > 0){
//     res.json(new baseResult("redis success",JSON.parse(requests)));
//   }else {
//     requests = await getRequests();
//     client.set("requestsList",  JSON.stringify(requests), function (err) {});
//     res.json(new baseResult("success",requests));
//   }
// });

router.get('/all', async function(req, res, next) {
  let requests = await getRequests();
  res.json(new baseResult("success",requests));
});



router.post('/', async function(req, res, next) {
  try {
    let request = req.body.request;
    let description = req.body.description;
    let publisher = req.body.userId;
    let reward = req.body.reward;
    await createRequest(request,description,publisher,reward);
    res.json(new baseResult("success",null));
  }catch (e) {
    res.json(new baseResult("fail", e.message));
  }
});

router.post('/addreward', async function(req, res, next) {
  try {
    let requestId = req.body.requestId;
    let publisher = req.body.userId;
    let reward = req.body.reward;
    let request = await addReward(requestId,publisher,reward);
    res.json(new baseResult("success",null));
  }catch (e) {
    res.json(new baseResult("fail", e.message));
  }
});

router.delete('/deletereward', async function(req, res, next) {
  try {
    let requestId = req.body.requestId;
    let userId = req.body.userId;
    let request = await deleteReward(requestId, userId);
    res.json(new baseResult("success",request));
  }catch (e) {
    res.json(new baseResult("fail", e.message));
  }
});

module.exports = router;
