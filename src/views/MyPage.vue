<template>
	<v-container class="fill-height">
		<v-row>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="3"></v-col>
			<v-col cols="6" align="center">
				<v-form ref="empModel" v-model="valid">
					<v-text-field
						v-model="empModel.name"
						:counter="20"
						:rules="[v => !!v && v.length < 20]"
						label="이름"
					></v-text-field>

					<v-text-field
						v-model="empModel.id"
						:counter="20"
						:rules="[v => !!v && v.length < 20]"
						label="ID"
					></v-text-field>

					<v-text-field
						v-model="empModel.password"
						:rules="[v => !!v || 'required', v => !!v && v.length < 20]"
						label="비밀번호"
						type="password"
						required
					></v-text-field>

					<v-text-field
						v-model="empModel.last_acdmcr"
						:counter="20"
						:rules="[v => !!v && v.length < 20]"
						label="최종학력"
					></v-text-field>

					<v-text-field
						v-model="empModel.rgst_no"
						:disabled="true"
						label="주민등록번호"
					></v-text-field>

					<v-btn :disabled="!valid" class="ma-2" outlined color="primary" @click="save">
						Save
					</v-btn>
					<v-btn color="error" class="ma-2" outlined @click="getEmp">
						Reset Form
					</v-btn>
					<v-btn color="warning" class="ma-2" outlined @click="resetValidation">
						Reset Validation
					</v-btn>
				</v-form>
			</v-col>
			<v-col cols="3"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-col cols="12"></v-col>
			<v-progress-linear background-color="primary" color="#030712" value="30"></v-progress-linear>
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
				><p class="text--primary">
					copyright @Database Design Crop. All Rights Reserved
				</p></v-col
			>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		empModel: {},
	}),
	mounted() {
		this.getEmp();
	},
	methods: {
		resetValidation() {
			this.$refs.empModel.resetValidation();
		},
		getEmp() {
			this.$axios
				.get(`/api/users/${this.$store.state.sn}`)
				.then(emp => {
					console.log(emp.data);
					this.empModel = emp.data;
				})
				.catch(err => {
					console.log(err);
				});
			this.$refs.empModel.resetValidation();
		},
		save() {
			this.$axios
				.patch(`/api/users/${this.$store.state.sn}`)
				.then(() => {
					this.getEmp();
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<style></style>
