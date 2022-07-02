const path = require("path");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { resolve } = require("path");
const webpack = require("webpack");
const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
	entry: "./src/index.js",
	target: "web",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		open: true,
		port: 3000,
		static: path.join(__dirname, "public"),
	},
	resolve: {
		alias: {
			"@": path.resolve("src"),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
		new MiniCssExtractPlugin(),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public/favicon.ico", to: "" },
				{ from: "public/manifest.json", to: "" },
				{ from: "public/robots.txt", to: "" },
			],
		}),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
			{
				test: /\.(js|jsx)$/i,
				loader: "babel-loader",
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, "css-loader", "sass-loader"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},
		],
	},
};

module.exports = () => {
	if (isProduction) config.mode = "production";
	else config.mode = "development";
	return config;
};
