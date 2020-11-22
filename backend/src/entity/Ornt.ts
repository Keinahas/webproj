import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proj } from "./Proj";

@Entity({ name: "ORNT" })
export class Ornt {
	@PrimaryGeneratedColumn({ type: "int" })
	ORNT_SN: number;

	@Column({ length: 20, nullable: false })
	ORNT_NM: string;

	@OneToMany(
		() => Proj,
		proj => proj.ORNT_SN,
	)
	projs: Proj[];
}
