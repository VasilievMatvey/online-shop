import ReviewModel from "../models/Reviews.js";
import AppError from "../errors/AppError.js";

class Review {
  async getAll(req, res, next) {
    try {
      const reviews = await ReviewModel.getAll(req.params.productId);
      res.json(reviews);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const userId = req.body.userId;
      const productId = req.params.productId;
      const review = await ReviewModel.create(data, userId, productId);
      res.json(review);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error("Не указан id товара");
      }
      const userId = req.body.userId;
      if (!userId) {
        throw new Error("Не указан id пользователя");
      }
      const review = await ReviewModel.delete(userId, req.params.productId);
      res.json(review);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Review();
