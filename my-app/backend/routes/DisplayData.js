const express = require('express')
const router = express.Router();

router.post('/foodData', (req, res) =>{
    try{
        
        res.send([global.food_items,global.food_category ]);

    }
    catch (error){
        console.error("Server Error");
        res.send("Server Error");
    }
})

module.exports = router;