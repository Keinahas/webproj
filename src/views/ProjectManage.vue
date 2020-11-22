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
							><v-dialog v-model="dialog" max-width="500px">
								<template>
									<v-btn color="blue darken-1" dark class="mb-2" @click="onAdd"
										>프로젝트 추가</v-btn
									>
								</template>
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
													<v-text-field v-model="newModel.client" label="발주처"></v-text-field>
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
						><v-btn @click="onTermination(item)">종료</v-btn></template
					>
					<template v-slot:item.projectpage="{ item }"
						><v-btn @click="onProjectpage(item)">프로젝트 페이지 바로가기</v-btn></template
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
	name: "ProjectManage",
	components: {
		MyFooter,
	},
	data: () => ({
		ornts: [],
		selectedIdx: -1,
		newModel: {
			number: 0,
			name: "",
			numofpeople: 0,
			date: "",
			client: "",
			pm_name: "",
		},
		project_manage_page: [
			{
				number: 1111,
				name: "프로젝트명",
				numofpeople: 6,
				date: "프로젝트 착수/종료일자",
				client: "발주처",
				pm_name: "담당자",
			},
			{
				number: 2222,
				name: "프로젝트명1",
				numofpeople: 6,
				date: "프로젝트 착수/종료일자1",
				client: "발주처1",
				pm_name: "담당자1",
			},
		],
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
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},
	methods: {
		onAdd() {},
		onEdit(item) {
			this.selectedIdx = this.project_manage_page.indexOf(item);
			this.newModel = Object.assign({}, item);
			this.dialog = true;
		},
		onTermination(item) {
			// patch item to end today
			console.log(item);
		},
		onProjectpage(item) {
			this.$router.push(`/projectdetailpage/${item.number}`);
		},
		onClose() {
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
				this.ornts = ornts.data;
			})
			.catch(err => {
				console.log(err);
			});
	},
};
</script>

<style></style>
