import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Ornt } from "../entity/Ornt";

router.get("/", function(req, res) {
	getRepository(Ornt)
		.find()
		.then(ornts => {
			return res.status(200).send(ornts);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

export { router as orntRouter };
