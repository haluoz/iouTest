var express = require('express');
var router = express.Router();
const {getUserById,createUser,getUsers} = require("../service/userService.js");
const baseResult = require("../base/baseResult");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await getUsers();
  res.json(new baseResult("success",users));
});

router.get('/:id', async function(req, res, next) {
  try{
    let user = await getUserById(req.params.id);
    res.json(new baseResult("success",user));
  }catch (e) {
    res.json(new baseResult("fail",e.message));
  }
});

router.post('/', async function(req, res, next) {
  try{
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    console.log(username);
    await createUser(username,password,email);
    res.json(new baseResult("success",null));
  }catch (e) {
    res.json(new baseResult("fail",e.message));
  }
});

module.exports = router;
