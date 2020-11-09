import Database from "../../../utils/Database";

const Nominate = async (req, res) => {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(404).json({
      status_code: 404,
      status_error: true,
      status_message: "Invalid API Route.",
    });

  const { movie } = req.body;
  if (typeof movie !== "number")
    return res.json({
      status_code: 400,
      status_error: true,
      status_message: 'Invalid "movie" param.',
    });

  const collection = await Database();
  const authorization = req.headers.authorization || "";
  const sessionKey = authorization.split("Auth")[1]?.trim();
  const keyData = await collection.findOne({ isKey: true, key: sessionKey });

  if (!keyData)
    return res.json({
      status_code: 401,
      status_error: true,
      status_remove_key: true,
      status_message: "Invalid session key.",
    });

  if (keyData.expir <= Date.now())
    return res.json({
      status_code: 400,
      status_error: true,
      status_remove_key: true,
      status_message: "Session key expired.",
    });

  const user = await collection.findOne({ isUser: true, id: keyData.user });
  if (!user)
    return res.json({
      status_code: 400,
      status_error: true,
      status_remove_key: true,
      status_message: "Invalid user associated with session key.",
    });

  if (req.method === "POST") {
    if (user.movies.includes(movie))
      return res.json({
        status_code: 400,
        status_error: true,
        status_message: "Movie already nominated.",
      });

    if (user.movies.length >= 5)
      return res.json({
        status_code: 400,
        status_error: true,
        status_message: "You already nominated 5 movies.",
      });
  }

  const movieData = (await collection.findOne({
    isMovie: true,
    id: movie,
  })) || { isMovie: true, id: movie, nominations: 0 };

  if (req.method === "DELETE") {
    if (!user.movies.includes(movie))
      return res.json({
        status_code: 400,
        status_error: true,
        status_message: "This movie is not in your movies list.",
      });

    if (movieData.nominations > 0) movieData.nominations--;
    user.movies = user.movies.filter((id) => id !== movie);
  } else {
    movieData.nominations++;
    user.movies.push(movie);
  }

  await collection.replaceOne({ isUser: true, id: user.id }, user);
  await collection.replaceOne({ isMovie: true, id: movie }, movieData, {
    upsert: true,
  });

  return res.json({
    status_code: 200,
    status_data: movieData,
    status_message: `Successfully ${
      req.method === "DELETE" ? "removed from nomination" : "nominated movie."
    } ${
      user.movies.length >= 5
        ? "You cannot nominate anymore movies, as you have reached the maximum limit for nomination."
        : ""
    }`,
  });
};

export default Nominate;
