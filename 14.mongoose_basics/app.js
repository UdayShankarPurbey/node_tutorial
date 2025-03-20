const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/").then(() => console.log("Connected to MongoDB"));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age : Number,
  isActive : Boolean,
  tages : [String],
  createdAt : { type : Date , default : Date.now()}
});

const User = mongoose.model('User', userSchema);

async function runQueryExample () {
  try {
    // const newUser = await User.create({
    //   name: "John Doe",
    //   email: "john.doe1@example.com",
    //   age: 25,
    //   isActive: false,
    //   tages: ["designer"]
    // })

    // console.log("New user: " + newUser);

    // const isActiveFalseUserList = await User.find({isActive : false})
    // console.log("Users with isActive false: " + isActiveFalseUserList);

    // const findUser = await User.findOne({name : "John Doe"})
    // console.log("Found user: " + findUser);

    // const findUserById = await User.findById('67dbb4c0ae3fb7e0caaca399');
    // console.log("Found user by ID: " + findUserById);

    // const getRequiredFields = await User.find({}).select('name email');
    // console.log("Users with required fields: " + getRequiredFields);

    // const limitedUsers = await User.find().limit(3).skip(3);
    // console.log("Limited users: " + limitedUsers);

    // const sortedUsers = await User.find().sort({ age : -1})
    // console.log("Sorted users by age: " + sortedUsers);

    // const countDocuments = await User.countDocuments({isActive : true});
    // console.log("Number of active users: " + countDocuments);

    // const deleteUser = await User.findByIdAndDelete('67dbb6b051634fb26ef81f33')
    // console.log("Deleted user: " + deleteUser);

    const updateUser = await User.findByIdAndUpdate('67dbb537e4c6f87128abcc98', {age : 85})
    console.log("Updated user: " + updateUser);

  } catch (error) {
    console.error("Error : ",error);
  } finally {
    await mongoose.connection.close();
  }
}


runQueryExample();