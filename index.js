const express = require("express");
const fs = require("fs");
const app = express();
// const users = require("./MOCK_DATA.json");
const port = 8000;
const mongoose = require("mongoose");

//connect mongo
mongoose
  .connect("mongodb://0.0.0.0:27017/saiteja")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,

      required: true,
      unique: true,
    },
    IpAddress: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//middleware or plugin
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async(req, res) => {
  const allDbUsers=await User.find({})
  return res.json(allDbUsers);
});

app.get("/users", async(req, res) => {
  const allDbUsers=await User.find({})
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ status: "user not found" });
    }
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:'changed'})
    return res.json({ status: "success" });
  })
  .delete(async(req, res) => {
    await User.findOneAndDelete(req.params.id)
    return res.json({ status: "deleted" });
  });

app.post("/api/users", async (req, res) => {
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
  // const newUser = { id: users.length + 1, ...body };
  // users.push(newUser);
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    IpAddress: body.ip_address,
  });
  console.log(result);
  return res.status(201).json({ msg: "success" });
});
// app.get('/api/users/:id',(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return res.json(user)
// })
// app.patch('/api/users/:id',(req,res)=>{                //as these three routes are same we can reformat into the above one
//     return res.json({status:"pending"})
// })
// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status:"pending"})
// })

app.listen(port, () => {
  console.log("is it working");
});
