import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp, EmpDvlpr, EmpMarkt, EmpMngmtManage } from "../entity/Emp";

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
			career: "0",
		};
		let dev = await getRepository(EmpDvlpr).findOne(opt);
		let manager = await getRepository(EmpMngmtManage).findOne(opt);
		if (!dev && !manager) {
			// not emp_dvlpr and manager
			t[idx].career = "-";
		} else {
			t[idx].emp_t = "개발자";
			t[idx].career = String(dev.CAREER);
		}
		if (idx == Obj[1] - 1 && t.length == Obj[1]) {
			setTimeout(() => {
				res.status(200).send(t);
			}, 300);
		}
	});

	// getRepository(Emp)
	// 	.findAndCount()
	// 	.then(Object => {
	// 		let t = [];
	// 		Object[0].forEach((emp, idx) => {
	// 			let opt = { EMP_SN: emp.EMP_SN };
	// 			t[idx] = {
	// 				emp_sn: emp.EMP_SN,
	// 				emp_nm: emp.EMP_NM,
	// 				rgst_no: emp.RGST_NO,
	// 				last_acdmcr: emp.LAST_ACDMCR,
	// 				emp_t: "기타",
	// 				career: "0",
	// 				// 	emp_t: "개발자",
	// 				// career: "5",
	// 				// tch_sn: "아",
	// 			};
	// 			getRepository(EmpDvlpr)
	// 				.findOne(opt)
	// 				.then(dev => {
	// 					if (!dev) {
	// 						t[idx].career = "-";
	// 						// getRepository(EmpMarkt).findOne(opt).then((markt) => {
	// 						// 	if (!markt) {
	// 						// 		getRepository(EmpMngmtManage).findOne(opt).then((manage) => {
	// 						// 			if (!manage) {
	// 						// 				getRepository(EmpRsrchDvlp).findOne(opt).then((rsrch) => {
	// 						// 					if (!rsrch) {
	// 						// 						t[idx].
	// 						// 					} else {

	// 						// 					}
	// 						// 				}).catch((err) => {

	// 						// 				});

	// 						// 			} else {

	// 						// 			}
	// 						// 		}).catch((err) => {

	// 						// 		});
	// 						// 	} else {

	// 						// 	}
	// 						// }).catch((err) => {

	// 						// });
	// 					} else {
	// 						t[idx].emp_t = "개발자";
	// 						t[idx].career = String(dev.CAREER);
	// 					}
	// 				})
	// 				.catch(err => {
	// 					console.log(err);
	// 				});
	// 		});
	// 		res.status(200).send(t);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	// createQueryBuilder(Emp)
	// 	.innerJoin(EmpDvlpr, "Dvlpr", "Dvlpr.EMP_SN = Emp.EMP_SN")
	// 	.getMany()
	// 	.then(Devs => {
	// 		console.log(Devs);
	// 		let t = [];
	// 		Devs.forEach((dev, idx) => {
	// 			t[idx] = {
	// 				emp_sn: dev.EMP_SN,
	// 				emp_nm: dev.EMP_NM,
	// 				rgst_no: dev.RGST_NO,
	// 				last_acdmcr: dev.LAST_ACDMCR,
	// 			};
	// 		});
	// 		return res.status(200).send(t);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
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
