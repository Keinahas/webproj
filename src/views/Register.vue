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
										id="idfield"
										label="id"
										v-model="regModel.id"
										prepend-icon="mdi-account-circle"
										:rules="[v => !!v || 'Required', v => (v && !idDup) || '아이디 중복입니다']"
										@change="resetDupChkIcon"
									>
										<v-btn icon slot="append" @click="onChkDupID">
											<v-icon :color="dupChkIconColor">{{ dupChkIcon }}</v-icon>
										</v-btn>
									</v-text-field>
								</v-col>
								<v-col cols="12" class="pt-0 pb-0">
									<v-text-field
										label="비밀번호"
										type="password"
										prepend-icon="mdi-lock"
										v-model="regModel.password"
										@keydown.enter="onRegister"
										:rules="[v => !!v || 'Required']"
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
		idDup: false,
		dupChkIconColor: undefined,
		dupChkIcon: "mdi-help-circle-outline",
		regModel: {},
	}),
	methods: {
		resetDupChkIcon() {
			this.dupChkIcon = "mdi-help-circle-outline";
			this.dupChkIconColor = undefined;
		},
		onChkDupID() {
			if (!this.regModel.id.trim()) return;
			this.$axios
				.post("/api/auth/dupIDChk", this.regModel)
				.then(res => {
					console.log("Register.vue: " + res.status);
					switch (res.status) {
						case 200: // has emp
							this.dupChkIcon = "mdi-alert-circle-outline";
							this.dupChkIconColor = "red";
							this.idDup = true;
							break;
						case 204: // No emp
							this.dupChkIcon = "mdi-check-circle-outline";
							this.dupChkIconColor = "green";
							this.idDup = false;
							break;
					}
				})
				.catch(err => {
					console.log("Register.vue: " + err.response.status);
					this.dupChkIcon = "mdi-help-circle-outline";
					this.dupChkIconColor = undefined;
					this.idDup = false;
				});
		},
		onRegister() {
			this.$refs.registryForm.resetValidation();
			this.$axios
				.post("/api/register", this.regModel)
				.then(user => {
					this.$store.commit("login", user.data);
					this.$router.push("/");
				})
				.catch(err => {
					console.log("Register.vue: " + err.response.status);
					this.$refs.registryForm.validate();
				});
		},
	},
};
</script>

<style></style>
