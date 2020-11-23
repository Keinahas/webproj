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
		selectedProj: {
			number: "", // Serial Number
			name: "",
			numofpeople: "",
			date: "",
			client: "",
			pm_name: "",
		},
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
			state.selectedProj = {};
			Axios.post("/api/auth/logout");
			Router.push("/");
		},
		selectProj(state, proj) {
			state.selectedProj.number = proj.number;
			state.selectedProj.name = proj.name;
			state.selectedProj.numofpeople = proj.numofpeople;
			state.selectedProj.date = proj.date;
			state.selectedProj.client = proj.client;
			state.selectedProj.pm_name = proj.pm_name;
		},
	},
	actions: {},
	modules: {},
});
