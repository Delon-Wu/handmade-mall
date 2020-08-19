const state = () => ({
    messages: [],
    messagesList:[]
})
const getters = {
    allMessage (state){
        return state.messages
    },
    allMessagesList (state) {
        return state.messagesList
    }
}
const mutations = {
    setMessage(state, { isSelf = true, message }) {
        state.messages.push({
            isSelf: isSelf,
            message: message
        })
    },
    setMessagesList(state, messageData) {
        if(messageData.id){//如果带id，那就是顾客发的信息
            let sessionId = state.messagesList.findIndex( item => item.id == messageData.id)
            if(sessionId != -1){
                if(!state.messagesList[sessionId].active){
                    state.messagesList[sessionId].readStatus++
                }
                state.messagesList[sessionId].messagesHistory.push({isSelf: false,message: messageData.message})
            }else{
                state.messagesList.push({
                    id: messageData.id,
                    readStatus: 1,
                    messagesHistory: [{isSelf: false, message: messageData.message}],
                    nickName: messageData.nickName,
                    active:false
                })
            }
        }else {
            //收到店长自己发的信息
            let sessionId = state.messagesList.findIndex( item => item.id == messageData.to)
            if(sessionId != -1){
                state.messagesList[sessionId].messagesHistory.push({isSelf: true,message: messageData.message})
            }
        }
    },
    setActive(state, index) {
        state.messagesList.forEach(element => {
            element.active = false
        });
        state.messagesList[index].active = true
        state.messagesList[index].readStatus = 0
    }
}
export default{
    namespaced: true,
    state,
    getters,
    mutations
}