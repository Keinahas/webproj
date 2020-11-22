module.exports = {
	transpileDependencies: ["vuetify"],
	devServer: {
		proxy: {
			"/api/*": {
				target: "http://175.196.113.2:3000",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
