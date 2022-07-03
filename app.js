const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const useRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);
app.use("/users", useRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
