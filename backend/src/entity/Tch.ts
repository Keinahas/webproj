import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emp } from "./Emp";

@Entity({ name: "TCH" })
export class Tch {
	@PrimaryGeneratedColumn({ name: "TCH_SN" })
	TCH_SN: number;

	@Column({ length: 20, nullable: false, name: "TCH_NM" })
	TCH_NM: string;
}
