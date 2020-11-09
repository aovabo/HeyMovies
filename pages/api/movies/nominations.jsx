import Database from "../../../utils/Database";
import axios from "axios";
import config from "../../../config.json";
import querystring from "querystring";

const Nominations = async (req, res) => {
  if (req.method !== "GET")
    return res.status(404).json({
      status_code: 404,
      status_error: true,
      status_message: "Invalid API Route.",
    });

  const collection = await Database();
  const nominatedMovies = await (
    await collection.find({ isMovie: true }).toArray()
  )
    .filter((movie, index) => movie.nominations > 0 && index < 4)
    .sort((a, b) => b.nominations - a.nominations);

  const query = querystring.stringify({
    api_key: config.API_KEY,
  });

  const movies = nominatedMovies.map(async (movie, index) => {
    const url = `${config.API_URL}/movie/${movie.id}?${query}`;
    const movieFromSearch = await axios({
      method: "GET",
      url,
    });

    movieFromSearch.data.nominations = movie.nominations || 0;
    return movieFromSearch.data;
  });

  res.json({
    status_code: 200,
    status_data: await Promise.all(movies),
  });
};

export default Nominations;
