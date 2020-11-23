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
														<th class="text-left">업무수행평가</th>
														<th class="text-left">업무수행평가내용</th>
														<th class="text-left">커뮤니케이션평가</th>
														<th class="text-left">커뮤니케이션평가내용</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in client_eval" :key="item.c_question">
														<td>{{ item.c_question }}</td>
														<td>{{ item.c_answer }}</td>
														<td>{{ item.c_question2 }}</td>
														<td>{{ item.c_answer2 }}</td>
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
														<th class="text-left">업무수행평가</th>
														<th class="text-left">업무수행평가내용</th>
														<th class="text-left">커뮤니케이션평가</th>
														<th class="text-left">커뮤니케이션평가내용</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in pm_eval" :key="item.p_question">
														<td>{{ item.c_question }}</td>
														<td>{{ item.c_answer }}</td>
														<td>{{ item.c_question2 }}</td>
														<td>{{ item.c_answer2 }}</td>
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
														<th class="text-left">업무수행평가</th>
														<th class="text-left">업무수행평가내용</th>
														<th class="text-left">커뮤니케이션평가</th>
														<th class="text-left">커뮤니케이션평가내용</th>
														<th class="text-left">피평가자</th>
														<th class="text-left">평가자</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="item in mem_eval" :key="item.m_question">
														<td>{{ item.c_question }}</td>
														<td>{{ item.c_answer }}</td>
														<td>{{ item.c_question2 }}</td>
														<td>{{ item.c_answer2 }}</td>
														<td>{{ item.c_question3 }}</td>
														<td>{{ item.c_answer3 }}</td>
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
				PROJ_SN: 50060001,
				PROJ_NM: "프로젝트6",
				numofpeople: 6,
				OUTSET_DATE: "2018-04-062018-10-06",
				END_DATE: "2018-10-06",
				ORNT_NM: "하이브랩",
				pm_name: "이지유",
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
				c_question: "3점",
				c_answer: "보통이다",
				c_question2: "4점",
				c_answer2: "만족합니다",
			},
		],
		pm_eval: [
			{
				c_question: "3점",
				c_answer: "보통이다",
				c_question2: "5점",
				c_answer2: "매우 만족합니다",
			},
		],
		mem_eval: [
			{
				c_question: "3점",
				c_answer: "보통이다",
				c_question2: "4점",
				c_answer2: "만족합니다",
				c_question3: "양준우",
				c_answer3: "전서현",
			},
			{
				c_question: "4점",
				c_answer: "만족합니다",
				c_question2: "5점",
				c_answer2: "매우 만족합니다",
				c_question3: "신채원",
				c_answer3: "전서현",
			},
			{
				c_question: "4점",
				c_answer: "만족합니다",
				c_question2: "3점",
				c_answer2: "보통이다",
				c_question3: "전서현",
				c_answer3: "양준우",
			},
			{
				c_question: "3점",
				c_answer: "보통이다",
				c_question2: "5점",
				c_answer2: "매우 만족합니다",
				c_question3: "문민서",
				c_answer3: "박민준",
			},
			{
				c_question: "3점",
				c_answer: "보통이다",
				c_question2: "5점",
				c_answer2: "매우 만족합니다",
				c_question3: "박민준",
				c_answer3: "신채원",
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
