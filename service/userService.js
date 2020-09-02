let userDao = require("../dao/user");

const getUserById = async (id) => {
    let user = await userDao.findOne({_id: id});
    if (user == null){
        throw new Error("user not exist");
    }
    return user;
};

const getUsers = async () => {
    return await userDao.find();
};

const createUser = async (username,password,email) => {
    const newUser = new userDao({
        username: username,
        password: password,
        email: email
    });
    await newUser.save(newUser);
};

module.exports = {
    getUserById,
    createUser,
    getUsers
};

