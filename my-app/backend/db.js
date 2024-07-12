// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://gofood:uLTf7xX4JryxKtsE@ac-vadtvqa-shard-00-00.v10znzl.mongodb.net:27017,ac-vadtvqa-shard-00-01.v10znzl.mongodb.net:27017,ac-vadtvqa-shard-00-02.v10znzl.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ab5ju5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

// const mongoDB = async () => {
//     await mongoose.connect(mongoURI, async(err, result) =>{
//         if(err) console.log("---", err)
//             else{
//                 console.log("Connected to MongoDB");
//                 const fetched_data = await mongoose.connection.db.collection("food_items");
//                 fetched_data.find({}).toArray(async function(err, data){
//                     const foodCategory = await mongoose.connection.db.collection("food_category");
//                     foodCategory.find({}).toArray(function(err, catData){
//                         if(err) console.log(err);
//                         else{
//                             global.food_items =data;
//                             global.food_category = catData;
//                             console.log(global.food_items);
//                             console.log(global.food_category);
//                         }
//                     })
//                 })
//             }
//     })
// };

// module.exports = mongoDB;
const mongoose = require('mongoose');

const mongoURI = 'mongodb://gofood:uLTf7xX4JryxKtsE@ac-vadtvqa-shard-00-00.v10znzl.mongodb.net:27017,ac-vadtvqa-shard-00-01.v10znzl.mongodb.net:27017,ac-vadtvqa-shard-00-02.v10znzl.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ab5ju5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }); // Assuming Mongoose version >= 5
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Fetch data from "food_items" collection
    const foodItems = await db.collection("food_items").find({}).toArray();

    // Fetch data from "food_category" collection
    const foodCategory = await db.collection("food_category").find({}).toArray();

    // Process the fetched data (foodItems and foodCategory) here (optional)
    global.food_items = foodItems;
    global.food_category = foodCategory;

    console.log('Food Items:', foodItems);
    console.log('Food Category:', foodCategory);

    // **Optional: Pass data to a function or route for further processing**
    // handleData(foodItems, foodCategory);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

module.exports = mongoDB;
