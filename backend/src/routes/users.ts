import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp, EmpDvlpr, EmpMarkt, EmpMngmtManage, EmpRsrchDvlp } from "../entity/Emp";

/* GET users listing. */

router.get("/", async function(req, res) {
	let t = [];
	let Obj = await getRepository(Emp).findAndCount();
	Obj[0].forEach(async (emp, idx) => {
		let opt = { EMP_SN: emp.EMP_SN };
		t[idx] = {
			emp_sn: emp.EMP_SN,
			emp_nm: emp.EMP_NM,
			rgst_no: emp.RGST_NO,
			last_acdmcr: emp.LAST_ACDMCR,
			emp_t: "기타",
			career: "-",
		};

		let dev = await getRepository(EmpDvlpr).findOne(opt);
		if (dev) {
			t[idx].emp_t = "개발자";
			t[idx].career = String(dev.CAREER);
		} else {
			let markter = await getRepository(EmpMarkt).findOne(opt);
			if (markter) t[idx].emp_t = "경영진";
			else {
				let manager = await getRepository(EmpMngmtManage).findOne(opt);
				if (manager) t[idx].emp_t = "마케팅";
				else {
					let researcher = await getRepository(EmpRsrchDvlp).findOne(opt);
					if (researcher) t[idx].emp_t = "연구개발";
				}
			}
		}

		if (idx == Obj[1] - 1 && t.length == Obj[1]) {
			setTimeout(() => {
				res.status(200).send(t);
			}, 300);
		}
	});
});

router.get("/:id", function(req, res) {
	getRepository(Emp)
		.findOne({ EMP_SN: parseInt(req.params.id) })
		.then(emp => {
			console.log(emp);
			let temp = {
				id: emp.LOGIN_ID,
				name: emp.EMP_NM,
				password: emp.PASSWD,
				last_acdmcr: emp.LAST_ACDMCR,
				rgst_no: emp.RGST_NO.substr(0, 6) + " - " + emp.RGST_NO[6] + "******",
			};
			return res.status(200).send(temp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.patch("/:id", function(req, res) {
	getRepository(Emp)
		.findOne({ EMP_SN: parseInt(req.params.id) })
		.then(emp => {
			console.log(emp);
			return res.sendStatus(501);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

export { router as usersRouter };
