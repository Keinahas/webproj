import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const option = { expiresIn: "2h", issuer: "db_design-developer", subject: "userInfo" };

function createToken(payload): Promise<any> {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, SECRET_KEY, option, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
}

function decodeToken(token): Promise<any> {
	return new Promise((resolve, reject) => {
		if (token) {
			jwt.verify(token, SECRET_KEY, (err, decoded) => {
				if (err) reject(err);
				else resolve(decoded);
			});
		} else {
			reject(new Error("Not Signed In."));
		}
	});
}

export { createToken, decodeToken };
