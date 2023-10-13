var express = require("express");
var router = express.Router();
require("../models/connection");

const Place = require("../models/places");

router.post("/places", (req, res) => {
  const newPlace = new Place({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  newPlace.save().then((data) => {
    res.json({ result: true, added: data });
  });
});

router.get("/places/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) => {
    if (data) {
      res.json({ result: true, places: data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.delete("/places", (req, res) => {
  Place.deleteOne({
    nickname: req.body.nickname,
    name: req.body.name,
  }).then((data) => {
    if (data.deletedCount > 0) {
      Place.find().then((data2) => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: "Data not found" });
    }
  });
});

module.exports = router;
