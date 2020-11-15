module.exports = {
	name: "PROJ",
	tableName: "PROJ",
	columns: {
		// Project Serial Number
		PROJ_SN: {
			type: "number",
			nullable: false,
			primary: true,
			generated: true,
		},
		// Evaluation Serial Number
		PROJ_NM: {
			type: "varchar2",
			length: 50,
			nullable: false,
		},
		OUTSET_DATE: {
			type: "date",
			nullable: false,
		},
		END_DATE: {
			type: "date",
			nullable: true,
		},
		ORNT_SN: {
			type: "number",
			nullable: false,
		},
	},
};
