import TsPaths from 'tsconfig-paths-webpack-plugin'
import { Configuration } from 'webpack'

import Base from './base'
import { SRC_DIR, LIB_DIR, resolve } from './config/path'
import { BuildStyle } from './config/style'

// plugins
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const Config: Configuration = {
    ...Base,
    mode: 'production',
    entry: SRC_DIR,
    output: {
        path: LIB_DIR,
        clean: true,
        filename: 'index.js',
        sourceMapFilename: 'source_maps/[file].map',
        library: {
            name: '@00-team/react-alert',
            type: 'umd',
            umdNamedDefine: true,
        },
    },
    module: { rules: [...Base.module!.rules!, BuildStyle] },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-transition-group': 'react-transition-group',
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        ...Base.resolve!,
        plugins: [
            new TsPaths({ configFile: resolve(SRC_DIR, 'tsconfig.json') }),
        ],
    },
    optimization: {
        minimize: true,
        emitOnErrors: false,
    },
}

export default Config
