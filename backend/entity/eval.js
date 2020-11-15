module.exports = {
	name: "EVAL",
	tableName: "EVAL",
	columns: {
		// Project Serial Number
		PROJ_SN: {
			type: "number",
			primary: true,
			nullable: false,
		},
		// Evaluation Serial Number
		EVAL_SN: {
			type: "number",
			nullable: false,
			primary: true,
			generated: true,
		},
		ASSESSEE_NO: {
			type: "number",
			nullable: false,
		},
		JOB_EXC_GRD: {
			type: "number",
			nullable: false,
		},
		JOB_EXC_EVAL_CN: {
			type: "varchar2",
			length: 200,
			nullable: true,
		},
		COMM_ABLTY_GRD: {
			type: "number",
			nullable: false,
		},
		COMM_ABLTY_EVAL_CN: {
			type: "varchar2",
			length: 200,
			nullable: true,
		},
	},
};
