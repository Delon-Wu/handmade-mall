import axios from 'axios'
export default {
    buyProducts (products, callback, errCallback) {
        axios.post('/submit_oders', products).then((res)=>{
            res.data.code == '3000' ? callback() : errCallback()
        })
    }
}