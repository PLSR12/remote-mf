const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./.env" });
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
	// console.log({ env, argv, configs: configs[argv.mode] });

	console.log(
		"PUBLIC_PATH:",
		process.env.PUBLIC_PATH,
		"ENVIRONMENT_MODE:",
		process.env.ENVIRONMENT_MODE,
		"CONTAINER_PATH:",
		process.env.CONTAINER_PATH
	);

	return {
		output: {
			publicPath: process.env.PUBLIC_PATH, // URL pública para servir o bundle em produção
			clean: true, // Para limpar o diretório de saída
			path: path.resolve(__dirname, "./dist"),
		},

		mode: process.env.ENVIRONMENT_MODE,

		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
		},

		devServer: {
			hot: true,
			port: 3001,
			historyApiFallback: true,
			allowedHosts: "all",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers":
					"Origin, X-Requested-With, Content-Type, Accept",
			},
		},

		module: {
			rules: [
				{
					test: /\.m?js/,
					type: "javascript/auto",
					resolve: {
						fullySpecified: false,
					},
				},
				{
					test: /\.(css|s[ac]ss)$/i,
					use: ["style-loader", "css-loader", "postcss-loader"],
				},
				{
					test: /\.(ts|tsx|js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
			],
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env": JSON.stringify(dotenv.parsed),
			}),

			new ModuleFederationPlugin({
				name: "remote",
				filename: "remote-app.js",
				remotes: {
					container: process.env.CONTAINER_PATH,
				},
				exposes: {
					"./RemoteApp": "./src/App.tsx",
					"./UserPage": "./src/pages/UserPage/index.tsx",
				},
				shared: {
					...deps,
					react: {
						singleton: true,
						requiredVersion: deps.react,
					},
					"react-dom": {
						singleton: true,
						requiredVersion: deps["react-dom"],
					},
				},
			}),
			new HtmlWebPackPlugin({
				template: "./src/index.html",
			}),
		],
	};
};
