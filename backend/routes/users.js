var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
	var empRepository = global.connection.getRepository("EMP_DVLPR");
	empRepository
		.find({ EMP_SN: 2 })
		.then(dvlpr => {
			console.log(dvlpr);
			dvlpr.methods.test();
		})
		.catch(err => {
			console.log(err);
		});
	res.send("respond with a resource");
});

module.exports = router;
