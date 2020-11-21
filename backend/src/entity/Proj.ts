import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Emp } from "./Emp";
import { Eval } from "./Eval";
import { Ornt } from "./Ornt";
import { ProjParticipant } from "./ProjParticipant";

@Entity({ name: "PROJ" })
export class Proj {
	@PrimaryGeneratedColumn()
	PROJ_SN: number;

	@Column({ length: 50, nullable: false })
	PROJ_NM: string;

	@Column({ nullable: false })
	OUTSET_DATE: Date;

	@Column()
	END_DATE: Date;

	@OneToMany(
		() => Eval,
		__eval => __eval.PROJ_SN,
	)
	evals: Eval[];

	@OneToMany(
		() => ProjParticipant,
		participant => participant.PROJ_SN,
	)
	participants: ProjParticipant[];

	@Column({ type: "int", nullable: false })
	@ManyToOne(
		() => Ornt,
		ornt => ornt.ORNT_SN,
	)
	@JoinColumn({ name: "ORNT_SN", referencedColumnName: "ORNT_SN" })
	ORNT_SN: Ornt;

	@ManyToMany(() => Emp)
	@JoinTable({
		name: "PROJ_PARTICIPANT", // table name for the junction table of this relation
		joinColumn: {
			name: "PROJ_SN",
			referencedColumnName: "PROJ_SN",
		},
		inverseJoinColumn: {
			name: "EMP_SN",
			referencedColumnName: "EMP_SN",
		},
	})
	emps: Emp[];
}
