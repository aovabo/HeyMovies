import Mongo from "mongodb";
import path from "path";
const config = require(`${path.resolve("../")}/config.json`);

const client = new Mongo.MongoClient(
  `mongodb://${config.DATABASE.USERNAME}:${config.DATABASE.PASSWORD}@localhost`,
  { useUnifiedTopology: true }
);

console.log("Now starting...");

setInterval(async () => {
  if (!client.isConnected()) await client.connect();
  const db = client.db("moviedb");
  const collection = db.collection("data");

  const keys = await (await collection.find({ isKey: true }).toArray()).filter(
    (key) => key.expir <= Date.now()
  );

  keys.forEach((key) => collection.deleteOne({ isKey: true, key: key.id }));
  console.log("Cleared expired keys.");
}, 60 * 2 * 1000);
