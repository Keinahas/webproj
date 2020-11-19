module.exports = {
	name: "EMP",
	tableName: "EMP",
	columns: {
		// Employee Serial Number
		EMP_SN: {
			primary: true,
			type: "number",
			generated: "increment",
			// strategy: "increment",
			nullable: false,
			// https://github.com/typeorm/typeorm/issues/1542
		},
		// Employee Name
		EMP_NM: {
			type: "varchar",
			length: 20,
			nullable: false,
		},
		LOGIN_ID: {
			type: "varchar",
			length: 20,
			unique: true,
			nullable: false,
		},
		PASSWD: {
			type: "varchar",
			length: 20,
			nullable: false,
		},
		LAST_ACDMCR: {
			type: "varchar",
			length: 20,
			nullable: false,
		},
		RGST_NO: {
			type: "varchar",
			length: 13,
			unique: true,
			nullable: false,
		},
	},
};
