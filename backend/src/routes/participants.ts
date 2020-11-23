import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp, EmpDvlpr } from "../entity/Emp";
import { Ornt } from "../entity/Ornt";
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

router.get("/:empSN", function(req, res) {
	getRepository(ProjParticipant)
		.findAndCount({ where: { EMP_SN: parseInt(req.params.empSN) }, relations: ["PROJ_SN"] })
		.then(participants => {
			let t = [];
			participants[0].forEach(async (participant, idx) => {
				t[idx] = {
					number: participant.PROJ_SN.PROJ_SN,
					name: participant.PROJ_SN.PROJ_NM,
					OUTSET_DATE: participant.PROJ_SN.OUTSET_DATE.toISOString()
						.replace("T", " ")
						.substr(0, 10),
					END_DATE: null,
					ORNT_SN: participant.PROJ_SN.ORNT_SN,
					client: "",
					numofpeople: 0,
					date: "",
				};
				let ornt = await getRepository(Ornt).findOne({
					ORNT_SN: participant.PROJ_SN.ORNT_SN,
				});
				let count = await getRepository(ProjParticipant).findAndCount({
					where: {
						PROJ_SN: t[idx].number,
					},
				});

				t[idx].date = t[idx].OUTSET_DATE + "/";
				if (participant.PROJ_SN.END_DATE) {
					t[idx].END_DATE = participant.PROJ_SN.END_DATE.toISOString()
						.replace("T", " ")
						.substr(0, 10);
					t[idx].date += t[idx].END_DATE;
				}
				t[idx].client = ornt.ORNT_NM;
				t[idx].numofpeople = count[1];
				if (idx == participants[1] - 1) {
					console.log(t);
					setTimeout(function() {
						res.status(200).send(t);
					}, 100);
				}
			});
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.get("/chkPM/:EmpSN", function(req, res) {
	getRepository(ProjParticipant)
		.findOne({ EMP_SN: parseInt(req.params.EmpSN) })
		.then(participant => {
			if (!participant) return res.sendStatus(200); // not pm
			if (participant.PROJ_DTY == "PM") {
				return res.sendStatus(204); // isPM
			} else {
				return res.sendStatus(200); // not pm
			}
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
router.get("/proj/:projSN", async function(req, res) {
	let t = [];
	let ObjParticipants = await getRepository(ProjParticipant).findAndCount({
		where: { PROJ_SN: parseInt(req.params.projSN) },
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
