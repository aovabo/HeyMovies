import axios from "axios";
import config from "../../../config.json";
import querystring from "querystring";
import Database from "../../../utils/Database";

const Movie = async (req, res) => {
  if (req.method !== "GET")
    return res.status(404).json({
      status_code: 404,
      status_error: true,
      status_message: "Invalid API Route.",
    });

  if (!req.query?.id)
    return res.json({
      status_code: 400,
      status_error: true,
      status_message: "Invalid Movie ID",
    });

  const query = querystring.stringify({
    api_key: config.API_KEY,
  });

  const url = `${config.API_URL}/movie/${req.query.id}?${query}`;
  const result = await axios({
    method: "GET",
    url,
  });

  const collection = await Database();
  const movieData = await collection.findOne({
    isMovie: true,
    id: result.data.id,
  });

  result.data.nominations = movieData?.nominations || 0;

  return res.json({
    status_code: 200,
    status_data: result.data,
  });
};

export default Movie;
