import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.shades.white,
				secondary: "#000080",
				lineColor: "#030712",
				accent: colors.indigo.base,
			},
		},
	},
});
