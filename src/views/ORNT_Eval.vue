<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">고객평가 페이지</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-toolbar flat>
					<v-toolbar-title> 프로젝트명 평가페이지</v-toolbar-title>
				</v-toolbar>
				<v-data-table :headers="headers" :items="project" hide-default-footer>
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
													v-model="newEvalModel.JOB_EXC_GRD"
													:items="['1', '2', '3', '4', '5']"
													label="업무수행 평점"
													required
												></v-select>
											</v-col>
											<v-col cols="12">
												<v-text-field
													v-model="newEvalModel.JOB_EXC_EVAL_CN"
													label="업무수행 평가내용"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6">
												<v-select
													v-model="newEvalModel.COMM_ABLTY_GRD"
													:items="['1', '2', '3', '4', '5']"
													label="커뮤니케이션 평점"
													required
												></v-select>
											</v-col>
											<v-col cols="12">
												<v-text-field
													v-model="newEvalModel.COMM_ABLTY_EVAL_CN"
													label="커뮤니케이션 평가내용"
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
	name: "ORNT_EVAL",
	computed: {
		chkEvaled(item) {
			return item.evaled;
		},
	},
	data: () => ({
		editFlag: false,
		headers: [
			{ text: "프로젝트 번호", value: "PROJ_SN", sortable: false },
			{ text: "프로젝트명", value: "PROJ_NM", sortable: false },
			{ text: "평가", value: "Eval", sortable: false },
		],
		project: [
			{
				PROJ_SN: 1,
				PROJ_NM: "프로젝트",
				evaled: false,
			},
		],
		selectedProject: {
			PROJ_SN: "",
			PROJ_NM: "",
			evaled: false,
		},
		newEvalModel: [
			{
				PROJ_SN: "",
				JOB_EXC_GRD: 5,
				JOB_EXC_EVAL_CN: "",
				COMM_ABLTY_GRD: 5,
				COMM_ABLTY_EVAL_CN: "",
				ASSESSEE_NO: "",
			},
		],
		dialog: false,
	}),
	methods: {
		onEval(project) {
			this.selectedProject = project;
			if (this.selectedProject.evaled) {
				this.editFlag = true;
				// get eval
				this.$axios
					.get(`/api/eval/${this.selectedProject.EVAL_SN}`)
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
					//ASSESSEE_NO: this.$store.state.sn,
				};
			}
			this.dialog = true;
		},
		onClose() {
			this.dialog = false;
		},
		watch: {
			dialog(val) {
				val || this.close();
			},
		},
		onSave() {
			if (this.editFlag) {
				// just save
				this.$axios.patch(`/api/eval/${this.selectedProject.EVAL_SN}`).catch(err => {
					console.log(err);
				});
			} else {
				let ORNTEvalModel = this.newEvalModel;
				ORNTEvalModel.EVAL_MAN_NO = this.selectedProject.PROJ_SN;

				// create
				this.$axios.post(`/api/eval/`, ORNTEvalModel).catch(err => {
					console.log(err);
				});
				this.project.forEach(Project => {
					if (Project.PROJ_SN == this.selectedProject.PROJ_SN) Project.evaled = true;
				});
			}
			this.dialog = false;
		},
		getProject() {
			this.$axios
				.get("/api/Project")
				.then(proj => {
					this.project = proj;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>
<style></style>
