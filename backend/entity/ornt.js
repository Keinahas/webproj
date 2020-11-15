module.exports = {
	name: "ORNT",
	tableName: "ORNT",
	columns: {
		// Employee Serial Number
		ORNT_SN: {
			type: "number",
			nullable: false,
			primary: true,
			generated: true,
		},
		// Experienced Technology Number
		ORNT_NM: {
			type: "varchar2",
			length: 20,
			nullable: false,
		},
	},
};
