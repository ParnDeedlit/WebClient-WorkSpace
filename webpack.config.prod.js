const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
// const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');



module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        // new CompressionPlugin(),//gzip压缩
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),//依赖图
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin([
            { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }
        ]),
        new CopyWebpackPlugin([
            { from: path.join(cesiumSource, "Assets"), to: "Assets" }
        ]),
        new CopyWebpackPlugin([
            { from: path.join(cesiumSource, "Widgets"), to: "Widgets" }
        ]),
        new webpack.DefinePlugin({
            //Cesium Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify("")
        })
    ]
});
