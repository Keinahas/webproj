import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp } from "../entity/Emp";

/* GET users listing. */

router.get("/:id", async function(req, res) {
	getRepository(Emp)
		.findOne({ EMP_SN: parseInt(req.params.id) })
		.then(emp => {
			console.log(emp);
			return res.status(500).send(emp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(500);
		});
});

router.patch("/:id", async function(req, res) {
	getRepository(Emp)
		.findOne({ EMP_SN: parseInt(req.params.id) })
		.then(emp => {
			console.log(emp);
			return res.status(500).send(emp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(500);
		});

	// var empRepository = global.connection.getRepository("EMP");
	// empRepository
	// 	.update(User)
	// 	.set(req.body)
	// 	.where("EMP_SN = :id", { id: req.params.id })
	// 	.execute()
	// 	.then(emp => {
	// 		console.log(emp);
	// 		res.sendStatus(200);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		return res.sendStatus(400);
	// 	});
});

export { router as usersRouter };
