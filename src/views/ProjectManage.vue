<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">프로젝트 관리</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<br />
			<v-col cols="12">
				<v-data-table ref="table" :headers="headers" :items="project_manage_page">
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title>프로젝트 관리</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer
							><template>
								<v-btn color="blue darken-1" dark class="mb-2" @click="onAdd">프로젝트 추가</v-btn>
							</template>
							<v-dialog v-model="dialog" max-width="500px">
								<v-card>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="newModel.name" label="프로젝트명"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="newModel.date"
														label="프로젝트 착수/종료일자"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-select
														v-model="newModel.client"
														:items="ornts"
														label="발주처"
														required
													></v-select>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="onClose">Cancel</v-btn>
										<v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.edit="{ item }">
						<v-btn icon @click="onEdit(item)">수정<v-icon>mdi-pencil</v-icon></v-btn>
					</template>
					<template v-slot:item.termination="{ item }"
						><v-btn @click="onTermination(item)" v-if="!item.terminated">종료</v-btn>
						<v-btn v-else disabled>종료</v-btn>
					</template>
					<template v-slot:item.projectpage="{ item }"
						><v-btn v-if="!item.terminated" @click="onProjectpage(item)"
							>프로젝트 페이지 바로가기</v-btn
						>
						<v-btn v-else @click="onProjectEvalpage(item)">프로젝트 평가 바로가기</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<MyFooter></MyFooter>
	</v-container>
</template>
<script>
import MyFooter from "../components/MyFooter";

export default {
	name: "ProjectManage",
	components: {
		MyFooter,
	},
	data: () => ({
		ornts: [],
		newModel: {
			number: 0,
			name: "",
			numofpeople: 0,
			date: "",
			client: "",
			pm_name: "",
		},
		project_manage_page: [],
		headers: [
			{ text: "프로젝트 번호", value: "number" },
			{ text: "프로젝트명", value: "name" },
			{ text: "프로젝트 참여자 수", value: "numofpeople" },
			{ text: "프로젝트 착수/종료일자", value: "date" },
			{ text: "발주처", value: "client" },
			{ text: "담당자", value: "pm_name" },
			{ text: "수정", value: "edit", sortable: false },
			{ text: "종료", value: "termination", sortable: false },
			{ text: "프로젝트 페이지 바로가기", value: "projectpage", sortable: false },
		],
		dialog: false,
	}),
	computed: {},
	methods: {
		onAdd() {},
		onEdit(item) {
			this.newModel = Object.assign({}, item);
			this.dialog = true;
		},
		onTermination(item) {
			// patch item to end today
			this.newModel = Object.assign({}, item);
			this.newModel.date += new Date()
				.toISOString()
				.replace("T", " ")
				.substr(0, 10);
			this.$axios
				.patch(`/api/proj/${this.newModel.number}`, this.newModel)
				.then(() => {
					this.getProjs();
				})
				.catch(err => {
					console.log(err);
				});
		},
		onProjectpage(item) {
			this.$store.commit("selectProj", item);
			this.$router.push("/projectdetailpage/");
		},
		onProjectEvalpage(item) {
			this.$store.commit("selectProj", item);
			this.$axios
				.get(`/api/participants/chkPM/${this.$store.state.sn}`)
				.then(res => {
					if (res.status == 204) {
						this.$router.push("/pm_eval");
					} else {
						if (this.$store.state.role == "Developer") {
							this.$router.push("/crk_eval");
						} else if (this.$store.state.role == "Manager") {
							this.$router.push("/mngmt_eval");
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		onClose() {
			console.log(this.newModel);
			this.dialog = false;
		},
		onSave() {
			this.$axios
				.patch(`/api/proj/${this.newModel.number}`, this.newModel)
				.then(() => {
					this.getProjs();
				})
				.catch(err => {
					console.log(err);
				});
			this.dialog = false;
		},
		getProjs() {
			this.$axios
				.get("/api/proj")
				.then(projs => {
					projs.data.forEach(proj => {
						if (!proj.date.endsWith("/")) {
							proj.terminated = true;
						} else {
							proj.terminated = false;
						}
					});
					this.project_manage_page = projs.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	mounted() {
		this.getProjs();
		this.$axios
			.get("/api/ornt")
			.then(ornts => {
				console.log(ornts.data);
				this.ornts = ornts.data.map(ornt => ornt.ORNT_NM);
			})
			.catch(err => {
				console.log(err);
			});
	},
};
</script>

<style></style>
