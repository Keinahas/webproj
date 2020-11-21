import * as dotenv from "dotenv";
dotenv.config();

export default {
	type: "mysql",
	host: "localhost",
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	port: 3306,
	database: process.env.TYPEORM_DATABASE,
	// synchronize: true,
	logging: Boolean(process.env.TYPEORM_LOGGING) || false,
	entities: ["src/entity/*.ts"],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/subscriber/**/*.ts"],
	cli: {
		entitiesDir: "src/entity",
		migrationsDir: "src/migration",
		subscribersDir: "src/subscriber",
	},
};
