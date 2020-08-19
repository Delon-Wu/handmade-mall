<template>
    <div class="communications d-flex">
        <b-list-group style="min-width: 300px;" class="text-dark" @click="chatTo">
            <b-list-group-item class="d-flex align-items-center" 
              button
              v-for="(item, index) in allMessagesList"
              :active="item.active"
              :data-index="index"
              :key="index"
            >
                <b-avatar class="mr-3" size="1.5em" variant="dark" :text="item.nickName.charAt(0)"></b-avatar>
                <span class="mr-auto">{{item.nickName}}</span>
                <b-badge variant="danger">{{item.readStatus}}</b-badge>
            </b-list-group-item>
        </b-list-group>
        <div id="chat-dashboard" class="text-dark">
            <header>{{theClient}}</header>
            <main id="messages-dashboard">
                <ul id="messages-list">
                    <li v-for="(item, index) in theChatRecords.messagesHistory" :key="index">
                        <div v-if="item.isSelf" class="d-flex justify-content-end align-items-start">
                        <p class="text-align-left padding-right-near">
                            <span class="text-gray text-align-right" style="font-size:8px;display:block;">我</span>
                            {{item.message}}
                        </p>
                        <b-avatar size="2em" variant="light" class="flex-shrink-0"></b-avatar>
                        </div>
                        <div v-else class="d-flex justify-content-start align-items-start">
                        <b-avatar size="2em" variant="light" class="flex-shrink-0"></b-avatar>
                        <p class="text-align-left padding-left-near">
                            <span class="text-gray text-align-left" style="font-size:8px;display:block;">{{theClient}}</span>
                            {{item.message}}
                        </p>
                        </div>
                    </li>
                </ul>
            </main>
            <footer>
                <b-form>
                    <b-form-textarea
                        id="textarea-no-resize"
                        placeholder="请输入"
                        rows="3"
                        no-resize
                        v-model="messageToSend.message"
                        trim
                        @keydown.enter="sendMessage"
                    ></b-form-textarea>
                    <b-container>
                        <b-button class="float-right" pill variant="light" size="sm" @click="sendMessage">发送</b-button>
                    </b-container>
                </b-form>
            </footer>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations} from 'vuex'
export default {
    name: 'Communications',
    data() {
        return {
            theClient: '',
            messageToSend:{
                to: undefined,
                message: ''
            }
        }
    },
    computed: {
        ...mapGetters('chat', [
            'allMessagesList',
            'theChatRecords'
        ]),
        theChatRecords() {
            if(this.allMessagesList != []){
                let messagesData = this.allMessagesList.find( item => item.active == true)
                return messagesData == undefined ? [] : messagesData
            }else{  
                return []
            }
        }
    },
    methods: {
        ...mapMutations('chat', [
            'setMessagesList',
            'setActive'
        ]),
        chatTo(e) {
            //用事件代理方法
            if (e.target.nodeName.toLowerCase() === 'button') {
                this.messagesList = []
                const index = e.target.dataset.index
                this.setActive(index)
                this.theClient = this.allMessagesList[index].nickName
                this.messageToSend.to = this.allMessagesList[index].id
                // this.messagesList = [...this.allMessagesList[index].messagesHistory]
            }
        },
        sendMessage() {
            this.$socket.emit('chat message', this.messageToSend)
            this.setMessagesList(this.messageToSend)
            this.messageToSend.message = ''
        }
    }
}
</script>
<style scoped>
.communications{
    min-width: 500px;
    height: 100%;
    border-radius: 0.25rem;
    background-color: #fff;
}
.communications div{
    display: inline-block;
}
#messages-list{
  width: 100%;
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.text-align-right{
  text-align: right;
  font-size:12px;
}
.text-align-left{
  text-align: left;
  font-size:12px;
  word-break: break-word;
}
#chat-dashboard{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    border-left: 1px solid rgba(0, 0, 0, .1);
}
#chat-dashboard header{
    text-align: center;
    line-height: 3em;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}
#messages-dashboard{
    height: 100%;
    overflow-y: auto;
    padding-top: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}
#textarea-no-resize,#textarea-no-resize:focus{
    border: none;
    box-shadow: none;
}
.padding-right-near{
    padding-right: 0.5em;
}
.padding-left-near{
    padding-left: 0.5em;
}
</style>