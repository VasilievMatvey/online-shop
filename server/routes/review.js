import express from "express";
import ReviewController from "../controllers/Review.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new express.Router();

router.get("/product/:productId([0-9]+)", ReviewController.getAll);
router.post(
  "/product/:productId([0-9]+)",
  authMiddleware,
  ReviewController.create
);
router.delete("/product/:productId([0-9]+)", ReviewController.delete);

export default router;
