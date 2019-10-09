const path = require('path');

module.exports = {
    publicPath: "/",
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/style/_vars.scss";
                    @import "@/style/_deps.scss";
                `
            }
        }
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
};
