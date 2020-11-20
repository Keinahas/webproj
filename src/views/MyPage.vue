<template>
	<v-container class="fill-height">
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
				label="Password"
				type="password"
				required
			></v-text-field>

			<v-text-field
				v-model="empModel.last_acdmcr"
				:counter="20"
				:rules="[v => !!v && v.length < 20]"
				label="최종학력"
			></v-text-field>

			<v-text-field v-model="empModel.rgst_no" :disabled="true" label="주민등록번호"></v-text-field>

			<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
				Validate
			</v-btn>

			<v-btn color="error" class="mr-4" @click="getEmp">
				Reset Form
			</v-btn>

			<v-btn color="warning" @click="resetValidation">
				Reset Validation
			</v-btn>
		</v-form>
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
	},
};
</script>

<style></style>
