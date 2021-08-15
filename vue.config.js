//参考文档：https://cli.vuejs.org/zh/config

module.exports = {
    
    filenameHashing: process.env.VUE_APP_FILENAME_HASHING !== undefined 
    ? process.env.VUE_APP_FILENAME_HASHING
    :false
    ,    
    // publicPath:process.env.NODE_ENV === 'production'    
    // ? '/vue-dist'
    // : '/',
    publicPath:process.env.VUE_APP_PUBLIC_PATH !== undefined 
    ?process.env.VUE_APP_PUBLIC_PATH
    :'/'
    ,    
    productionSourceMap:false,
    outputDir: process.env.OUTPUT_DIR !== undefined
    ? process.env.OUTPUT_DIR
    : 'dist',

      // 删除 HTML 相关的 webpack 插件
    chainWebpack: config => {
        config.plugins.delete('html')
        //config.plugins.delete('preload')
        //config.plugins.delete('prefetch')
    },
    
    pages: {

        tweets: {
            // entry for the page
            entry: "src/pages/tweets/main.js",
            // the source template
            // template: "src/pages/tweets/tweets.html",            
            template: "public/hicms.html",

            // output as dist/index.html
            filename: "index.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Tweets Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common","tweets"]
        },
        lightbox: {
            // entry for the page
            entry: "src/pages/lightbox/main.js",
            // the source template
            // template: "src/pages/tweets/tweets.html",            
            template: "public/index-old.html",

            // output as dist/index.html
            filename: "lightbox.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Lightbox Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common","lightbox"]
        },
        logout: {
            // entry for the page
            entry: "src/pages/logout/main.js",
            // the source template
            // template: "src/pages/tweets/tweets.html",            
            template: "public/simple.html",

            // output as dist/index.html
            filename: "logout.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Logout Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common","logout"]
        },
        


        indexOld: {
            // entry for the page
            entry: "src/pages/index/main.js",
            // the source template
            template: "public/index-with-d-css.html",
            // output as dist/index.html
            filename: "index-old.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common", "indexOld"]
        },
        task: {
            // entry for the page
            entry: "src/pages/task/main.js",
            // the source template
            template: "src/pages/task/task.html",
            // output as dist/index.html
            filename: "task.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Task Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common", "task"]
        },
        
        modal: {
            
            entry: "src/pages/modal/main.js",
            
            template: "public/hicms.html",
            
            filename: "modal.html",

            title: "Modal",
            
            chunks: ["chunk-vendors", "chunk-common","modal"]
        },

    }
};