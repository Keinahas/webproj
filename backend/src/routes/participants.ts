import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp, EmpDvlpr } from "../entity/Emp";
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

// need to return from dev joining projParticipants of projSN
/*
	number: Serial_Number,	// from Emp | participants | EmpDvlpr
	name: "",				// from Emp
	proj_job: "개발자/",	// from Participants
	date: "",				// from Participants
	career: "",				// from EmpDvlpr
*/
router.get("/:projSN", async function(req, res) {
	let t = [];
	let ObjParticipants = await getRepository(ProjParticipant).findAndCount({
		PROJ_SN: parseInt(req.params.projSN),
	});
	ObjParticipants[0].forEach(async (participant, idx) => {
		t[idx] = {
			number: participant.EMP_SN,
			name: "",
			proj_job: "개발자/" + participant.PROJ_DTY,
			date: participant.OUTSET_DATE.toISOString()
				.replace("T", " ")
				.substr(0, 10),
			career: "",
		};

		// get name
		let emp = await getRepository(Emp).findOne({ EMP_SN: participant.EMP_SN });
		t[idx].name = emp.EMP_NM;

		// get career
		let dev = await getRepository(EmpDvlpr).findOne({ EMP_SN: participant.EMP_SN });
		t[idx].career = String(dev.CAREER);

		if (idx == ObjParticipants[1] - 1 && t.length == ObjParticipants[1]) {
			setTimeout(() => {
				res.status(200).send(t);
			}, 300);
		}
	});
});

export { router as participantRouter };
