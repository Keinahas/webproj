const express = require("express");
const router = express.Router();
const authModule = require("../modules/auth");
// const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
	let empRepository = global.connection.getRepository("EMP");
	empRepository
		.find({ LOGIN_ID: req.body.id })
		.then(__emp => {
			if (!__emp) return res.sendStatus(404);
			let emp = __emp[0];
			if (req.body.password == emp.PASSWD) {
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
							.json({ id: emp.LOGIN_ID, sn: emp.EMP_SN, name: emp.EMP_NM, role: "employee" });
					})
					.catch(err => {
						console.log(err);
						return res.sendStatus(400);
					});
			}
			// bcrypt
			// 	.compare(req.body.password, emp.PASSWD)
			// 	.then(isMatched => {
			// 		if (isMatched) {
			// 			authModule
			// 				.createToken({
			// 					id: emp.LOGIN_ID,
			// 					sn: emp.EMP_SN,
			// 					name: emp.EMP_NM,
			// 				})
			// 				.then(token => {
			// 					return res
			// 						.cookie("token", token, {
			// 							maxAge: 7200000,
			// 							httpOnly: true,
			// 						})
			// 						.status(200)
			// 						.json({ id: emp.LOGIN_ID, sn: emp.EMP_SN, name: emp.EMP_NM });
			// 				})
			// 				.catch(err => {
			// 					console.log(err);
			// 					return res.sendStatus(400); // id error
			// 				});
			// 		} else {
			// 			return res.sendStatus(403); // password error
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log("DEBUG", new Error().stack.split("at ")[1].trim());
			// 		console.log(err);
			// 		return res.sendStatus(500); // bcrypt error
			// 	});
		})
		.catch(err => {
			console.log("DEBUG", new Error().stack.split("at ")[1].trim());
			console.log(err);
			res.sendStatus(500); // emp repo error
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

module.exports = router;
