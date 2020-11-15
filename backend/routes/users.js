var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
	var empRepository = global.connection.getRepository("EMP_DVLPR");
	empRepository
		.find()
		.then(function(result) {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		});
	res.send("respond with a resource");
});

module.exports = router;
