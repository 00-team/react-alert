import TsPaths from 'tsconfig-paths-webpack-plugin'
import { Configuration } from 'webpack'

import Base from './base'
import { LIB_DIR, resolve, SRC_DIR } from './config/path'
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
