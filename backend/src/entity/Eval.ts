import {
	Column,
	OneToOne,
	JoinColumn,
	ManyToOne,
	Entity,
	PrimaryColumn,
	Index,
	OneToMany,
} from "typeorm";
import { Emp } from "./Emp";
import { Ornt } from "./Ornt";
import { Proj } from "./Proj";

@Entity({ name: "EVAL" })
export class Eval {
	@Column({ type: "int", nullable: false })
	@ManyToOne(
		() => Proj,
		proj => proj.PROJ_SN,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: Proj;

	@PrimaryColumn({ generated: "increment", type: "int" })
	EVAL_SN: number;

	@Column({ type: "int", nullable: false })
	@ManyToOne(() => Emp)
	@JoinColumn({ name: "ASSESSEE_NO", referencedColumnName: "EMP_SN" })
	ASSESSEE_NO: Emp;

	@Column({ nullable: false })
	JOB_EXC_GRD: number;

	@Column({ length: 200 })
	JOB_EXC_EVAL_CN: string;

	@Column({ nullable: false })
	COMM_ABLTY_GRD: number;

	@Column({ length: 200 })
	COMM_ABLTY_EVAL_CN: string;

	@OneToMany(
		() => OrntEval,
		__eval => __eval.PROJ_SN,
	)
	orntEvals: OrntEval[];

	@OneToMany(
		() => CrkEval,
		__eval => __eval.PROJ_SN,
	)
	crkEvals: CrkEval[];

	@OneToMany(
		() => PMEval,
		__eval => __eval.PROJ_SN,
	)
	pmEvals: PMEval[];
}

@Entity({ name: "ORNT_EVAL" })
export class OrntEval {
	@PrimaryColumn({ type: "int" })
	@ManyToOne(
		() => Eval,
		__eval => __eval.orntEvals,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: number;

	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Eval)
	@JoinColumn({ name: "EVAL_SN", referencedColumnName: "EVAL_SN" })
	EVAL_SN: number;

	@Column({ type: "int", nullable: false })
	@ManyToOne(() => Ornt)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "ORNT_SN" })
	EVAL_MAN_NO: Ornt;
}

@Entity({ name: "PM_EVAL" })
export class PMEval {
	@PrimaryColumn({ type: "int" })
	@ManyToOne(
		() => Eval,
		__eval => __eval.orntEvals,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: number;

	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Eval)
	@JoinColumn({ name: "EVAL_SN", referencedColumnName: "EVAL_SN" })
	EVAL_SN: number;

	@Column({ type: "int", nullable: false })
	@ManyToOne(() => Emp)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "EMP_SN" })
	EVAL_MAN_NO: Emp;
}

@Entity({ name: "CRK_EVAL" })
export class CrkEval {
	@PrimaryColumn({ type: "int" })
	@ManyToOne(
		() => Eval,
		__eval => __eval.orntEvals,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: number;

	@PrimaryColumn({ type: "int" })
	@OneToOne(() => Eval)
	@JoinColumn({ name: "EVAL_SN", referencedColumnName: "EVAL_SN" })
	EVAL_SN: number;

	@Column({ type: "int", nullable: false })
	@ManyToOne(() => Emp)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "EMP_SN" })
	EVAL_MAN_NO: Emp;
}
