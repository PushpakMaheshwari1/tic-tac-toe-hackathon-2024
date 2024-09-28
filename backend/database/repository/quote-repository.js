import userModel from "../models/user.js";
import { APIError, STATUS_CODES } from "../../utils/app-errors.js";

export default class QuoteRepository {
  async createQuote(userId, quoteData) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId },
        { $push: { quotes: quoteData } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to create quote");
    }
  }

  async getQuotes(userId) {
    try {
      const user = await userModel.findOne({ userId });
      return user ? user.quotes : [];
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to fetch quotes");
    }
  }

  async updateQuote(userId, quoteId, updatedData) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId, "quotes.quotesId": quoteId },
        { $set: { "quotes.$": updatedData } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to update quote");
    }
  }

  async deleteQuote(userId, quoteId) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId },
        { $pull: { quotes: { quotesId: quoteId } } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to delete quote");
    }
  }
}
