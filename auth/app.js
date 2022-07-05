const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}!`));
