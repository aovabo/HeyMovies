import Mongo from "mongodb";
import config from "../config.json";

const client = new Mongo.MongoClient(
  `mongodb://${config.DATABASE.USERNAME}:${config.DATABASE.PASSWORD}@localhost`,
  { useUnifiedTopology: true }
);

const Init = async () => {
  if (!client.isConnected()) await client.connect();
  const database = client.db("moviedb");

  return database.collection("data");
};

export default Init;
