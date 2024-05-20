const User=require('../models/user')

async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({})
    return res.json(allDbUsers);
}

async function handlegetUserById(req,res){
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "user not found" });
    }
    return res.json(user);
}

async function handleUpdateUserById(req,res){
     await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
}

async function handleDelelteUserById(req,res){
    await User.findOneAndDelete(req.params.id);
    return res.json({ status: "deleted" });
}

async function handleCreateNewUser(req,res){
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.ip_address
    ) {
      return res.status(400).json({ status: "all fields are required" });
    }
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      IpAddress: body.ip_address,
    });
    console.log(result);
    return res.status(201).json({ msg: "success" ,id:result._id});
}

module.exports={
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDelelteUserById,
    handleCreateNewUser
}