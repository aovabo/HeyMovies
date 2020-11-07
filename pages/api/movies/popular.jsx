import axios from "axios";
import config from "../../../config.json";
import querystring from "querystring";

const Popular = async (req, res) => {
  if (req.method !== "GET")
    return res.json({
      status_code: 404,
      status_error: true,
      status_message: "Invalid API Route.",
    });

  const query = querystring.stringify({
    api_key: config.API_KEY,
    page: 1,
  });

  const url = `${config.API_URL}/movie/popular?${query}`;
  const result = await axios({
    method: "GET",
    url,
  });

  return res.json({
    status_code: 200,
    status_error: false,
    status_data: result.data,
  });
};

export default Popular;
