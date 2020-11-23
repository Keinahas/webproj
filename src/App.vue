<template>
	<v-app>
		<v-app-bar dark app src="https://i.ibb.co/BHDhCqk/background.jpg">
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title class="text-uppercase white--text ma-2" @click="goMain">
				<span><h3>Database Design</h3></span>
			</v-toolbar-title>
			<v-toolbar-title
				v-if="isManager"
				class="text-uppercase white--text ma-2"
				@click="goProjectManage"
			>
				<span><h3>프로젝트 관리</h3></span>
			</v-toolbar-title>
			<v-toolbar-title
				v-if="isManager"
				class="text-uppercase white--text ma-2"
				@click="goEmpManage"
			>
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
		isManager() {
			return this.$store.state.role == "Manager";
		},
		isDvlpr() {
			return this.$store.state.role == "Developer";
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
