var express = require('express');
var router = express.Router();
let {getUserById,createUser,getUsers} = require("../service/userService.js");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await getUsers();
  res.json({status: "success", data: users});
});

router.get('/:id', async function(req, res, next) {
  try{
    let user = await getUserById(req.params.id);
    res.json({status: "success", data: user});
  }catch (e) {
    res.json({status: "fail", data: e.message});
  }
});

router.post('/', async function(req, res, next) {
  try{
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    console.log(username);
    await createUser(username,password,email);
    res.json({status: "success", data: null});
  }catch (e) {
    res.json({status: "fail", data: e.message});
  }
});

module.exports = router;
