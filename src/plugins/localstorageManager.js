export default store =>{
    if(localStorage.cart){
        store.commit('READ_LOCALCART', JSON.parse(localStorage.cart))
    }
    store.subscribe(mutation => {
        switch (mutation.type){
            case 'UPDATE_CART':
                localStorage.cart = JSON.stringify(store.state.cart)
                break;
            case 'UPDATE_MESSAGE':
                localStorage.messageHistory = JSON.stringify(store.state.chat)
                break;
        }
    })
}