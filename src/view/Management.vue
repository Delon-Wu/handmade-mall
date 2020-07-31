<template>
    <div class="management">
        <b-list-group @click="goTo" >
            <b-list-group-item button 
                v-for="(menuItem, index) 
                of menus" :data-index="index" 
                :key="index"
                :active="menuItem.active"
                :disabled="menuItem.disabled"
            >
                {{menuItem.title}}
            </b-list-group-item>
        </b-list-group>
        <main class="main-body">
            <router-view></router-view>
        </main>
    </div>
</template>
<script>
export default {
    name: 'Management',
    data() {
        return {
            menus: [
                {
                    title: '统计',
                    routeName: 'Statistics',
                    active: false,
                    disabled: false
                },
                {
                    title: '上传新品',
                    routeName: 'Upload',
                    active: false,
                    disabled: false
                },
                {
                    title: '订单',
                    routeName: 'Orders',
                    active: false,
                    disabled: false
                },
                {
                    title: '物流',
                    routeName: 'Logistics',
                    active: false,
                    disabled: true
                },
            ]
        }
    },
    created() {
        let currentPage = this.$route.name
        for(let i = 0; i< this.menus.length; i++){
            if(this.menus[i].routeName == currentPage){
                this.menus[i].active = true
            }
        }
    },
    methods: {
        goTo(e) {
            //用事件代理方法
             if (e.target.nodeName.toLowerCase() === 'button') {
                this.inActiveAll()
                const index = e.target.dataset.index
                let routeName = this.menus[index].routeName
                this.$router.push({name: routeName})
                this.menus[index].active = true
          }
        },
        inActiveAll() {
            this.menus.forEach((item)=> item.active = false)
        }
    }
}
</script>
<style scoped>
.management{
    width:100%;
    height: 100%;
    display: flex;
}
.list-group{
    width: 25%;
    height: 100%;
    background-color: #fff;
}
.main-body{
    width: 75%;
    color: #fff;
    margin: 10px 10px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>