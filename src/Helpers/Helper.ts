import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config";

const Helper = {
	generateToken(id: string): string {
		return jwt.sign({ id }, config.SECRET, {
			expiresIn: "1d",
		});
	},
	hashPassword(password: string): string {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	},
	comparePassword(password: string, hashPassword: string): boolean {
		return bcrypt.compareSync(password, hashPassword);
	},
};

export default Helper;