module.exports = {
	name: "CRK_EVAL",
	tableName: "CRK_EVAL",
	columns: {
		// Project Serial Number
		PROJ_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		// Project Serial Number
		CRK_EVAL_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		EVAL_MAN_NO: {
			type: "number",
			nullable: false,
		},
	},
	relations: {
		categories: {
			target: "EVAL",
			type: "one-to-one",
			joinTable: true,
			cascade: true,
		},
	},
};
