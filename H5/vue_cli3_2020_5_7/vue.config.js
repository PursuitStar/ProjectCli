const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        rootValue: 75, // 新版本的是这个值
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    },
    configureWebpack: (config) => {
        // 生产环境配置
        if (process.env.NODE_ENV === 'production') {
            config.devtool = false;

            config.plugins = [
                ...config.plugins,

                // gzip
                new CompressionWebpackPlugin({
                    test: /\.(js|css|html|png|svg)$/,
                    threshold: 10240,
                    deleteOriginalAssets: false
                })
            ];

            // 关闭webpack性能提示
            config.performance = {
                hints: false
            }
        } else {
            config.devtool = 'inline-source-map';
        }
    }
}