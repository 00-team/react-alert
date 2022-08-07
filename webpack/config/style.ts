import { RuleSetRule, RuleSetUseItem } from 'webpack'

const STYLE_RE = /\.(css|(s[ac]ss))$/i

const CssLoaders: RuleSetUseItem[] = ['style-loader', 'css-loader']

const SassLoader: RuleSetUseItem = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            includePaths: ['./src/sass'],
        },
    },
}

const DevStyle: RuleSetRule = {
    test: STYLE_RE,
    use: [...CssLoaders, SassLoader],
}
const BuildStyle: RuleSetRule = {
    test: STYLE_RE,
    use: [...CssLoaders, 'postcss-loader', SassLoader],
}

export { DevStyle, BuildStyle }
