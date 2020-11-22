import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Proj } from "../entity/Proj";

/* GET projs listing. */

router.get("/:id", function(req, res) {
	getRepository(Proj)
		.findOne({ PROJ_SN: parseInt(req.params.id) })
		.then(proj => {
			console.log(proj);
			let temp = {};
			return res.status(200).send(temp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.patch("/:id", function(req, res) {
	getRepository(Proj)
		.findOne({ PROJ_SN: parseInt(req.params.id) })
		.then(proj => {
			console.log(proj);
			return res.sendStatus(501);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

export { router as projRouter };
