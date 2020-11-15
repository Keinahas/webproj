module.exports = {
	name: "PROJ_PARTICIPANT",
	tableName: "PROJ_PARTICIPANT",
	columns: {
		// Project Serial Number
		PROJ_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		// Employee Serial Number
		EMP_SN: {
			type: "number",
			nullable: false,
			primary: true,
		},
		OUTSET_DATE: {
			type: "date",
			nullable: false,
		},
		EXC_DATE: {
			type: "date",
			nullable: true,
		},
		PROJ_DTY: {
			type: "varchar2",
			length: 20,
			nullable: false,
		},
	},
};
