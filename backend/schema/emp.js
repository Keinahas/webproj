const typeorm = require("typeorm");
const bcrypt = require("bcrypt");

const empSchema = new typeorm.EntitySchema({
	name: "EMP",
	tableName: "EMP",
	columns: {
		// Employee Serial Number
		EMP_SN: {
			type: "number",
			primary: true,
			generated: true,
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
});

// Before Calling "save"
// empSchema.pre("save", function(next) {
// 	bcrypt
// 		.genSalt()
// 		.then(salt => {
// 			bcrypt.hash(this.password, salt, (err, hashed) => {
// 				if (err) next(err);
// 				this.password = hashed;
// 				next();
// 			});
// 		})
// 		.catch(err => {
// 			next(err);
// 		});
// });

// comparePassword Method
empSchema.methods.comparePassword = function(plaintext, next) {
	bcrypt
		.compare(plaintext, this.password)
		.then(isMatched => {
			next(null, isMatched);
		})
		.catch(err => next(err));
};

// Method Test
empSchema.methods.test = function() {
	console.log("test Called");
};
