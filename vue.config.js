const path = require("path");
const config = process.env.CONFIG_DEV === "true" ? "index.dev.js" : "index.js";
module.exports = {
  publicPath: "",
  configureWebpack: {
    resolve: {
      alias: {
        "~config": path.resolve(__dirname, "src/config/", config)
      },
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"]
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
};
