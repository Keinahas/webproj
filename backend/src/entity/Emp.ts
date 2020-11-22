import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { CrkEval, Eval, PMEval } from "./Eval";
import { ProjParticipant } from "./ProjParticipant";
import { Tch } from "./Tch";

@Entity({ name: "EMP" })
export class Emp {
	@PrimaryGeneratedColumn()
	EMP_SN: number;

	@Column({ length: 20 })
	EMP_NM: string;

	@Column({ length: 20 })
	LOGIN_ID: string;

	@Column({ length: 20 })
	PASSWD: string;

	@Column({ length: 20 })
	LAST_ACDMCR: string;

	@Column({ length: 13 })
	RGST_NO: string;

	@OneToMany(
		() => ProjParticipant,
		participant => participant.EMP_SN,
	)
	participants: ProjParticipant[];

	@OneToMany(
		() => Eval,
		__eval => __eval.ASSESSEE_NO,
	)
	evals: Eval[];

	@OneToMany(
		() => PMEval,
		__eval => __eval.EVAL_MAN_NO,
	)
	pmEvals: PMEval[];

	@OneToMany(
		() => CrkEval,
		__eval => __eval.EVAL_MAN_NO,
	)
	crkEvals: CrkEval[];

	@ManyToMany(() => Tch)
	@JoinTable({
		name: "EXP_TCH", // table name for the junction table of this relation
		joinColumn: {
			name: "EMP_SN",
			referencedColumnName: "EMP_SN",
		},
		inverseJoinColumn: {
			name: "EXP_TCH_NO",
			referencedColumnName: "TCH_SN",
		},
	})
	tchs: Tch[];
}

@Entity({ name: "EMP_DVLPR" })
export class EmpDvlpr {
	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EMP_SN", referencedColumnName: "EMP_SN" })
	EMP_SN: number;

	@Column()
	CAREER: number;
}

@Entity({ name: "EMP_MARKT" })
export class EmpMarkt {
	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EMP_SN", referencedColumnName: "EMP_SN" })
	EMP_SN: number;
}

@Entity({ name: "EMP_MNGMT_MANAGE" })
export class EmpMngmtManage {
	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EMP_SN", referencedColumnName: "EMP_SN" })
	EMP_SN: number;
}

@Entity({ name: "EMP_RSRCH_DVLP" })
export class EmpRsrchDvlp {
	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EMP_SN", referencedColumnName: "EMP_SN" })
	EMP_SN: number;
}
