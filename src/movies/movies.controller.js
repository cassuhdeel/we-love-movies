const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: `Movie cannot be found.`,
  });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await moviesService.isShowing();
    return res.json({ data });
  }
  const data = await moviesService.list();
  res.json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.readTheaters(movieId);
  res.json({ data });
}

async function readReviews(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.readReviews(movieId);
  res.json({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};