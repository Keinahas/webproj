<template>
	<v-container v-if="!userId" color="primary" class="fill-height">
		<v-row aria-rowcount>
			<v-col cols="12">
				<h2>사원관리</h2>
				<br />
			</v-col>
			<v-progress-linear background-color="primary" color="#030712" value="30"></v-progress-linear>
			<br />
			<br />
			<v-data-table
				:headers="headers"
				:items="emps"
				:items-per-page="10"
				:search="search"
				style="width: 100%"
			></v-data-table>
			<br />
			<v-col cols="12"></v-col>
			<v-row align="end" justify="end">
				<v-card-subtitle>
					사원 찾기
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					></v-text-field>
				</v-card-subtitle>
			</v-row>
			<v-col cols="12"></v-col>
			<v-row align="end" justify="end">
				<v-btn @click="loader = 'loading'">
					직원정보
				</v-btn>
			</v-row>
		</v-row>
		<MyFooter></MyFooter>
	</v-container>
</template>

<script>
import MyFooter from "../components/MyFooter";

export default {
	components: {
		MyFooter,
	},
	mounted() {
		this.getEmps();
	},
	data: () => ({
		search: "",
		headers: [
			{
				text: "직원번호",
				value: "emp_sn",
				align: "center",
			},
			{ text: "직원명", value: "emp_nm" },
			{ text: "주민등록번호", value: "rgst_no" },
			{ text: "최종학력", value: "last_acdmcr" },
			{ text: "사원분류", value: "emp_t" },
			{ text: "경력", value: "career" },
			{ text: "기술등급", value: "tch_sn" },
			{ text: "직무", value: "proj_dty" },
		],
		emps: [],
	}),
	methods: {
		getEmps() {
			this.$axios
				.get("/api/users")
				.then(result => {
					this.emps = result.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>
