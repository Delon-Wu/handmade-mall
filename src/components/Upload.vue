<template>
    <div class="upload">
        <b-overlay
        id="overlay-background"
        :show="isUpLoading"
        variant="dark"
        opacity="0.85"
        spinner-type="grow"
        blur="2px"
        rounded="sm"
        >
            <b-form class="upload-form" @submit="onSubmit" @reset="onReset">
                <b-input-group>
                    <b-input-group-prepend is-text>
                        <b-icon icon="image-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="选择比比要上传的宝贝的照片，可以缩小窗口拖拽文件甩进来哦 :-)"
                    drop-placeholder="深呼吸，松开您的纤纤玉手，wow，棒棒哒~"
                    multiple
                    browse-text="选择1:1图片"
                    accept="image/*"
                    >
                    </b-form-file>
                </b-input-group>
                
                <b-row>
                    <b-col>
                        <b-form-input id="good-title-1" v-model="title" placeholder="输入标题 :-)" maxlength="7"></b-form-input>
                        <b-form-textarea v-model="description" placeholder="输入描述 :-)" maxlength="24"></b-form-textarea>
                    </b-col>
                    <b-col>
                        <b-row id="good-title-2">{{title.length}} / 7</b-row>
                        <b-row id="good-description">{{description.length}} / 24, [13, 24]</b-row>
                    </b-col>
                </b-row>
                <b-row v-show="showImgs">
                    <b-col>
                        <div class="images-container" v-for="(item, index) in imgUrl" :key="index" >
                            <img class="good-image" :src="item">
                        </div>
                    </b-col>
                </b-row>
                <b-button  type="submit" variant="success" :disabled="isValid()">
                    提交
                </b-button>
                <b-button type="reset" variant="danger">重置</b-button>
            </b-form>
        </b-overlay>
    </div>
</template>
<script>
export default {
    name: 'Upload',
    data() {
        return {
            file: null,
            title: '',
            description: '',
            imgUrl: [],
            showImgs: false,
            isUpLoading: false
        }
    },
    watch: {
        file: 'getImgUrl'
    },
    methods: {
        onSubmit(e){
            this.isUpLoading = true
            let context = this
            e.preventDefault()
            let formData = new FormData()
            let index = 0
            context.file.forEach(element => {
                index++
                formData.append(`image_${index}`, element)
            })
            formData.append('title', context.title)
            formData.append('description', context.description)
            context.$axios.post('/upload',formData)
                .then(function(response){
                    console.log('uploadResponse', response)
                    context.isUpLoading = false
                    if(response.data.code == '1000'){  
                        context.$bvToast.toast(response.data.message, {
                            title: '叮~',
                            autoHideDelay: 3000,
                            appendToast: true
                        })
                        context.onReset()
                    }else if(response.data.code == '1004'){
                        context.$bvToast.toast(response.data.message, {
                            title: 'duang~~',
                            autoHideDelay: 3000,
                            appendToast: true
                        })
                    }
                })
                .catch((err)=>{console.log('[uploadErr]', err)})
        },
        onReset() {
            this.file = null
            this.title = ''
            this.description = ''
            this.showImgs = false
        },
        isValid() {
            let isImgValid = this.file == null || this.file.length == 0 || this.file.length > 3
            let isTextValid = this.title == '' || this.description == ''
            return isImgValid || isTextValid
        },
        getImgUrl() {
            let context = this
            console.log(context.file)
            if(context.file && context.file.length){
                context.showImgs = true
                let arr = []
                for(let i = 0; i < 3; i++) {
                    if(context.file[i]){
                        arr.push(window.URL.createObjectURL(context.file[i]))
                    }else{
                        console.log(i)
                        arr.push('')
                    }
                }
                context.imgUrl = arr
            }
            console.log('[context.imgUrl]',context.imgUrl)
            return
        }
    }
}
</script>
<style scoped>
.upload-form{
    text-align: left;
    position: relative;
}
.upload-form>div,#good-title-1{
    margin-bottom: 10px;
}
.upload-form>button,.images-container{
    margin-right: 10px;
}
.images-container{
    display: inline-block;
    width: 180px;
    height: 180px;
    overflow: hidden;
    border-radius: 4px;
    background-color: #fff;
}
#good-title-2,#good-description{
    line-height: 38px;
    margin-bottom: 10px;
    color: rgb(161, 161, 161);
}
.good-image{
    width: 100%;
}
</style>