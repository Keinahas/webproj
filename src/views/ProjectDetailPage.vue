<template>
	<v-container class="fill-height">
		<v-row aria-rowcount="20">
			<v-col cols="12">
				<br />
				<h1 align="center">프로젝트 상세 페이지</h1>
				<br />
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<v-col cols="12">
				<v-data-table :headers="proj_headers" :items="project" hide-default-footer>
					<v-toolbar flat>
						<v-toolbar-title>프로젝트 상세 목록</v-toolbar-title>
					</v-toolbar>
					<template v-slot:item.exp_tch>
						<v-btn color="gray darken-1" dark class="mb-2" @click="onExpTch(item)">목록 보기</v-btn>
					</template>
					<template v-slot:item.proj_exclusion="{ item }"
						><v-btn color="gray darken-1" dark class="mb-2" @click="onProjExclusion(item)"
							>프로젝트 제외</v-btn
						></template
					>
				</v-data-table>
			</v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<v-col cols="12"></v-col>
			<br />
			<v-col cols="12">
				<v-data-table :headers="headers" :items="project_detail_page">
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title>프로젝트 참여자 목록</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" dark class="mb-2" @click="onAddParticipant"
								>프로젝트 참여자 추가</v-btn
							>
							<v-dialog v-model="dialog" max-width="500px">
								<v-card>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4"> </v-col>
											<v-col cols="12" sm="6" md="4">
												<v-input> 경험기술목록 </v-input>
											</v-col>
											<v-col cols="12" sm="6" md="4"> </v-col>
											<v-col cols="12" sm="6" md="4">
												<v-spacer></v-spacer>
												<v-input v-model="ExpTchItem.exp_tch">
													{{ ExpTchItem.exp_tch }}
												</v-input>
											</v-col>
										</v-row>
									</v-container>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.exp_tch>
						<v-btn color="gray darken-1" dark class="mb-2" @click="onExpTch(item)">목록 보기</v-btn>
					</template>
					<template v-slot:item.proj_exclusion="{ item }"
						><v-btn color="gray darken-1" dark class="mb-2" @click="onProjExclusion(item)"
							>프로젝트 제외</v-btn
						></template
					>
				</v-data-table>
			</v-col>
		</v-row>
		<MyFooter></MyFooter>
	</v-container>
</template>

<script>
import MyFooter from "../components/MyFooter";
export default {
	name: "ProjectDetailPage",
	components: {
		MyFooter,
	},
	data: () => ({
		project: [
			{
				number: 1111,
				name: "프로젝트명",
				numofpeople: 6,
				date: "프로젝트 착수/종료일자",
				client: "발주처",
				pm_name: "담당자",
			},
		],
		proj_headers: [
			{ text: "프로젝트 번호", value: "number", sortable: false },
			{ text: "프로젝트명", value: "name", sortable: false },
			{ text: "프로젝트 참여자 수", value: "numofpeople", sortable: false },
			{ text: "프로젝트 착수/종료일자", value: "date", sortable: false },
			{ text: "발주처", value: "client", sortable: false },
			{ text: "담당자", value: "pm_name", sortable: false },
		],
		project_detail_page: [
			{
				number: 1,
				name: "직원명",
				proj_job: "개발자/테스터",
				date: "투입시기",
				career: "3년",
			},
			{
				number: 2,
				name: "직원명1",
				proj_job: "개발자/테스터1",
				date: "투입시기",
				career: "4년",
			},
		],
		headers: [
			{ text: "직원번호", value: "number" },
			{ text: "직원명", value: "name" },
			{ text: "직원분류/직무", value: "proj_job", sortable: false },
			{ text: "투입시기", value: "date" },
			{ text: "경력", value: "career" },
			{ text: "경험 기술", value: "exp_tch", sortable: false },
			{ text: "프로젝트 제외", value: "proj_exclusion", sortable: false },
		],
		dialog: false,
		ExpTchItem: {
			exp_tch: "경험기술1",
		},
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	methods: {
		onExpTch() {
			this.dialog = true;
		},
		onProjExclusion(item) {
			const index = this.project_detail_page.indexOf(item);
			confirm("제외하시겠습니까?") && this.project_detail_page.splice(index, 1);
		},
		onAddParticipant() {},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
	},
};
</script>

<style></style>
