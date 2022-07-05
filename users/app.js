const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}!`));
