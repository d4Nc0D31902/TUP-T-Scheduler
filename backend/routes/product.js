const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getAllProductReviews,
  getAdminProducts,
  deleteReview,
  productSales,
  reactivateProduct,
  deactivateProduct,
  showReview,
  hideReview,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// router.get('/products', isAuthenticatedUser,authorizeRoles('admin'),getProducts);
// router.get('/products',  isAuthenticatedUser,  authorizeRoles('admin','user'), getProducts)
router.get("/products", getProducts);
// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.get("/product/:id", getSingleProduct);
router
  .route("/admin/product/stock:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "officer"),
    upload.array("images", 10),
    updateProduct
  );
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "officer"),
    upload.array("images", 10),
    updateProduct
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "officer"),
    deleteProduct
  );
router.put("/review", isAuthenticatedUser, createProductReview);
// router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.get("/reviews", isAuthenticatedUser, getAllProductReviews);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin", "officer"),
  getAdminProducts
);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin", "officer"),
  upload.array("images", 10),
  newProduct
);
router.delete(
  "/reviews",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteReview
);
router.get("/admin/products/sales", productSales);
module.exports = router;

router.put(
  "/admin/product/deactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deactivateProduct
);
router.put(
  "/admin/product/reactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reactivateProduct
);
router.put(
  "/reviews/show/:reviewId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  showReview
);
router.put(
  "/reviews/hide/:reviewId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  hideReview
);
