import { Review as ReviewMapping } from "./mapping.js";
import RatingModel from "../models/Rating.js";

class Review {
  async create(data, userId, productId) {
    const { title, text, rating, userName } = data;
    const review = await ReviewMapping.create({
      title,
      text,
      rating,
      userName,
      userId,
      productId,
    });
    await RatingModel.create(userId, productId, rating);
    return review;
  }
  async getAll(productId) {
    const reviews = await ReviewMapping.findAll({ where: { productId } });
    return reviews;
  }

  async delete(userId, productId) {
    const review = await ReviewMapping.findOne({
      where: { userId, productId },
    });
    const rate = await RatingModel.findOne({ where: { userId, productId } });
    if (!review) {
      throw new Error("Отзыв не найден");
    }
    if (!rate) {
      throw new Error("Оценка не найдена");
    }
    await review.destroy();
    await rate.destroy();
    return review;
  }
}

export default new Review();
