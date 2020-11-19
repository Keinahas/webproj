<template>
	<v-container v-if="!userId" color="primary" class="fill-height">
		<v-row aria-rowcount="20">
			<!-- 로그인 안했을때 -->
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
	</v-container>
	<v-container v-else color="primary" class="fill-height">
		<!-- 로그인 했을때 -->
		Main
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
