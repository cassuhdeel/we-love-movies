const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function list(req, res) {
  const movieId = req.params.movie_id;
  let data;
  if (movieId) {
    data = await service.listTheatersByMovie(movieId);
  } else {
    data = await service.list();
  }
  res.json({ data });
}


module.exports = {
    list: asyncErrorBoundary(list),
}