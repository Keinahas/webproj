const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	transpileDependencies: ["vuetify"],
	devServer: {
		proxy: {
			"/api/*": {
				target: "http://" + (process.env.TARGET || "localhost") + ":3000",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
