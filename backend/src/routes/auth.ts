import * as express from "express";
const router = express.Router();
import { createQueryBuilder, getRepository } from "typeorm";
import { Emp, EmpDvlpr, EmpMngmtManage } from "../entity/Emp";
import * as authModule from "../modules/auth";

router.post("/dupIDChk", function(req, res) {
	getRepository(Emp)
		.findOne({ LOGIN_ID: req.body.id })
		.then(emp => {
			if (emp === undefined) {
				return res.sendStatus(204); // No Content
			} else {
				return res.sendStatus(200); // Has emp
			}
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.post("/", async function(req, res) {
	let emp = await getRepository(Emp).findOne({ LOGIN_ID: req.body.id });
	let manager = await getRepository(EmpMngmtManage).findOne({ EMP_SN: emp.EMP_SN });
	let dev = await getRepository(EmpDvlpr).findOne({ EMP_SN: emp.EMP_SN });

	let role = "Member";
	if (manager) {
		role = "Manager";
	} else if (dev) {
		role = "Developer";
	}

	authModule
		.createToken({
			id: emp.LOGIN_ID,
			sn: emp.EMP_SN,
			name: emp.EMP_NM,
		})
		.then(token => {
			return res
				.cookie("token", token, {
					maxAge: 7200000,
					httpOnly: true,
				})
				.status(200)
				.json({
					id: emp.LOGIN_ID,
					sn: emp.EMP_SN,
					name: emp.EMP_NM,
					role: role,
				});
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

router.post("/refresh", function(req, res) {
	authModule
		.decodeToken(req.cookies.token)
		.then(decoded => {
			if (decoded) {
				authModule
					.createToken({
						id: decoded.id,
						sn: decoded.sn,
						name: decoded.name,
					})
					.then(token => {
						res
							.cookie("token", token, {
								maxAge: 7200000,
								httpOnly: true,
							})
							.status(200)
							.json({ id: decoded.id, sn: decoded.sn, name: decoded.name });
					})
					.catch(err => {
						console.log(err);
						res.sendStatus(400);
					});
			} else {
				throw Error("token not valid");
			}
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(400);
		});
});

router.post("/logout", function(req, res) {
	res.clearCookie("token").sendStatus(200);
});

export { router as authRouter };
