import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Emp } from "./Emp";
import { Proj } from "./Proj";

@Entity({ name: "PROJ_PARTICIPANT" })
export class ProjParticipant {
	@PrimaryColumn({ type: "int" })
	@ManyToOne(
		() => Proj,
		proj => proj.PROJ_SN,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: number;

	@PrimaryColumn({ type: "int" })
	@ManyToOne(
		() => Emp,
		emp => emp.EMP_SN,
	)
	@JoinColumn({ name: "EMP_SN", referencedColumnName: "EMP_SN" })
	EMP_SN: number;

	@Column({ nullable: false })
	OUTSET_DATE: Date;

	@Column({ nullable: true })
	EXC_DATE: Date;

	@Column({ nullable: false, length: 20 })
	PROJ_DTY: string;
}
