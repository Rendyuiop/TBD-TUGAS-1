// get review, review by id, reviews by user, reviews by book, and by rating
const getReview =
  'SELECT * FROM public.review';

const getReviewById =
  'SELECT * FROM public.review WHERE reviewid = $1';

const getReviewsByUser =
  'SELECT * FROM public.review WHERE userid = $1';

const getReviewsByBook =
  'SELECT * FROM public.review WHERE bookid = $1';

const getReviewsByRate =
  'SELECT * FROM public.review WHERE rating = $1';

// add review
const addReview =
  'INSERT INTO public.review (bookid, userid, rating, comment, date) VALUES ($1, $2, $3, $4, $5)';

// update review
const updateReview =
  'UPDATE public.review SET rating = $1, comment = $2, date = $3 WHERE reviewid = $4';

// delete review
const deleteReview =
  'DELETE FROM public.review WHERE reviewid = $1';

module.exports = {
  getReview,
  getReviewById,
  getReviewsByUser,
  getReviewsByBook,
  getReviewsByRate,
  addReview,
  updateReview,
  deleteReview
};
