const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const environment =
    process.env.NODE_ENV === "production" ? "production" : "development";
console.log("process.env.NODE_ENV:::::" + process.env.NODE_ENV + environment);

module.exports = (env, options) => {
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve("dist"),
            filename: "map-application/js/bundle.js",
            publicPath: "/"
        },
        devtool: "inline-source-map",
        resolve: {
            extensions: [".js", ".jsx"]
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader",
                    query: {
                        presets: ["react", "es2015", "stage-2"]
                    }
                },

                {
                    test: /\.css$/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader"
                        }
                    ]
                },

                { test: /\.(gif|jpg|svg)$/, use: ["file-loader"] },
                { test: /\.png$/, use: ["url-loader?mimetype=image/png"] }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "index.html",
                inject: "body"
            }),
            new CopyWebpackPlugin([
                {
                    from: "./static"
                }
            ])
        ],
        devServer: {
            historyApiFallback: true
        }
    };
};
