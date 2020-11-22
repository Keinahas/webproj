import "reflect-metadata";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import { createConnection } from "typeorm";

// create and setup express app
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// create typeorm connection
createConnection()
	.then(result => {
		console.log("success");
	})
	.catch(err => {
		console.log(err);
	});

// register routes
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import { registerRouter } from "./routes/register";
import { projRouter } from "./routes/projs";
import { pmevalRouter } from "./routes/pmeval";
import { crkRouter } from "./routes/crkeval";
import { participantRouter } from "./routes/participants";

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/proj", projRouter);
app.use("/pmeval", pmevalRouter);
app.use("/crkeval", crkRouter);
app.use("/participants", participantRouter);

// start express server
app.listen(3000);
