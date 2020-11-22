import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Emp } from "./Emp";
import { Proj } from "./Proj";

@Entity({ name: "PROJ_PARTICIPANT" })
export class ProjParticipant {
	@PrimaryGeneratedColumn({ type: "int" })
	@ManyToOne(
		() => Proj,
		emp => emp.PROJ_SN,
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

	@Column()
	EXC_DATE: Date;

	@Column({ nullable: false, length: 20 })
	PROJ_DTY: string;
}
