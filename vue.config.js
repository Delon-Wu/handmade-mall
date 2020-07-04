module.exports = {
    devServer: {
        proxy: {
            '/log_up_or_in': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/log_up_or_in': '/log_up_or_in'
                }
            }
        }
    }
}