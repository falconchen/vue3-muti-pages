module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: "src/pages/index/main.js",
            // the source template
            template: "src/pages/index/index.html",
            // output as dist/index.html
            filename: "index.html",
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ["chunk-vendors", "chunk-common", "index"]
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

    }
};