module.exports = {
	name: "TCH",
	tableName: "TCH",
	columns: {
		// Project Serial Number
		TCH_SN: {
			type: "number",
			nullable: false,
			primary: true,
			generated: true,
		},
		// Technology Name
		TCH_NM: {
			type: "varchar2",
			length: 20,
			nullable: false,
		},
	},
};
