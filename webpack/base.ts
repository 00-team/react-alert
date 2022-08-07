import { Configuration } from 'webpack'

const Base: Configuration = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
}

export default Base
