import Database from "../../utils/Database";

const User = async (req, res) => {
  const { username, password } = req.body;

  switch (req.method) {
    case "POST": {
      // login
      const id = username.toLowerCase();
      const collection = await Database();
      const user = await collection.findOne({ isUser: true, id, password });

      if (!user)
        return res.json({
          status_code: 400,
          status_error: true,
          status_message: "Invalid account details. Please try again.",
        });

      const key = Buffer.alloc(8 + id.length);
      key.writeBigUInt64BE(BigInt(Date.now()));
      key.write(id, 8);

      const keyStr = key.toString("hex");
      const keyData = {
        isKey: true,
        key: keyStr,
        user: id,
        expir: Date.now() + 60 * 60 * 1000,
      };

      await collection.insertOne(keyData);

      res.json({
        status_code: 200,
        status_data: {
          key: keyStr,
          user,
        },
        status_message: "Account login success.",
      });

      break;
    }

    case "PUT": {
      if (
        !username ||
        username.length < 4 ||
        username.length > 18 ||
        !password ||
        password.length < 4 ||
        password.length > 18
      )
        return res.json({
          status_code: 400,
          status_error: true,
          status_message:
            "Please make sure that the username or password length is below 4 and maximum of 18",
        });

      const id = username.toLowerCase();
      const collection = await Database();
      const user = await collection.findOne({ isUser: true, id });

      if (user)
        return res.json({
          status_code: 400,
          status_error: true,
          status_message: "Account already exists.",
        });

      const userData = {
        isUser: true,
        id,
        username,
        password,
        movies: [],
      };

      const key = Buffer.alloc(8 + id.length);
      key.writeBigUInt64BE(BigInt(Date.now()));
      key.write(id, 8);

      const keyStr = key.toString("hex");
      const keyData = {
        isKey: true,
        key: keyStr,
        user: id,
        expir: Date.now() + 60 * 60 * 1000,
      };

      await collection.insertOne(keyData);
      await collection.insertOne(userData);
      res.json({
        status_code: 200,
        status_message: "Successfully created account.",
        status_data: {
          key: keyStr,
          user: userData,
        },
      });

      break;
    }

    default: {
      res.status(404).json({
        status_code: 404,
        status_error: true,
        status_message: "Invalid API Route.",
      });
      break;
    }
  }
};

export default User;
