import * as express from "express";
const router = express.Router();
import * as authModule from "../modules/auth";
import { getRepository } from "typeorm";
import { Emp } from "../entity/Emp";

router.post("/", async function(req, res) {
	getRepository(Emp)
		.findOne({ LOGIN_ID: req.body.id })
		.then(emp => {
			console.log(emp);
			return res.status(500).send(emp);
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(500);
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
