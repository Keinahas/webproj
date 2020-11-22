<template>
	<v-container class="fill-height">
		<v-row>
			<v-col cols="12" align="center">
				<v-card max-width="500">
					<v-card-title> Register </v-card-title>
					<v-card-text>
						<v-form ref="registryForm">
							<v-row>
								<v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="id"
										v-model="regModel.id"
										prepend-icon="mdi-account-circle"
										:rules="[
											v => !!v || 'Required',
											v => (!!v && !idError) || '아이디가 틀렸습니다',
										]"
									></v-text-field>
								</v-col>
								<v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="Password"
										type="password"
										prepend-icon="mdi-lock"
										v-model="regModel.password"
										@keydown.enter="onRegister"
										:rules="[
											v => !!v || 'Required',
											v => (!!v && !passError) || '비밀번호가 틀렸습니다',
										]"
									></v-text-field>
								</v-col>
								<v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="이름"
										v-model="regModel.name"
										prepend-icon="mdi-account"
										:rules="[v => !!v || 'Required']"
									></v-text-field>
								</v-col>
								<v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="최종학력"
										v-model="regModel.last_acdmcr"
										prepend-icon="mdi-briefcase-variant"
										:rules="[v => !!v || 'Required']"
									></v-text-field> </v-col
								><v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="주민번호"
										v-model="regModel.rgst_no"
										prepend-icon="mdi-card-account-details"
										:rules="[v => !!v || 'Required']"
									></v-text-field>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="ma-2" outlined color="primary" depressed tile @click="onRegister"
							>Register</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		regModel: {},
	}),
	methods: {
		onRegister() {
			this.$refs.registryForm.resetValidation();
			this.$axios
				.post("/api/register", this.regModel)
				.then(() => {
					console.log("Success");
					// this.$store.commit("login", user.data);
					this.$router.push("/");
				})
				.catch(err => {
					console.log(err);
					console.log(err.response.status);
					this.$refs.registryForm.validate();
				});
		},
	},
};
</script>

<style></style>
