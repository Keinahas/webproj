<template>
	<v-container class="fill-height">
		<v-container v-if="!userId" color="primary" class="fill-height">
			<!-- 로그인 안했을때 -->
			Home
		</v-container>
		<v-container v-else color="primary" class="fill-height">
			<!-- 로그인 했을때 -->
			Main
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
