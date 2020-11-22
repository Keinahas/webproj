<template>
	<v-container class="fill-height">
		<v-container v-if="!userId" color="secondary" class="fill-height">
			<v-row aria-rowcount="20">
				<v-col cols="12">
					<h1>프로젝트01 참여자 추가</h1>
					<br />
				</v-col>
				<v-col cols="12"></v-col>
				<v-progress-linear
					background-color="#030712"
					color="primary"
					value="30"
				></v-progress-linear>
				<v-col cols="12"></v-col>
				<v-col cols="12">
					<h3>프로젝트 참여자 목록</h3>
				</v-col>
				<v-col cols="12">
					<v-data-table :headers="headers" :items="PROJ_PARTICIPANT" class="elevation-1">
						<template v-slot:item.PROJ_EXC="{ item }">
							<v-simple-checkbox v-model="item.PROJ_EXC"></v-simple-checkbox>
						</template>
						<template v-slot:top>
							<v-dialog v-model="dialog" max-width="500px">
								<v-card>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4"> </v-col>
											<v-col cols="12" sm="6" md="4">
												<v-input> 경험기술목록 </v-input>
											</v-col>
											<v-col cols="12" sm="6" md="4"> </v-col>
											<v-col cols="12" sm="6" md="4">
												<v-spacer></v-spacer>
												<v-input v-model="ExpTchItem.EXP_TCH">
													{{ ExpTchItem.EXP_TCH }}
												</v-input>
											</v-col>
										</v-row>
									</v-container>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</template>
						<template v-slot:item.EXP_TCH>
							<v-btn color="gray darken-1" dark class="mb-2" @click="onExpTch(item)"
								>목록 보기</v-btn
							>
						</template>
					</v-data-table>
				</v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12">
					<h3>직원 목록</h3>
				</v-col>
				<v-col cols="12">
					<v-data-table :headers="headers" :items="EMP" class="elevation-1">
						<template v-slot:item.PROJ_OUTSET="{ item }">
							<v-simple-checkbox v-model="item.PROJ_OUTSET"></v-simple-checkbox>
						</template>
						<template v-slot:item.EXP_TCH>
							<v-btn color="gray darken-1" dark class="mb-2" @click="onExpTch(item)"
								>목록 보기</v-btn
							>
						</template>
					</v-data-table>
				</v-col>
				<v-col cols="12" align="right">
					<v-btn v-if="!userId" class="ma-2" outlined color="primary" to=""
						><v-icon left>mdi-login</v-icon>RESET</v-btn
					>
					<v-btn v-if="!userId" outlined color="primary" to=""
						><v-icon left>mdi-login</v-icon>SAVE</v-btn
					>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-progress-linear
					background-color="primary"
					color="#030712"
					value="30"
				></v-progress-linear>
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
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			PROJ_PARTICIPANT: [
				{
					EMP_SN: "2",
					EMP_NM: "김투니",
					PROJ_DTY: "PM",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 4,
					PROJ_EXC: false,
				},
				{
					EMP_SN: "6",
					EMP_NM: "이투니",
					PROJ_DTY: "PL",
					OUTSET_PERIOD: "2019-10-09~",
					CAREER: 4,
					PROJ_EXC: false,
				},
				{
					EMP_SN: "7",
					EMP_NM: "박투니",
					PROJ_DTY: "프로그래머",
					OUTSET_PERIOD: "2019-10-09~",
					CAREER: 6,
					PROJ_EXC: false,
				},
				{
					EMP_SN: "15",
					EMP_NM: "정투니",
					PROJ_DTY: "또뭐있더라",
					OUTSET_PERIOD: "2019-09-09~2019-19-09",
					CAREER: 3,
					PROJ_EXC: false,
				},
				{
					EMP_SN: "20",
					EMP_NM: "대충이름",
					PROJ_DTY: "모르겠다",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 3,
					PROJ_EXC: false,
				},
				{
					EMP_SN: "55",
					EMP_NM: "나도대충",
					PROJ_DTY: "일단써",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 1,
					PROJ_EXC: false,
				},
			],
			EMP: [
				{
					EMP_SN: "1",
					EMP_NM: "김투니",
					PROJ_DTY: "PM",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 4,
					PROJ_OUTSET: false,
				},
				{
					EMP_SN: "2",
					EMP_NM: "이투니",
					PROJ_DTY: "PL",
					OUTSET_PERIOD: "2019-10-09~",
					CAREER: 4,
					PROJ_OUTSET: false,
				},
				{
					EMP_SN: "3",
					EMP_NM: "박투니",
					PROJ_DTY: "프로그래머",
					OUTSET_PERIOD: "2019-10-09~",
					CAREER: 6,
					PROJ_OUTSET: false,
				},
				{
					EMP_SN: "4",
					EMP_NM: "정투니",
					PROJ_DTY: "또뭐있더라",
					OUTSET_PERIOD: "2019-09-09~2019-19-09",
					CAREER: 3,
					PROJ_OUTSET: false,
				},
				{
					EMP_SN: "5",
					EMP_NM: "신입사원김다연",
					PROJ_DTY: "현두님 비서",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 3,
					PROJ_OUTSET: false,
				},
				{
					EMP_SN: "6",
					EMP_NM: "나도대충",
					PROJ_DTY: "일단써",
					OUTSET_PERIOD: "2019-09-09~",
					CAREER: 1,
					PROJ_OUTSET: false,
				},
			],
			headers: [
				{
					text: "직원번호",
					align: "start",
					sortable: false,
					value: "EMP_SN",
					PROJ_EXC: false,
					PROJ_OUTSET: false,
				},
				{ text: "직원이름", value: "EMP_NM" },
				{ text: "직무", value: "PROJ_DTY" },
				{ text: "투입기간", value: "OUTSET_PERIOD" },
				{ text: "경력", value: "CAREER" },
				{ text: "경험기술", value: "EXP_TCH" },
				{ text: "프로젝트 제외", value: "PROJ_EXC" },
				{ text: "프로젝트 투입", value: "PROJ_OUTSET" },
			],
			ExpTchItem: {
				EXP_TCH: "경험기술1",
			},
			dialog: false,
		};
	},
	methods: {
		onExpTch() {
			this.dialog = true;
		},
		close() {
			this.dialog = false;
		},
	},
};
</script>
