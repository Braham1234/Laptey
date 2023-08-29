const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const Validators = require("../../validators/adminValidators");
const adminController = require("../../controller/admin/adminController.auth");
const Middleware = require("../../middleware/adminMiddleware");

router.get("/", adminController.getSignIn);

router.get(
  "/panel",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  adminController.getPanel
);

router.post(
  "/",
  Validators.validateSigninRequest,
  Validators.isRequestValidated,
  adminController.postSignIn
);

router.delete("/signout", adminController.postSignout);

router.post(
  "/product/add",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  // multer().array("productPicture"),
  adminController.postAddProduct
);

router.post(
  "/product/update",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  adminController.postUpdateProducts
);

router.delete(
  "/product/delete/:mealId",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  adminController.deleteProduct
);

router.get(
  "/feedback/getFeedbacks",
  Middleware.requireSignin,
  adminController.getFeedbacks
);

router.get(
  "/getorder",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  adminController.getOrders
);

router.post(
  "/user/getaddress",
  Middleware.requireSignin,
  Middleware.adminMiddleware,
  adminController.getAddress
);

router.get(
  "/reservation/getReservations",
  Middleware.requireSignin,
  adminController.getReservations
);

router.get(
  "/checkout/getCheckouts",
  Middleware.requireSignin,
  adminController.getCheckouts
);

router.get(
  "/products/get",
  Middleware.requireSignin,
  adminController.getProducts
);

router.post(
  "/confirm/checkout/:checkoutID",
  Middleware.requireSignin,
  adminController.postConfirmCheckout
);

router.post(
  "/confirm/reservation/:reservationID",
  Middleware.requireSignin,
  adminController.postConfirmReservation
);

/*
router.get("/initialdata", getInitialData);

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  postAddCategory
);

router.post(
  "/category/update",
  requireSignin,
  adminMiddleware,
  upload.array("categoryImage"),
  postUpdateCategories
);

router.post(
  "/category/delete",
  requireSignin,
  adminMiddleware,
  postDeleteCategories
);

router.get("/category/getCategory", getCategories);
*/

module.exports = router;
