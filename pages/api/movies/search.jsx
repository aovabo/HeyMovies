import config from "../../../config.json";
import axios from "axios";
import querystring from "querystring";

const Search = async (req, res) => {
  if (req.method !== "POST")
    return res.status(404).json({
      status_code: 404,
      status_error: true,
      status_message: "Invalid API Route.",
    });

  if (!req.body?.title)
    return res.json({
      status_code: 400,
      status_error: true,
      status_message: "Please specify a title to search.",
    });

  const query = querystring.stringify({
    api_key: config.API_KEY,
    query: req.body.title,
  });

  const result = await axios({
    method: "GET",
    url: `${config.API_URL}/search/movie?${query}`,
  });

  if (result.data.results.length < 1)
    return res.json({
      status_code: 200,
      status_error: true,
      status_message: "No movies found with that title.",
    });

  result.data.results = result.data.results.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return res.json({
    status_code: 200,
    status_data: result.data,
  });
};

export default Search;
