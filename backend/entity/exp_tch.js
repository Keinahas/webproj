module.exports = {
	name: "EXP_TCH",
	tableName: "EXP_TCH",
	columns: {
		// Employee Serial Number
		EMP_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		// Experienced Technology Number
		EXP_TCH_NO: {
			type: "number",
			nullable: false,
			primary: true,
		},
	},
};
