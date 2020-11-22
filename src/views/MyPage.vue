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
