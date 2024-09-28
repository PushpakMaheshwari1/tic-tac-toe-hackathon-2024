import userModel from "../models/user.js";
import { APIError, STATUS_CODES } from "../../utils/app-errors.js";

export default class BookmarkRepository {
  async createBookmark(userId, bookmarkData) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId },
        { $push: { bookMark: bookmarkData } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to create bookmark");
    }
  }

  async getBookmarks(userId) {
    try {
      const user = await userModel.findOne({ userId });
      return user ? user.bookMark : [];
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to fetch bookmarks");
    }
  }

  async updateBookmark(userId, bookmarkId, updatedData) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId, "bookMark.bookmarkId": bookmarkId },
        { $set: { "bookMark.$": updatedData } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to update bookmark");
    }
  }

  async deleteBookmark(userId, bookmarkId) {
    try {
      const user = await userModel.findOneAndUpdate(
        { userId },
        { $pull: { bookMark: { bookmarkId: bookmarkId } } },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to delete bookmark");
    }
  }
}
