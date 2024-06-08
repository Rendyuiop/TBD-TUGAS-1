const pool = require("../../db");
const queries = require("./queries");

// Get all reviews
const getAllReviews = (req, res) => {
  pool.query('SELECT * FROM public.review', (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json(results.rows);
  });
};

// Get a review by ID
const getReviewByID = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM public.review WHERE reviewid = $1', [id], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.rows.length === 0) {
          return res.status(404).json({ message: "Review not found." });
      }
      res.status(200).json(results.rows);
  });
};

// Get reviews by user ID
const getReviewsByUser = (req, res) => {
  const userid = parseInt(req.params.userid);
  if (isNaN(userid) || userid < 1 || userid > 20) {
      return res.status(400).json({ message: "UserID must be between 1 and 20." });
  }
  pool.query('SELECT * FROM public.review WHERE userid = $1', [userid], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.rows.length === 0) {
          return res.status(404).json({ message: "No reviews found for this user." });
      }
      res.status(200).json(results.rows);
  });
};

// Get reviews by book ID
const getReviewsByBook = (req, res) => {
  const bookid = parseInt(req.params.bookid);
  if (isNaN(bookid) || bookid < 1 || bookid > 20) {
      return res.status(400).json({ message: "BookID must be between 1 and 20." });
  }
  pool.query('SELECT * FROM public.review WHERE bookid = $1', [bookid], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.rows.length === 0) {
          return res.status(404).json({ message: "No reviews found for this book." });
      }
      res.status(200).json(results.rows);
  });
};

// Get reviews by book Rating
const getReviewsByRate = (req, res) => {
    const rating = parseInt(req.params.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }
    pool.query('SELECT * FROM public.review WHERE rating = $1', [rating], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "No reviews found with this rating." });
        }
        res.status(200).json(results.rows);
    });
};


// Add a new review
const addReview = (req, res) => {
  console.log('Received addReview request:', req.body);
  
  const { bookid, userid, rating } = req.body;

  // Validate input data
  if (isNaN(bookid) || isNaN(userid) || isNaN(rating) || bookid < 1 || bookid > 20 || userid < 1 || userid > 20 || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid input data. BookID and UserID must be between 1 and 20, and Rating must be between 1 and 5." });
  }

  const date = new Date().toISOString().slice(0, 10);

  let commentText = "";
  switch (rating) {
    case 5:
      commentText = "An absolute page-turner!";
      break;
    case 4:
      commentText = "A solid read!";
      break;
    case 3:
      commentText = "Enjoyable, but could be better.";
      break;
    case 2:
      commentText = "Disappointing.";
      break;
    case 1:
      commentText = "Not worth the time.";
      break;
  }

  console.log('Inserting review into database:', { bookid, userid, rating, commentText, date });

  pool.query(
    'INSERT INTO public.review (bookid, userid, rating, comment, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [bookid, userid, rating, commentText, date],
    (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({ message: `Review added with ID: ${results.rows[0].reviewid}` });
    }
  );
};

// Update a review
const updateReview = (req, res) => {
  const id = parseInt(req.params.id);
  const { rating } = req.body;

  // Validate input data
  if (isNaN(id) || isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid input data. Rating must be between 1 and 5." });
  }

  const date = new Date().toISOString().slice(0, 10); // Get today's date

  let commentText = "";
  switch (rating) {
    case 5:
      commentText = "An absolute page-turner!";
      break;
    case 4:
      commentText = "A solid read!";
      break;
    case 3:
      commentText = "Enjoyable, but could be better.";
      break;
    case 2:
      commentText = "Disappointing.";
      break;
    case 1:
      commentText = "Not worth the time.";
      break;
    default:
      commentText = "";
  }

  pool.query(
    'UPDATE public.review SET rating = $1, comment = $2, date = $3 WHERE reviewid = $4 RETURNING *',
    [rating, commentText, date, id],
    (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.rowCount === 0) {
        return res.status(404).json({ message: `Review with ID ${id} not found.` });
      }
      res.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};


// Delete a review
const deleteReview = (req, res) => {
    const id = parseInt(req.params.id);
  
    // Validasi untuk memastikan ID adalah angka yang valid
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid review ID." });
    }
  
    pool.query('DELETE FROM public.review WHERE reviewid = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount === 0) {
        return res.status(404).json({ message: `Review with ID ${id} not found.` });
      }
      res.status(200).send(`Review deleted with ID: ${id}`);
    });
  };  

module.exports = {
  getAllReviews,
  getReviewByID,
  getReviewsByUser,
  getReviewsByBook,
  getReviewsByRate,
  addReview,
  updateReview,
  deleteReview,
};
