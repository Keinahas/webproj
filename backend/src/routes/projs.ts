import * as express from "express";
const router = express.Router();
import { createQueryBuilder, getManager, getRepository } from "typeorm";
import { Emp } from "../entity/Emp";
import { Ornt } from "../entity/Ornt";
import { Proj } from "../entity/Proj";
import { ProjParticipant } from "../entity/ProjParticipant";

/* GET projs listing. */
router.get("/", async function(req, res) {
	let t = [];

	let ObjProj = await getRepository(Proj).findAndCount();

	ObjProj[0].forEach(async (proj, idx) => {
		t[idx] = {
			number: proj.PROJ_SN,
			name: proj.PROJ_NM,
			numofpeople: 0,
			date:
				proj.OUTSET_DATE.toISOString()
					.replace("T", " ")
					.substr(0, 10) +
				"/" +
				(proj.END_DATE == null
					? ""
					: proj.END_DATE.toISOString()
							.replace("T", " ")
							.substr(0, 10)), // 프로젝트 착수/종료일자
			client: "-", // 발주처
			pm_name: "",
		};

		// get client
		let ornt = await getRepository(Ornt).findOne({ ORNT_SN: proj.ORNT_SN });
		t[idx].client = ornt.ORNT_NM;

		// get numofpeople
		t[idx].numofpeople = await getRepository(ProjParticipant).count({ PROJ_SN: proj.PROJ_SN });

		// get emp name
		let emp = await createQueryBuilder(Emp)
			.innerJoinAndSelect(ProjParticipant, "participant", "participant.EMP_SN = emp.EMP_SN")
			.where("participant.PROJ_SN = :proj_no", { proj_no: proj.PROJ_SN })
			.andWhere("participant.PROJ_DTY = :dty", { dty: "PM" })
			.getOne();
		if (emp) t[idx].pm_name = emp.EMP_NM;

		if (idx == ObjProj[1] - 1 && t.length == ObjProj[1]) {
			setTimeout(() => {
				res.status(200).send(t);
			}, 300);
		}
	});
});

router.get("/:projSN", function(req, res) {
	getRepository(Proj)
		.findOne({ PROJ_SN: parseInt(req.params.projSN) })
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

router.patch("/:projSN", async function(req, res) {
	let temp = new Proj();
	temp.PROJ_SN = parseInt(req.params.projSN);
	temp.PROJ_NM = req.body.name;

	temp.OUTSET_DATE = new Date(req.body.date.slice(0, req.body.date.indexOf("/")));
	if (!req.body.date.endsWith("/"))
		temp.END_DATE = new Date(req.body.date.slice(req.body.date.indexOf("/") + 1, 21));
	else temp.END_DATE = null;
	let proj = await getRepository(Proj).findOne({ PROJ_SN: parseInt(req.params.projSN) });
	let ornt = await getRepository(Ornt).findOne({ ORNT_NM: req.body.client });
	if (ornt.ORNT_SN != proj.ORNT_SN) {
		temp.ORNT_SN = ornt.ORNT_SN;
	}

	await getManager().save(temp);

	return res.sendStatus(200);
});

export { router as projRouter };
