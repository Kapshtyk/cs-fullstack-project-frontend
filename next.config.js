const path = require("path");
const nextEnv = require("@next/env");

const { loadEnvConfig } = nextEnv;

loadEnvConfig("./", process.env.NODE_ENV);

module.exports = {
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app/styles")],
    prependData: `@use "sass:color";
                  @import "_normalize.scss";
                  @import "_mixins.scss";
                  @import "_media.scss";
                  @import "_variables.scss";
                  @import "_utils.scss";
                  @import "_globals.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5169",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`,
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
