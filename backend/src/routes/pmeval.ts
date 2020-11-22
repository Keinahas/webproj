import * as express from "express";
const router = express.Router();
import { createQueryBuilder, getManager, getRepository } from "typeorm";
import { Emp, EmpDvlpr } from "../entity/Emp";
import { Eval, PMEval } from "../entity/Eval";
import { ProjParticipant } from "../entity/ProjParticipant";

/* GET projs listing. */

router.get("/:sn", function(req, res) {
	getRepository(Eval)
		.findOne({ EVAL_SN: parseInt(req.params.sn) })
		.then(__eval => {
			console.log(__eval);
			let temp = {
				PROJ_SN: __eval.PROJ_SN,
				JOB_EXC_GRD: __eval.JOB_EXC_GRD,
				JOB_EXC_EVAL_CN: __eval.JOB_EXC_EVAL_CN,
				COMM_ABLTY_GRD: __eval.COMM_ABLTY_GRD,
				COMM_ABLTY_EVAL_CN: __eval.COMM_ABLTY_EVAL_CN,
				ASSESSEE_NO: __eval.ASSESSEE_NO,
			};
			return res.status(200).send(temp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.post("/", function(req, res) {
	let _eval = new Eval();
	_eval.PROJ_SN = req.body.PROJ_SN;
	_eval.JOB_EXC_GRD = req.body.JOB_EXC_GRD;
	_eval.JOB_EXC_EVAL_CN = req.body.JOB_EXC_EVAL_CN;
	_eval.COMM_ABLTY_GRD = req.body.COMM_ABLTY_GRD;
	_eval.COMM_ABLTY_EVAL_CN = req.body.COMM_ABLTY_EVAL_CN;
	_eval.ASSESSEE_NO = req.body.ASSESSEE_NO;

	let pmEval = new PMEval();
	_eval.PROJ_SN = req.body.PROJ_SN;
	pmEval.EVAL_MAN_NO = req.body.EVAL_MAN_NO;

	getManager()
		.save(pmEval)
		.then(() => {
			return res.sendStatus(201);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.patch("/:sn", function(req, res) {
	getRepository(Eval)
		.findOne({ EVAL_SN: parseInt(req.params.sn) })
		.then(__eval => {
			console.log(__eval);
			return res.sendStatus(204);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.get("/participants", function(req, res) {
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

router.get("/participants/:projSN", async function(req, res) {
	let t = [];

	let ObjProjParticipant = await getRepository(ProjParticipant).findAndCount({
		PROJ_SN: parseInt(req.params.projSN),
	});

	ObjProjParticipant[0].forEach(async participant => {
		let temp = {
			EMP_SN: participant.EMP_SN,
			EMP_NM: "",
			PROJ_DTY: participant.PROJ_DTY,
			PERIOD: participant.OUTSET_DATE + " ~ " + participant.EXC_DATE,
			CAREER: "-",
			evaled: false,
		};

		// get emp name
		let emp = await getRepository(Emp).findOne({ EMP_SN: participant.EMP_SN });
		temp.EMP_NM = emp.EMP_NM;

		// get emp career
		let devEmp = await getRepository(EmpDvlpr).findOne({ EMP_SN: participant.EMP_SN });
		temp.CAREER = String(devEmp.CAREER);

		// check if assessee is evaled
		let _eval = await createQueryBuilder(Eval)
			.innerJoinAndSelect(PMEval, "PMEval", "PMEval.EVAL_SN = eval.EVAL_SN")
			.where("eval.PROJ_SN = :proj_no", { proj_no: req.params.projSN })
			.andWhere("eval.ASSESSEE_NO = :emp_no", { emp_no: participant.EMP_SN })
			.getOne();
		if (_eval) {
			temp.evaled = true;
		}

		t.push(temp);

		if (t.length == ObjProjParticipant[1]) return res.status(200).send(t);
	});
});

export { router as pmevalRouter };
