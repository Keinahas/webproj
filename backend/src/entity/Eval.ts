import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Entity } from "typeorm";
import { Emp } from "./Emp";
import { Ornt } from "./Ornt";
import { Proj } from "./Proj";

@Entity({ name: "EVAL" })
export abstract class Eval {
	@Column({ type: "int", nullable: false })
	@ManyToOne(
		() => Proj,
		proj => proj.PROJ_SN,
	)
	@JoinColumn({ name: "PROJ_SN", referencedColumnName: "PROJ_SN" })
	PROJ_SN: Proj;

	@PrimaryGeneratedColumn("increment")
	EVAL_SN: number;

	@Column({ type: "int", nullable: false })
	@OneToOne(() => Emp)
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
}

@Entity({ name: "ORNT_EVAL" })
export class OrntEval extends Eval {
	@Column({ type: "int", nullable: false })
	@OneToOne(() => Ornt)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "ORNT_SN" })
	EVAL_MAN_NO: Ornt;
}

@Entity({ name: "PM_EVAL" })
export class PMEval extends Eval {
	@Column({ type: "int", nullable: false })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "EMP_SN" })
	EVAL_MAN_NO: Emp;
}

@Entity({ name: "CRK_EVAL" })
export class CrkEval extends Eval {
	@Column({ type: "int", nullable: false })
	@OneToOne(() => Emp)
	@JoinColumn({ name: "EVAL_MAN_NO", referencedColumnName: "EMP_SN" })
	EVAL_MAN_NO: Emp;
}
