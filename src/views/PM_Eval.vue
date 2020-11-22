<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">PM평가 페이지</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<v-col cols="12">
				<v-data-table :headers="headers" :items="pmeval" hide-default-footer>
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title> PM평가 페이지</v-toolbar-title>
							<template v-slot:item.eval>
								<v-btn color="gray darken-1" dark class="mb-2" @click="onEval(item)"
									>평가하기</v-btn
								>
							</template>
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
														></v-select>
													</v-col>
													<v-col cols="12">
														<v-text-field label="업무수행 평가내용" required></v-text-field>
													</v-col>
													<v-col cols="12" sm="6">
														<v-select
															:items="['1', '2', '3', '4', '5']"
															label="커뮤니케이션 평점"
															required
														></v-select>
													</v-col>
													<v-col cols="12">
														<v-text-field label="커뮤니케이션 평가내용" required></v-text-field>
													</v-col>
												</v-row>
											</v-container>
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
											<v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-form>
						</v-toolbar>
					</template>
					<template v-slot:item.eval>
						<v-btn color="gray darken-1" dark class="mb-2" @click="onEval(item)">평가하기</v-btn>
					</template>
				</v-data-table>
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<br />
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col id="News1" cols="3">
				<h3>소개</h3>
				<br />
				<h4>Database Design 소개</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>미디어</h3>
				<br />
				<h4>Database Design 보도 자료</h4>
				<h4>미디어 행사</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>채용</h3>
				<br />
				<h4>Database Design 채용 소개</h4>
				<h4>지원하기</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>투자정보</h3>
				<br />
				<h4>Database Design 추가 정보</h4>
				<h4>Database Design 재무 정보</h4>
				<h4>IR 자료</h4>
			</v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="2"></v-col>
			<v-col cols="3"
				><p class="font-weight-black">
					DATABASE DESIGN
				</p></v-col
			>
			<v-col cols="1"></v-col>
			<v-col cols="6"
				><p class="text--secondary">
					copyright @Database Design Crop. All Rights Reserved
				</p></v-col
			>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: "PM_EVAL",
	data: () => ({
		newEvalModel: {
			JOB_EXC_GRD: 5,
			JOB_EXC_EVAL_CN: "",
			COMM_ABLTY_GRD: 5,
			COMM_ABLTY_EVAL_CN: "",
		},

		headers: [
			{ text: "직원번호", value: "EMP_SN" },
			{ text: "직원이름", value: "EMP_NM" },
			{ text: "직무", value: "PROJ_DTY" },
			{ text: "투입기간", value: "OUTSET_PERIOD" },
			{ text: "경력", value: "CAREER" },
			{ text: "평가", value: "eval", sortable: false },
		],
		pmeval: [
			{
				EMP_SN: "2",
				EMP_NM: "김투니",
				PROJ_DTY: "PM",
				OUTSET_PERIOD: "2019-09-09~",
				CAREER: 4,
				Eval: false,
			},
			{
				EMP_SN: "6",
				EMP_NM: "이투니",
				PROJ_DTY: "PL",
				OUTSET_PERIOD: "2019-10-09~",
				CAREER: 4,
				Eval: false,
			},
			{
				EMP_SN: "7",
				EMP_NM: "박투니",
				PROJ_DTY: "프로그래머",
				OUTSET_PERIOD: "2019-10-09~",
				CAREER: 6,
				Eval: false,
			},
			{
				EMP_SN: "15",
				EMP_NM: "정투니",
				PROJ_DTY: "또뭐있더라",
				OUTSET_PERIOD: "2019-09-09~2019-19-09",
				CAREER: 3,
				Eval: false,
			},
			{
				EMP_SN: "20",
				EMP_NM: "대충이름",
				PROJ_DTY: "모르겠다",
				OUTSET_PERIOD: "2019-09-09~",
				CAREER: 3,
				Eval: false,
			},
			{
				EMP_SN: "55",
				EMP_NM: "나도대충",
				PROJ_DTY: "일단써",
				OUTSET_PERIOD: "2019-09-09~",
				CAREER: 1,
				Eval: false,
			},
		],
		dialog: false,
		editedIndex: -1,
		editedEval: {
			EMP_SN: "",
			EMP_NM: "",
			PROJ_DTY: "",
			OUTSET_PERIOD: "",
			CAREER: 0,
			Eval: false,
		},
	}),
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	methods: {
		onEval() {
			this.dialog = true;
		},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedEval = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.pmeval[this.editedIndex], this.editedEval);
			} else {
				this.pmeval.push(this.editedEval);
			}
			this.close();
		},
	},
};
</script>

<style></style>
