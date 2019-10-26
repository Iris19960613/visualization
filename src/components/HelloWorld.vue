<template>
    <div class="content">
        {{ msg }}
        <vue-images
            :imgs="imageList"
            :modalclose="modalclose"
            :keyinput="keyinput"
            :mousescroll="mousescroll"
            :showclosebutton="showclosebutton"
            :showcaption="showcaption"
            :imagecountseparator="imagecountseparator"
            :showimagecount="showimagecount"
            :showthumbnails="showthumbnails"
            class="image-item">
        </vue-images>
    </div>
</template>

<script>
import vueImages from 'vue-images';
// import axios from 'axios';

export default {
    name: 'HelloWorld',
    components: {
        vueImages: vueImages
    },
    data () {
        return {
            msg: '嘻嘻潘学长你好呀',
            imageList: [],
            // 弹出层的样式选择
            modalclose: true,
            keyinput: true,
            mousescroll: true,
            showclosebutton: true,
            showcaption: true,
            imagecountseparator: 'of',
            showimagecount: true,
            showthumbnails: true
        };
    },
    mounted () {
        console.log('页面加载');
        this.getImages();
    },
    methods: {
        getImages() {
            // let result = this.axios.get('https://www.daoyuanketang.com/daoyuan/api/frames/dou-practice-swiper');
            return new Promise((resolve, reject) => {
                this.axios.get('/api/koubei/list').then(res => {
                    if (!res || res.status !== 200) {
                        reject(res);
                    }
                    else {
                        resolve(res);
                        console.log('res.data.rows', res.data.rows);
                        this.imageList = res.data.rows.map(function(item) {
                            item.imageUrl = item.imgUrl;
                            item.caption = item.desc;
                            return item;
                        });
                        console.log(this.imageList);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
</style>
