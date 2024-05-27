/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = (phase, { defaultConfig }) => {
    const config = {
        reactStrictMode: true,
        swcMinify: true,
        poweredByHeader: false,
        compiler: {
            removeConsole: phase !== PHASE_DEVELOPMENT_SERVER,
        },
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack"],
            });
            return config;
        },
        images: {
            unoptimized: true,
        },
        async rewrites() {
            return [
                {
                    source: `/api/:path*`,
                    destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
                },
            ];
        },
    };
    return withBundleAnalyzer(config);
};
