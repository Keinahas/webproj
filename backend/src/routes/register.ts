import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp } from "../entity/Emp";
// const bcrypt = require("bcrypt");

router.post("/", async function(req, res) {
	console.log(req.body);
	let emp = {
		LOGIN_ID: req.body.id,
		PASSWD: req.body.password,
		EMP_NM: req.body.name,
		LAST_ACDMCR: req.body.last_acdmcr,
		RGST_NO: req.body.rgst_no,
	};

	getRepository(Emp)
		.save(emp)
		.then(result => {
			console.log(result);
			return res.status(500).send(result);
		})
		.catch(err => {
			return res.sendStatus(500);
		});

	// getConnection()
	// 	.createQueryBuilder()
	// 	.insert()
	// 	.into(Emp)
	// 	.values(emp)
	// 	.execute()
	// 	.then(result => {
	// 		console.log("Post has been saved: ", result);
	// 		console.log("Now lets load all posts: ");
	// 		res.sendStatus(500);
	// 	})
	// 	.catch(err => {
	// 		console.log("DEBUG", new Error().stack.split("at ")[1].trim());
	// 		console.log(err);
	// 		res.sendStatus(500);
	// 	});
	// let empRepository = global.connection.getRepository("EMP");
	// empRepository
	// 	.save(emp)
	// 	.then(result => {
	// 		console.log("Post has been saved: ", result);
	// 		console.log("Now lets load all posts: ");
	// 		res.sendStatus(500);
	// 	})
	// 	.catch(err => {
	// 		console.log("DEBUG", new Error().stack.split("at ")[1].trim());
	// 		console.log(err);
	// 		res.sendStatus(500);
	// 	});
	// bcrypt
	// 	.genSalt()
	// 	.then(salt => {
	// 		bcrypt.hash(this.password, salt, (err, hashed) => {
	// 			if (err) res.sendStatus(500); // internal error
	// 			this.password = hashed;
	// 			console.log(password);
	// 			// insert into emp;
	// 			return res.sendStatus(200);
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.sendStatus(500); // internal error
	// 	});
});

export { router as registerRouter };
