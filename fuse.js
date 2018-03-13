const {
    FuseBox,
    VueComponentPlugin,
    WebIndexPlugin,
    SassPlugin,
    CSSResourcePlugin,
    CSSPlugin,
    QuantumPlugin
} = require('fuse-box');

const fuse = FuseBox.init({
    homeDir: 'src',
    target: 'browser@es6',
    output: 'dist/$name.js',
    useTypescriptCompiler : true,
    debug: false,
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
            title: 'TaskBoard | Tasking System Board',
            template: "./src/index.html"
        }),
        [SassPlugin(), CSSResourcePlugin({ dist: 'dist/css-resources' }), CSSPlugin()],
        this.isProduction && QuantumPlugin({
            bakeApiIntoBundle: 'app',
            uglify: true,
            css : { clean : true },
            extendServerImport: true,
            treeshake : true
        })
    ],
    tsConfig: {
        target: "es6",
        strict: true,
        module: "es2015",
        moduleResolution: "node"
    },
    // natives: {
    //     process: false
    // }
});

fuse.dev({
    port: 8080,
    open: true
}); // launch http server
fuse.bundle('app').instructions('> index.ts').hmr().watch();
fuse.run();