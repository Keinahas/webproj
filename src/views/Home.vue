<template>
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
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
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
		</v-row>
		<MyFooter></MyFooter>
	</v-container>
	<v-container v-else color="secondary" class="fill-height">
		<!-- 로그인 했을때 -->
		<v-row aria-rowcount="20">
			<v-col cols="12" align="center">
				<h1>내 프로젝트</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="primary" color="#030712" value="30"></v-progress-linear>
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
		</v-row>
		<MyFooter></MyFooter>
	</v-container>
</template>

<script>
import MyFooter from "../components/MyFooter";

export default {
	name: "Home",

	components: {
		MyFooter,
	},
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
