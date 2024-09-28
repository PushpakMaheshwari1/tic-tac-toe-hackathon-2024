import userService from "../services/user-service.js";
import userModel from "../database/models/user.js";
import QuoteRepository from "../repositories/quote-repository.js"; // Import quote repository
import BookmarkRepository from "../repositories/bookmark-repository.js"; // Import bookmark repository

const user = (app) => {
  const service = new userService();
  const quoteRepo = new QuoteRepository(); // Instantiate quote repo
  const bookmarkRepo = new BookmarkRepository(); // Instantiate bookmark repo

  app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to user microservice" });
  });

  // User Registration
  app.post("/auth/register", async (req, res, next) => {
    try {
      const { email } = req.body;
      const alreadyUser = await userModel.findOne({ email });
      if (!alreadyUser) {
        const { data } = await service.SignUp(req.body);
        return res.json(data);
      } else {
        return res.status(400).json({ message: "User already registered" });
      }
    } catch (err) {
      next(err);
    }
  });

  // User Login
  app.post("/auth/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // CRUD for Quotes
  app.post("/quotes", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const quoteData = req.body;
      const user = await quoteRepo.createQuote(userId, quoteData);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });

  app.get("/quotes", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const quotes = await quoteRepo.getQuotes(userId);
      return res.json(quotes);
    } catch (err) {
      next(err);
    }
  });

  app.put("/quotes/:quoteId", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const quoteId = req.params.quoteId;
      const updatedData = req.body;
      const user = await quoteRepo.updateQuote(userId, quoteId, updatedData);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/quotes/:quoteId", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const quoteId = req.params.quoteId;
      const user = await quoteRepo.deleteQuote(userId, quoteId);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });

  // CRUD for Bookmarks
  app.post("/bookmarks", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const bookmarkData = req.body;
      const user = await bookmarkRepo.createBookmark(userId, bookmarkData);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });

  app.get("/bookmarks", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const bookmarks = await bookmarkRepo.getBookmarks(userId);
      return res.json(bookmarks);
    } catch (err) {
      next(err);
    }
  });

  app.put("/bookmarks/:bookmarkId", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const bookmarkId = req.params.bookmarkId;
      const updatedData = req.body;
      const user = await bookmarkRepo.updateBookmark(userId, bookmarkId, updatedData);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/bookmarks/:bookmarkId", async (req, res, next) => {
    try {
      const userId = req.user.userId; // Assuming userId comes from middleware
      const bookmarkId = req.params.bookmarkId;
      const user = await bookmarkRepo.deleteBookmark(userId, bookmarkId);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  });
};

export default user;
