const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const Validators = require("../../validators/auth");

const Middleware = require("../../middleware/middleware");

const userController = require("../../controller/User/userController.auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/signin", userController.getSignin);

router.post(
  "/signin",
  Validators.validateSigninRequest,
  Validators.isRequestValidated,
  userController.postSignin
);

router.get("/signup", userController.getSignup);

router.post(
  "/signup",
  Validators.validateSignupRequest,
  Validators.isRequestValidated,
  userController.postSignup
);

router.delete("/signout", userController.postSignout);

router.post(
  "/user/cart/add-to-cart",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postAddToCart
);

router.post(
  "/reservation",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postReservation
);

router.delete(
  "/reservation/remove/:reservationID",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.deleteReservation
);

router.get(
  "/my-reservations",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.getReservationsUser
);

router.post("/about", userController.postFeedback);

router.get("/my-cart", Middleware.requireSignin, userController.getCartItems);

router.get(
  "/recommendations",
  Middleware.requireSignin,
  userController.getRecommendations
);

router.post(
  "/my-cart/removeItem",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postRemoveCartItems
);

router.post(
  "/user/address/create",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postAddAddress
);

router.post(
  "/addorder",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postAddOrder
);

router.post(
  "/checkout",
  Middleware.requireSignin,
  Middleware.userMiddleware,
  userController.postCheckout
);

/*
router.get("/search", userController.getSearch);
router.get("/category/getCategory", getCategories);
router.get("/getProduct/:categoryId", getProductByCategory);
*/

module.exports = router;
