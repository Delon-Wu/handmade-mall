module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/log_up_or_in': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/log_up_or_in': '/log_up_or_in'
                }
            },
            '/log_in': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/log_in': '/log_in'
                }
            },
            '/log_out': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/log_out': '/log_out'
                }
            },
            '/upload': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/upload': '/upload'
                }
            },
            '/get_goods_list': {
                target: 'http://www.delon.store:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/get_goods_list': '/get_goods_list'
                }
            }
        }
    }
}