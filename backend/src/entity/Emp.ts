import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
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
