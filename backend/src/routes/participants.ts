import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { ProjParticipant } from "../entity/ProjParticipant";

/* GET participants listing. */

router.get("/", function(req, res) {
	getRepository(ProjParticipant)
		.find()
		.then(participants => {
			return res.status(501);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

export { router as participantRouter };
