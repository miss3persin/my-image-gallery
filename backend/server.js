const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server is up and running!");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
