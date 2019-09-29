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
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'));
    }
};
