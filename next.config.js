const withCss = require("@zeit/next-css");
const dotenv = require("dotenv");

dotenv.config();

const webpackConfig = (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
        fs: "empty"
    };
    if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [
            (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                    origExternals[0](context, request, callback);
                } else {
                    callback();
                }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];

        config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
        });
    }
    return config;
};

module.exports = withCss({
    webpack: webpackConfig,
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        GRAPHQL_PATH: process.env.GRAPHQL_PATH
    },
});
