import shop from '../api/shop'
const state = () => ({
    items: [],
    checkoutStatus: null
})
const mutations = {
    pushProductToCart (state, { id, path, title, price }){
        state.items.push({
            id,
            path,
            title,
            price: price || 0,
            quantity: 1
        })
    },
    incrementItemQuantity (state, { id }){
        const cartItem = state.items.find(items => items.id === id)
        cartItem.quantity++
    },
    setCartItems (state, { items }){
        state.items = items
    },
    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
}
const getters = {
    cartProducts: (state) => {
        // return state.items.map(({id, quantity}) => {
        //     const product = rootState.products.all.find(product => product.id === id)//检查库存
        //     return {
        //         title: product.title,
        //         price: product.price,
        //         quantity
        //     }
        // })
        return state.items
    },
    buySatus: (state) => {
        return state.buySatus
    },
    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return (total*1000 + product.price*1000*product.quantity)/1000
        }, 0)
    }
}
const actions = {
    checkout({commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        commit('setCartItems', {items: []})
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successfull'),
            () => {
                commit('setCheckoutStatus', 'faild')
                commit('setCartItems', { items: savedCartItems})
            }
        )
    },
    addProductToCart({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        //deleted： 判断库存
        const cartItem = state.items.find(items => items.id === product.id)
        if (!cartItem) {
            commit('pushProductToCart', { id: product.id, path: product.path[0], title: product.trade_title, price: product.price})
        }else {
            commit('incrementItemQuantity', cartItem)
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}