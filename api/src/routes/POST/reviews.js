const { Router } = require("express");
const postReviews = require("../../controllers/POST/addReview.js");
const router = Router();

router.post("/reviews", async (req, res)=>{
    const { reviewData, id } = req.body;
    try{
        const review = await postReviews(reviewData, id)
        res.status(200).json(review)
    }catch(err){
        res.status(400).json({ err: err.message })
    }
});

module.exports = router;