import axios from 'axios'
export default {
    buyProducts (products, callback, errCallback) {
        axios.post('/api/submit_orders', products).then((res)=>{
            res.data.code == '3000' ? callback() : errCallback()
        })
    }
}