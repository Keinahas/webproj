const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;
const dotenv = require("dotenv");
dotenv.config();
class DBConn {
	constructor() {
		typeorm
			.createConnection({
				type: "oracle",
				host: "localhost",
				port: 1521,
				sid: "xe",
				username: process.env.TYPEORM_USERNAME,
				password: process.env.TYPEORM_PASSWORD,
				logging: Boolean(process.env.TYPEORM_LOGGING) || false,
				entities: [
					new EntitySchema(require("../entity/Emp")),
					new EntitySchema(require("../entity/emp_dvlpr")),
					new EntitySchema(require("../entity/emp_markt")),
					new EntitySchema(require("../entity/emp_mngmt_manage")),
					new EntitySchema(require("../entity/emp_rsrch_dvlp")),
					new EntitySchema(require("../entity/crk_eval")),
					new EntitySchema(require("../entity/eval")),
					new EntitySchema(require("../entity/exp_tch")),
					new EntitySchema(require("../entity/ornt_eval")),
					new EntitySchema(require("../entity/ornt")),
					new EntitySchema(require("../entity/pm_eval")),
					new EntitySchema(require("../entity/proj_participant")),
					new EntitySchema(require("../entity/proj")),
					new EntitySchema(require("../entity/tch")),
				],
			})
			.then(connection => {
				console.log("success");
				global.connection = connection;
			})
			.catch(err => {
				console.log(err);
				global.connection = null;
			});
	}
}

module.exports = new DBConn();
