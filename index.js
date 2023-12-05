const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");

const app = express();

mongoose.connect("mongodb+srv://bojjaananya20:sFvyjU3gCeB0yjWw@cluster0.e5axad9.mongodb.net/", {})
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const PORT = 8001;

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
