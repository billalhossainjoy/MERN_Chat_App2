import app from "./app";
import { Config } from "./config/app.config";
import ConnectMongo from "./db";

ConnectMongo()
  .then((res) => {
    console.log(`Mongodb connect on ${res.connection.host}`);
    app.listen(Config.PORT, () =>
      console.log(`Server running on http://localhost:${Config.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
