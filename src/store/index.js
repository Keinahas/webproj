import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: "",
		name: "",
		role: "",
		sn: "", // Serial Number
		projSN: "", // Serial Number
	},
	mutations: {
		login(state, userModel) {
			state.id = userModel.id;
			state.name = userModel.name;
			state.role = userModel.role;
			state.sn = userModel.sn;
		},
		logout(state) {
			state.id = "";
			state.name = "";
			state.role = "";
			state.sn = "";
			state.projSN = "";
			Axios.post("/api/auth/logout");
			Router.push("/");
		},
		selectProj(state, projSN) {
			state.projSN = projSN;
		},
	},
	actions: {},
	modules: {},
});
