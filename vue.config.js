module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/log_up_or_in': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/log_in': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/log_out': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/upload': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/get_goods_list': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/post_oders': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/get_oders': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            }
        }
    }
}