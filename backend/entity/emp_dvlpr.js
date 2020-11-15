module.exports = {
	name: "EMP_DVLPR",
	tableName: "EMP_DVLPR",
	columns: {
		// Employee Serial Number
		EMP_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		CAREER: {
			type: "number",
			nullable: false,
		},
	},
};
