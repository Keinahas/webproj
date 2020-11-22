import Vue from "vue";
// import axios from "axios";
// import store from "../store/index";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MyPage from "../views/MyPage.vue";
import emp_mngmt from "../views/emp_mngmt.vue";
import AddingPeople from "../views/AddingPeople.vue";
import ProjectManage from "../views/ProjectManage.vue";
import ProjectDetailPage from "../views/ProjectDetailPage.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { forAll: true },
	},
	{
		path: "/about",
		name: "About",
		component: About,
		meta: { forAll: true },
	},
	{
		path: "/login",
		component: Login,
		meta: { forAll: true },
	},
	{
		path: "/register",
		component: Register,
		meta: { forAll: true },
	},
	{
		path: "/mypage",
		component: MyPage,
	},

	{
		path: "/emp_mngmt",
		component: emp_mngmt,
	},
	{
		path: "/addingpeople",
		component: AddingPeople,
	},
	{
		path: "/projectmanage",
		component: ProjectManage,
	},
	{
		path: "/projectdetailpage",
		component: ProjectDetailPage,
	},
];

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(v => v.meta.forAll)) return next();
// 	axios
// 		.post("/api/auth/refresh")
// 		.then(result => {
// 			if (result.data.role != "employee") {
// 				this.$router.push("/");
// 				return next();
// 			}
// 			store.commit("login", result.data);
// 			return next();
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// });

// router.beforeEach((to, from, next) => {
// 	// if(from.name == )
// })

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
