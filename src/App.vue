<template>
	<v-app>
		<v-app-bar dark app src="https://i.ibb.co/BHDhCqk/background.jpg">
			<template v-slot:img="{ props }">
				<v-img v-bind="props" gradient="to top right, rgba(0,0,0,.7), rgba(25,32,72,.7)"></v-img>
			</template>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title class="text-uppercase white--text ma-2" @click="goMain">
				<span><h3>Database Design</h3></span>
			</v-toolbar-title>
			<v-toolbar-title v-if="role" class="text-uppercase white--text ma-2" @click="goProjectManage">
				<span><h3>프로젝트 관리</h3></span>
			</v-toolbar-title>
			<v-toolbar-title v-if="role" class="text-uppercase white--text ma-2" @click="goEmpManage">
				<span><h3>직원 관리</h3></span>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-btn v-if="!userId" class="ma-2" outlined color="secondary" to="register"
				><v-icon left>mdi-login</v-icon>Register</v-btn
			>
			<v-btn v-else class="ma-2" outlined color="secondary" to="mypage"
				><v-icon left>mdi-account-circle</v-icon>MyPage</v-btn
			>
			<v-btn v-if="!userId" class="ma-2" outlined color="secondary" to="login"
				><v-icon left>mdi-login</v-icon>Login</v-btn
			>
			<v-btn v-else class="ma-2" outlined color="secondary" @click="$store.commit('logout')"
				><v-icon left>mdi-logout</v-icon>Logout</v-btn
			>
		</v-app-bar>
		<v-main>
			<v-fade-transition mode="out-in">
				<router-view></router-view>
			</v-fade-transition>
		</v-main>
		<v-container>
			<v-row>
				<v-col cols="12"></v-col>
				<v-progress-linear
					background-color="#030712"
					color="primary"
					value="30"
				></v-progress-linear>
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
	</v-app>
</template>

<script>
export default {
	name: "App",
	methods: {
		goMain() {
			this.$router.push("/");
		},
		goProjectManage() {
			this.$router.push("/ProjectManage");
		},
		goEmpManage() {
			this.$router.push("/emp_mngmt");
		},
	},
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
