const mongoose = require('mongoose');

main()
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const User = mongoose.model("User", userSchema);


User.deleteOne({name: "John Doe"})
.then((res) => {
    console.log('User deleted successfully:', res); 
})
.catch((err) => {
    console.error('Error deleting user:', err);
});

User,deleteMany({age: {$lt: 30}})
.then((res) => {
    console.log('Users deleted successfully:', res);
})
.catch((err) => {
    console.error('Error deleting users:', err);
});

//When you want to print that document in console window
User.findOneAndDelete({name: "Jane Smith"})
.then((res) => {
    console.log('User deleted successfully:', res);
})
.catch((err) => {
    console.error('Error deleting user:', err);
});

//By Id 
User.findByIdAndDelete('6ad44e349c1187ca65adc7c4')
.then((res) => {
    console.log('User deleted successfully:', res); 
})
.catch((err) => {
    console.error('Error deleting user:', err);
});

// User.updateOne({name: "John Doe"}, {$set: {age: 31}})
// .then((res) => {
//     console.log('User updated successfully:', res);
// })
// .catch((err) => {
//     console.error('Error updating user:', err);
// });

// User.updateMany({age: {$gt: 30}}, {age: 30})  
// .then((res) => {
//     console.log('Users updated successfully:', res);
// })
// .catch((err) => {
//     console.error('Error updating users:', err);
// });


// //This prints your updated result in console window
// User.findOneAndUpdate({name: "Jane Smith"}, {age: 26}, {new: true})
// .then((res) => {
//     console.log('User updated successfully:', res);
// })
// .catch((err) => {
//     console.error('Error updating user:', err);
// });

// //by Id
// User.findByIdAndUpdate('6ad44e349c1187ca65adc7c4', {age: 32}, {new: true})
// .then((res) => {
//     console.log('User updated successfully:', res);
// })
// .catch((err) => {
//     console.error('Error updating user:', err);
// });

// const user1 = new User({
//     name: "John Doe",
//     email: "john@gmail.com",
//     age: 30
// })

// user1.save();

// const user2 = new User({
//     name: "Jane Smith",
//     email: "jane@gmail.com",
//     age: 25
// })

// user2
// .save()
// .then(() => {
//     console.log('User saved successfully');
// })
// .catch((err) => {
//     console.error('Error saving user:', err);
// }); 

// User.insertMany([
//     { name: "Alice Johnson", email: "alice@gmail.com", age: 28 },
//     { name: "Bob Brown", email: "bob@gmail.com", age: 35 },
//     { name: "Charlie Davis", email: "charlie@gmail.com", age: 40 }
// ]).then(() => {
//     console.log('Users inserted successfully');
// }).catch((err) => {
//     console.error('Error inserting users:', err);
// });

// User.find({age : {$lt:30}})
// .then((res) =>{
//     console.log(res)
// })
// .catch((err) => {
//     console.error('Error finding users:', err);
// });

// User.findById('6ad44e349c1187ca65adc7c4')
// .then((res) => {
//     console.log(res)
// })
// .catch((err) => {
//     console.error('Error finding user by ID:', err);
// });