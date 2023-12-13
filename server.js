require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const rootRouter = require("./routes/root");
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// static folder
app.use(express.static("public"));

// middlewares
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/", rootRouter);

// connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		dbName: "DB",
	})
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				"Server connected to DB & listening on port : " + process.env.PORT
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
