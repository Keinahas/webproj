<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">동료평가 페이지</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-toolbar flat>
					<v-toolbar-title> 동료평가 페이지</v-toolbar-title>
				</v-toolbar>
				<v-data-table :headers="headers" :items="participants" hide-default-footer>
					<template v-slot:item.Eval="{ item }">
						<v-btn v-if="!item.evaled" color="gray darken-1" dark class="mb-2" @click="onEval(item)"
							>평가하기</v-btn
						>
						<v-btn v-else color="gray darken-1" dark class="mb-2" @click="onEval(item)"
							>수정하기</v-btn
						>
					</template>
				</v-data-table>
				<v-row>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
					<v-form ref="evalForm">
						<v-dialog v-model="dialog" persistent max-width="600px">
							<v-card>
								<v-card-title>
									<span class="headline">평가</span>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6">
												<v-select
													:items="['1', '2', '3', '4', '5']"
													label="업무수행 평점"
													required
													v-model="newEvalModel.JOB_EXC_GRD"
												></v-select>
											</v-col>
											<v-col cols="12">
												<v-text-field
													v-model="newEvalModel.JOB_EXC_EVAL_CN"
													label="업무수행 평가내용"
													required
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6">
												<v-select
													:items="['1', '2', '3', '4', '5']"
													label="커뮤니케이션 평점"
													required
													v-model="newEvalModel.COMM_ABLTY_GRD"
												></v-select>
											</v-col>
											<v-col cols="12">
												<v-text-field
													v-model="newEvalModel.COMM_ABLTY_EVAL_CN"
													label="커뮤니케이션 평가내용"
													required
												></v-text-field>
											</v-col>
										</v-row>
									</v-container>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
									<v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-form>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	mounted() {
		this.getParticipants();
	},
	computed: {
		chkEvaled(item) {
			return item.evaled;
		},
	},
	data: () => ({
		editFlag: false,
		selectedParticipant: {
			EMP_SN: "",
			EMP_NM: "",
			PROJ_DTY: "",
			PERIOD: "",
			CAREER: 0,
			evaled: false,
		},
		newEvalModel: {
			PROJ_SN: "",
			JOB_EXC_GRD: 5,
			JOB_EXC_EVAL_CN: "",
			COMM_ABLTY_GRD: 5,
			COMM_ABLTY_EVAL_CN: "",
			ASSESSEE_NO: "",
		},

		headers: [
			{ text: "직원번호", value: "EMP_SN" },
			{ text: "직원이름", value: "EMP_NM" },
			{ text: "직무", value: "PROJ_DTY" },
			{ text: "투입기간", value: "PERIOD" },
			{ text: "경력", value: "CAREER" },
			{ text: "평가", value: "Eval", sortable: false },
		],
		participants: [
			{
				EMP_SN: "2",
				EMP_NM: "김투니",
				PROJ_DTY: "PM",
				PERIOD: "2019-09-09~",
				CAREER: 4,
				evaled: false,
			},
			{
				EMP_SN: "6",
				EMP_NM: "이투니",
				PROJ_DTY: "PL",
				PERIOD: "2019-10-09~",
				CAREER: 4,
				evaled: false,
			},
			{
				EMP_SN: "7",
				EMP_NM: "박투니",
				PROJ_DTY: "프로그래머",
				PERIOD: "2019-10-09~",
				CAREER: 6,
				evaled: false,
			},
			{
				EMP_SN: "15",
				EMP_NM: "정투니",
				PROJ_DTY: "또뭐있더라",
				PERIOD: "2019-09-09~2019-19-09",
				CAREER: 3,
				evaled: false,
			},
			{
				EMP_SN: "20",
				EMP_NM: "대충이름",
				PROJ_DTY: "모르겠다",
				PERIOD: "2019-09-09~",
				CAREER: 3,
				evaled: false,
			},
			{
				EMP_SN: "55",
				EMP_NM: "나도대충",
				PROJ_DTY: "일단써",
				PERIOD: "2019-09-09~",
				CAREER: 1,
				evaled: false,
			},
		],
		dialog: false,
	}),
	methods: {
		onEval(participant) {
			this.selectedParticipant = participant;
			if (this.selectedParticipant.evaled) {
				this.editFlag = true;

				// get eval
				this.$axios
					.get(`/api/eval/${this.selectedParticipant.EVAL_SN}`)
					.then(__eval => {
						this.newEvalModel = __eval;
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.editFlag = false;
				this.newEvalModel = {
					PROJ_SN: this.$store.state.projSN,
					JOB_EXC_GRD: 5,
					JOB_EXC_EVAL_CN: "",
					COMM_ABLTY_GRD: 5,
					COMM_ABLTY_EVAL_CN: "",
					ASSESSEE_NO: this.$store.state.sn,
				};
			}
			this.dialog = true;
		},
		onClose() {
			this.dialog = false;
		},
		onSave() {
			if (this.editFlag) {
				// just save
				this.$axios.patch(`/api/eval/${this.selectedParticipant.EVAL_SN}`).catch(err => {
					console.log(err);
				});
			} else {
				let CRKEvalModel = this.newEvalModel;
				CRKEvalModel.EVAL_MAN_NO = this.selectedParticipant.EMP_SN;

				// create
				this.$axios.post(`/api/eval/`, CRKEvalModel).catch(err => {
					console.log(err);
				});
				this.participants.forEach(participant => {
					if (participant.EMP_SN == this.selectedParticipant.EMP_SN) participant.evaled = true;
				});
			}
			this.dialog = false;
		},
		getParticipants() {
			this.$axios
				.get("/api/participants")
				.then(emps => {
					this.participants = emps;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<style></style>
