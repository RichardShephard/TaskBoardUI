const { src, task, watch, context, fuse } = require("fuse-box/sparky");

const {
    FuseBox,
    VueComponentPlugin,
    QuantumPlugin,
    SassPlugin,
    CSSPlugin,
    CSSResourcePlugin,
    WebIndexPlugin,
    Sparky
} = require('fuse-box');

let isProduction = false;

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: './src',
            output: 'dist/$name.js',
            sourceMaps: false,
            debug: true,
            sourceMaps: !isProduction,
            useTypescriptCompiler: true,
            allowSyntheticDefaultImports: true,
            plugins: [
                VueComponentPlugin({
                    style: [
                        SassPlugin({
                            importer: true
                        }),
                        CSSResourcePlugin(),
                        CSSPlugin({
                            group: 'components.css',
                            inject: 'components.css'
                        })
                    ]
                }),
                CSSPlugin(),
                WebIndexPlugin({
                    title: 'TaskBoard | Task Processing and Handling Board',
                    template: './src/index.html'
                }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: 'app',
                    uglify: true,
                    treeshake: true
                }),
            ]
        });
    }
});

Sparky.task('set-production-state', () => isProduction = true);
Sparky.task('clean', () => Sparky.src('./dist').clean('dist/'));

Sparky.task('watch-assets', () => {});
Sparky.task('copy-assets', () => {});

Sparky.task('bundle', async context => {
    let fuse = context.getConfig();

    if(!isProduction) {
        fuse.dev({
            open: true,
            port: 8080
        });
    }

    const appBundle = fuse.bundle('app').instructions('> index.ts');

    if(!isProduction) {
        appBundle.watch().hmr();
    }

    await fuse.run();
});

Sparky.task('default', ['clean', 'watch-assets', 'bundle'], () => {});

Sparky.task('dist', ['clean', 'set-production-state', 'copy-assets', 'bundle'], () => {});
