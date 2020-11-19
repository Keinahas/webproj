<template>
	<v-app>
		<v-app-bar color="primary" dark app>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title>Title</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn v-if="!userId" color="primary" class="elevation-0" to="register"
				><v-icon left>mdi-login</v-icon>Register</v-btn
			>
			<v-btn v-else color="primary" class="elevation-0" to="mypage"
				><v-icon left>mdi-account-circle</v-icon>MyPage</v-btn
			>
			<v-btn v-if="!userId" color="primary" class="elevation-0" to="login"
				><v-icon left>mdi-login</v-icon>Login</v-btn
			>
			<v-btn v-else color="primary" class="elevation-0" @click="$store.commit('logout')"
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
