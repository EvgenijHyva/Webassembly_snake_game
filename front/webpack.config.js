const path = require("path");

module.exports = {
	entry: "./script.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "script.js"
	},
	mode: "development"
}