<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">관리자 프로젝트 평가확인</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<br />
			<v-col cols="12">
				<v-data-table :headers="headers" :items="mngmt_eval">
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title>프로젝트</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer
							><!-- 여기 --><v-dialog v-model="dialog" max-width="900px">
								<v-card>
									<v-card-text>
										<v-container>
											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>평가결과</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-container>
										<v-list-item-content>
											<v-list-item-title>고객평가결과</v-list-item-title>
										</v-list-item-content>
										<!--아니.. 표로.. 해보겟어 ..!-->
										<v-simple-table dense>
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">질문</th>
														<th class="text-left">결과</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in client_eval" :key="item.c_question">
														<td>{{ item.c_question }}</td>
														<td>{{ item.c_answer }}</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
										<br />
										<v-list-item-content>
											<v-list-item-title>PM평가결과</v-list-item-title>
										</v-list-item-content>
										<v-simple-table dense>
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">질문</th>
														<th class="text-left">결과</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in pm_eval" :key="item.p_question">
														<td>{{ item.p_question }}</td>
														<td>{{ item.p_answer }}</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
										<br />
										<v-list-item-content>
											<v-list-item-title>동료평가결과</v-list-item-title>
										</v-list-item-content>
										<v-simple-table dense>
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">질문</th>
														<th class="text-left">결과</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in mem_eval" :key="item.m_question">
														<td>{{ item.m_question }}</td>
														<td>{{ item.m_answer }}</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
									</v-card-text>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.eval><v-btn @click="checkeval(item)">평가확인</v-btn></template>
				</v-data-table>
			</v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
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
			<v-col cols="3"><p class="font-weight-black">DATABASE DESIGN</p></v-col>
			<v-col cols="1"></v-col>
			<v-col cols="6"
				><p class="text--secondary">copyright @Database Design Crop. All Rights Reserved</p></v-col
			>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "mngmt_eval",
	data: () => ({
		editedItem: {
			PROJ_SN: 0,
			PROJ_NM: "",
			numofpeople: 0,
			OUTSET_DATE: "",
			END_DATE: "",
			ORNT_NM: "",
			pm_name: "",
		},

		mngmt_eval: [
			{
				PROJ_SN: 1111,
				PROJ_NM: "프로젝트명",
				numofpeople: 6,
				OUTSET_DATE: "프로젝트 착수일자",
				END_DATE: "프로젝트 종료일자",
				ORNT_NM: "발주처",
				pm_name: "담당자",
				EVAL: false,
			},
			{
				PROJ_SN: 2222,
				PROJ_NM: "프로젝트명1",
				numofpeople: 6,
				OUTSET_DATE: "프로젝트 착수일자1",
				END_DATE: "프로젝트 종료일자1",
				ORNT_NM: "발주처1",
				pm_name: "담당자1",
				EVAL: false,
			},
		],
		headers: [
			{ text: "프로젝트 번호", value: "PROJ_SN" },
			{ text: "프로젝트명", value: "PROJ_NM" },
			{ text: "프로젝트 참여자 수", value: "numofpeople" },
			{ text: "프로젝트 착수일자", value: "OUTSET_DATE" },
			{ text: "프로젝트 종료일자", value: "END_DATE" },
			{ text: "발주처", value: "ORNT_NM" },
			{ text: "담당자", value: "pm_name" },
			{ text: "평가", value: "eval", sortable: false },
		],
		client_eval: [
			{
				c_question: "현두야..",
				c_answer: "냐~",
			},
			{
				c_question: "구두야..",
				c_answer: "냐!",
			},
		],
		pm_eval: [
			{
				p_question: "투니야..",
				p_answer: "오우와-웅",
			},
			{
				p_question: "'ㅅ'",
				p_answer: ",,!",
			},
		],
		mem_eval: [
			{
				m_question: "1",
				m_answer: "11",
			},
			{
				m_question: "2",
				m_answer: "22",
			},
		],
		dialog: false,
		editedIndex: -1,
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	methods: {
		checkeval(item) {
			this.editedIndex = this.mngmt_eval.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
	},
};
</script>

<style></style>
