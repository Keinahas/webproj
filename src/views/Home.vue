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

			<v-col cols="5" v-for="item in onGoingProjs" :key="item.PROJ_SN">
				<v-col cols="2"></v-col>
				<v-col cols="10">
					<template>
						<v-card outlined shaped @click="onSelectProj(item)">
							<v-list-item three-line>
								<v-list-item-content>
									<div class="overline pt-2">
										{{ item.OUTSET_DATE }}
									</div>
									<v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
									<v-list-item-subtitle>PM : {{ item.pm_nm }}</v-list-item-subtitle>
								</v-list-item-content>
								<v-spacer></v-spacer>
							</v-list-item>
						</v-card>
					</template>
				</v-col>
			</v-col>

			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12">
				<h2>참여했던 프로젝트</h2>
			</v-col>
			<v-col cols="6" v-for="item in finishedProjs" :key="item.PROJ_SN">
				<v-col cols="2"></v-col>
				<v-col cols="10">
					<v-card outlined shaped @click="onSelectProj(item)">
						<v-list-item three-line>
							<v-list-item-content>
								<div class="overline pt-2">{{ item.OUTSET_DATE + " ~ " + item.END_DATE }}</div>
								<v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
								<v-list-item-subtitle>PM : {{ item.pm_nm }}</v-list-item-subtitle>
							</v-list-item-content>

							<v-spacer></v-spacer>
						</v-list-item>
					</v-card>
				</v-col>
			</v-col>
			<v-col cols="12">
				<v-btn class="ma-2" outlined color="primary"
					><v-icon left>mdi-account-circle</v-icon>More</v-btn
				>
			</v-col>
			<v-col cols="12"></v-col>
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
		onGoingProjs: [],
		finishedProjs: [],
	}),
	mounted() {
		this.getProjs();
	},
	methods: {
		onSelectProj(item) {
			console.log(item);
			this.$store.commit("selectProj", item);
			this.$router.push("/projectdetailpage/");
		},
		getProjs() {
			if (!this.$store.state.id) return;
			this.$axios
				.get(`/api/participants/${this.$store.state.sn}`)
				.then(projs => {
					projs.data.forEach(proj => {
						if (
							proj.END_DATE <=
							new Date()
								.toISOString()
								.replace("T", " ")
								.substr(0, 10)
						)
							this.finishedProjs.push(proj);
						else this.onGoingProjs.push(proj);
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>
