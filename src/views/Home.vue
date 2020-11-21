<template>
	<v-container class="fill-height">
		<v-container v-if="!userId" color="primary" class="fill-height">
			<v-row aria-rowcount="20">
				<v-col cols="12">
					<h2>데이터베이스 디자인 웹 설계 프로젝트</h2>
					<br />
				</v-col>
				<v-col cols="12" color="primary">
					<h3>참여자 : 김다연, 나유현, 박수원, 장우찬</h3>
					<br
				/></v-col>
				<v-col cols="12"></v-col>
				<v-progress-linear
					background-color="#030712"
					color="primary"
					value="30"
				></v-progress-linear>
				<v-col cols="12"></v-col>

				<v-col cols="12">
					NEWS
				</v-col>
				<v-col id="News1" cols="6">
					<h2>Database Design News1</h2>
					<h4>2020.10.10</h4>
					<h4>Database design News1</h4>
				</v-col>
				<v-col id="News1" cols="6">
					<h2>Database Design News2</h2>
					<h4>2020.10.10</h4>
					<h4>Database design News2</h4>
				</v-col>
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
					><p class="text--primary">
						copyright @Database Design Crop. All Rights Reserved
					</p></v-col
				>
			</v-row>
		</v-container>
		<v-container v-else color="secondary" class="fill-height">
			<!-- 로그인 했을때 -->
			<v-row aria-rowcount="20">
				<v-col cols="12" align="center">
					<h1>내 프로젝트</h1>
					<br />
				</v-col>
				<v-col cols="12"></v-col>
				<v-progress-linear
					background-color="primary"
					color="#030712"
					value="30"
				></v-progress-linear>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12">
					<h2>참여중인 프로젝트</h2>
				</v-col>
				<v-col cols="12">
					<h1>프로젝트01</h1>
					<h3>2020.10.23</h3>
					<br />
					<h3>PM : 김피엠</h3>
					<br />
				</v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12"></v-col>
				<v-col cols="12">
					<h2>참여했던 프로젝트</h2>
				</v-col>
				<v-col cols="5">
					<h1>프로젝트02</h1>
					<h3>2020.00.00</h3>
					<br />
					<h3>PM : 이피엠</h3>
					<br />
				</v-col>
				<v-col cols="5">
					<h1>프로젝트03</h1>
					<h3>2020.00.00</h3>
					<br />
					<h3>PM : 박피엠</h3>
					<br />
				</v-col>
				<v-col cols="2">
					<br />
					<br />
					<br />
					<br />
					<!-- to="mypage" 수정 필요 -->
					<v-btn class="ma-2" outlined color="primary"
						><v-icon left>mdi-account-circle</v-icon>More</v-btn
					>
				</v-col>
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
					><p class="text--primary">
						copyright @Database Design Crop. All Rights Reserved
					</p></v-col
				>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
export default {
	name: "Home",

	components: {},
	computed: {
		userId() {
			return this.$store.state.id;
		},
		role() {
			return this.$store.state.role;
		},
	},
	data: () => ({
		//
		drawer: false,
	}),
};
</script>
