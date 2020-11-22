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
				<v-data-table :headers="headers" :items="project_manage_page">
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title>프로젝트 관리</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer
							><v-dialog v-model="dialog" max-width="500px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn color="blue darken-1" dark class="mb-2" v-bind="attrs" v-on="on"
										>프로젝트 추가</v-btn
									>
								</template>
								<v-card>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.number"
														label="프로젝트번호"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="editedItem.name" label="프로젝트명"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.numofpeople"
														label="프로젝트 참여자 수"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="editedItem.date"
														label="프로젝트 착수/종료일자"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="editedItem.client" label="발주처"></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="editedItem.pm_name" label="담당자"></v-text-field>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
										<v-btn color="blue darken-1" text @click="save">Save</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.edit="{ item }">
						<v-btn icon @click="onEdit(item)">수정<v-icon>mdi-pencil</v-icon></v-btn>
					</template>
					<template v-slot:item.termination
						><v-btn @click="onTermination(item)">종료</v-btn></template
					>
					<template v-slot:item.projectpage
						><v-btn @click="onProjectpage(item)">프로젝트 페이지 바로가기</v-btn></template
					>
				</v-data-table>
			</v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="#030712" color="primary" value="30"></v-progress-linear>
			<br />
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col id="News1" cols="3">
				<h3>소개</h3>
				<br />
				<h4>Database Design 소개</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>미디어</h3>
				<br />
				<h4>Database Design 보도 자료</h4>
				<h4>미디어 행사</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>채용</h3>
				<br />
				<h4>Database Design 채용 소개</h4>
				<h4>지원하기</h4>
			</v-col>
			<v-col id="News1" cols="3">
				<h3>투자정보</h3>
				<br />
				<h4>Database Design 추가 정보</h4>
				<h4>Database Design 재무 정보</h4>
				<h4>IR 자료</h4>
			</v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="2"></v-col>
			<v-col cols="3"
				><p class="font-weight-black">
					DATABASE DESIGN
				</p></v-col
			>
			<v-col cols="1"></v-col>
			<v-col cols="6"
				><p class="text--secondary">
					copyright @Database Design Crop. All Rights Reserved
				</p></v-col
			>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: "ProjectManage",
	data: () => ({
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
		editedIndex: -1,
		editedItem: {
			number: 0,
			name: "",
			numofpeople: 0,
			date: "",
			client: "",
			pm_name: "",
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
		onEdit(item) {
			this.editedIndex = this.project_manage_page.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		onTermination() {},
		onProjectpage() {},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.project_manage_page[this.editedIndex], this.editedItem);
			} else {
				this.project_manage_page.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>

<style></style>
