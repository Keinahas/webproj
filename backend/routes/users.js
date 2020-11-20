var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/:id", function(req, res) {
	var empRepository = global.connection.getRepository("EMP");
	empRepository
		.find({ EMP_SN: req.params.id })
		.then(__emp => {
			if (!__emp) return res.sendStatus(404);
			let emp = __emp[0];
			res.status(200).json({
				id: emp.LOGIN_ID,
				name: emp.EMP_NM,
				last_acdmcr: emp.LAST_ACDMCR,
				rgst_no: emp.RGST_NO.substr(0, 6) + " - " + emp.RGST_NO[6] + "******",
			});
		})
		.catch(err => {
			console.log(err);
			return res.sendStatus(400);
		});
});

// router.patch("/:id", function(req, res) {
// 	var empRepository = global.connection.getRepository("EMP");
// 	empRepository
// 		.update(User)
// 		.set(req.body)
// 		.where("EMP_SN = :id", { id: req.params.id })
// 		.execute()
// 		.then(emp => {
// 			console.log(emp);
// 			res.sendStatus(200);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			return res.sendStatus(400);
// 		});
// });

module.exports = router;
