<template>
	<v-app>
		<v-app-bar dark app src="https://i.ibb.co/BHDhCqk/background.jpg">
			<template v-slot:img="{ props }">
				<v-img v-bind="props" gradient="to top right, rgba(0,0,0,.7), rgba(25,32,72,.7)"></v-img>
			</template>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title class="text-uppercase white--text" @click="goMain">
				<span><h3>Database Design</h3></span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn v-if="!userId" class="ma-2" outlined color="white" to="register"
				><v-icon left>mdi-login</v-icon>Register</v-btn
			>
			<v-btn v-else color="primary" class="elevation-0" to="mypage"
				><v-icon left>mdi-account-circle</v-icon>MyPage</v-btn
			>
			<v-btn v-if="!userId" class="ma-2" outlined color="white" to="login"
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
	methods: {
		goMain() {
			this.$router.push("/");
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
