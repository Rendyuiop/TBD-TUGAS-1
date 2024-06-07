const pool = require("../../db/");
const queries = require("./queries");


// Get all reviews
const getAllReviews = (req, res) => {
  pool.query('SELECT * FROM public.review', (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows);
  });
};

// Get a review by ID
const getReviewByID = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM public.review WHERE reviewid = $1', [id], (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows);
  });
};

// Get reviews by user ID
const getReviewsByUser = (req, res) => {
  const userid = parseInt(req.params.userid);
  pool.query('SELECT * FROM public.review WHERE userid = $1', [userid], (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows);
  });
};

// Get reviews by book ID
const getReviewsByBook = (req, res) => {
  const bookid = parseInt(req.params.bookid);
  pool.query('SELECT * FROM public.review WHERE bookid = $1', [bookid], (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows);
  });
};

// Add a new review
const addReview = (req, res) => {
  const { bookid, userid, rating, comment, date } = req.body;
  pool.query(
      'INSERT INTO public.review (bookid, userid, rating, comment, date) VALUES ($1, $2, $3, $4, $5)',
      [bookid, userid, rating, comment, date],
      (error, results) => {
          if (error) {
              throw error;
          }
          res.status(201).send(`Review added with ID: ${results.insertId}`);
      }
  );
};

// Update a review
const updateReview = (req, res) => {
  const id = parseInt(req.params.id);
  const { rating, comment, date } = req.body;

  pool.query(
      'UPDATE public.review SET rating = $1, comment = $2, date = $3 WHERE reviewid = $4',
      [rating, comment, date, id],
      (error, results) => {
          if (error) {
              throw error;
          }
          res.status(200).send(`Review modified with ID: ${id}`);
      }
  );
};

// Delete a review
const deleteReview = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM public.review WHERE reviewid = $1', [id], (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).send(`Review deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllReviews,
  getReviewByID,
  getReviewsByUser,
  getReviewsByBook,
  addReview,
  updateReview,
  deleteReview,
};
