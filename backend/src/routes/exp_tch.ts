import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp } from "../entity/Emp";
import { Tch } from "../entity/Tch";

/* GET participants listing. */

router.get("/", function(req, res) {
	return res.sendStatus(501);
	// getRepository(ProjParticipant)
	// 	.find()
	// 	.then(participants => {
	// 		return res.status(501);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		return res.sendStatus(400);
	// 	});
});

// need to return string
router.get("/:empSN", async function(req, res) {
	let ObjEmps = await getRepository(Emp).findAndCount({
		where: { EMP_SN: req.params.empSN },
		relations: ["tchs"],
	});

	if (ObjEmps[0][0].tchs.length == 0) return res.sendStatus(200);

	let buf = "";
	ObjEmps[0][0].tchs.forEach((tch, idx) => {
		buf += tch.TCH_NM + (idx != ObjEmps[0][0].tchs.length - 1 ? ", " : "");

		if (idx == ObjEmps[0][0].tchs.length - 1) {
			setTimeout(() => {
				res.status(200).send(buf);
			}, 300);
		}
	});
});

export { router as expTchRouter };
