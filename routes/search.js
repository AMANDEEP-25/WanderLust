const express = require("express");
const router = express.Router();
const Listing = require("../models/listing"); // Adjust the path to your Listing model

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.redirect("/listings"); // Redirect if no query is provided
  }

  try {
    const results = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });
    res.render("listings/searchResults", { results, query });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
