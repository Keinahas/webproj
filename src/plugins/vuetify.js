import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#000080",
				secondary: colors.shades.white,
				lineColor: "#030712",
				accent: colors.indigo.base,
			},
		},
	},
});
