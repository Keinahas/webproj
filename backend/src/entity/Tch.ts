import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emp } from "./Emp";

@Entity({ name: "TCH" })
export class Tch {
	@PrimaryGeneratedColumn({ name: "TCH_SN" })
	TCH_SN: number;

	@Column({ length: 20, nullable: false, name: "TCH_NM" })
	TCH_NM: string;

	@ManyToMany(() => Emp)
	@JoinTable({
		name: "EXP_TCH", // table name for the junction table of this relation
		joinColumn: {
			name: "EXP_TCH_NO",
			referencedColumnName: "TCH_SN",
		},
		inverseJoinColumn: {
			name: "EMP_SN",
			referencedColumnName: "EMP_SN",
		},
	})
	emps: Emp[];
}
