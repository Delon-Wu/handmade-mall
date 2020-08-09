module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/log_up_or_in': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/auth': {
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
            '/submit_orders': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            },
            '/get_orders': {
                target: 'http://www.delon.store:8080/api',
                ws: true,
                changeOrigin: true
            }
        }
    }
}