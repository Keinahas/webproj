import * as express from "express";
const router = express.Router();
import { getRepository } from "typeorm";
import { Emp } from "../entity/Emp";
import * as authModule from "../modules/auth";

router.post("/", async function(req, res) {
	console.log(req.body);
	let empInfo = {
		LOGIN_ID: req.body.id,
		PASSWD: req.body.password,
		EMP_NM: req.body.name,
		LAST_ACDMCR: req.body.last_acdmcr,
		RGST_NO: req.body.rgst_no,
	};

	getRepository(Emp)
		.save(empInfo)
		.then(emp => {
			console.log(emp);
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
						.status(201)
						.json({ id: emp.LOGIN_ID, sn: emp.EMP_SN, name: emp.EMP_NM });
				})
				.catch(err => {
					console.log(err);
					return res.sendStatus(400);
				});
		})
		.catch(err => {
			return res.sendStatus(400);
		});
});

export { router as registerRouter };
