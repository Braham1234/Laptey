const express = require("express");
const publicControllers = require("../controller/publicControllers");

const router = express.Router();

router.get("/about", publicControllers.getAbout);

router.get("/reservation", publicControllers.getReservation);

router.get("/how_it_works", publicControllers.getHowItWorks);

router.get("/", publicControllers.getHome);

router.get("/products/:category", publicControllers.getProducts);

router.get("/product-by-id/:id", publicControllers.getProductById);

router.get("/search", publicControllers.getSearchedItem);

module.exports = router;
