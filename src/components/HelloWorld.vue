<template>
    <div class="content">
        <div class="query">
            <div class="item">
                <video
                    v-if="isVideo"
                    :src="query.imageUrl"
                    mediatype="video"
                    class="item-video"
                >
                </video>
                <img
                    v-else
                    :src="query.imageUrl"
                    class="item-image"
                />
                <div class="item-text">{{ query.caption }}</div>
            </div>
        </div>
        <div class="detail">
            <div
                :style="{ 'height': windowHeight + 'px' }"
                class="detail-fp"
            >
                <div
                    v-for="(fpItem, fpIndex) in fp"
                    :key="fpIndex"
                    class="item">
                    <video
                        v-if="isVideo"
                        :src="fpItem.imageUrl"
                        mediatype="video"
                        class="item-video"
                    >
                    </video>
                    <img
                        v-else
                        :src="fpItem.imageUrl"
                        class="item-image"
                    />
                    <div class="item-text">{{ fpItem.caption }}</div>
                </div>
            </div>
            <div
                :style="{ 'height': windowHeight + 'px'}"
                class="detail-fp"
            >
                <div
                    v-for="(fnItem, fnIndex) in fn"
                    :key="fnIndex"
                    class="item">
                    <video
                        v-if="isVideo"
                        :src="fnItem.imageUrl"
                        mediatype="video"
                        class="item-video"
                    >
                    </video>
                    <img
                        v-else
                        :src="fnItem.imageUrl"
                        class="item-image"
                    />
                    <div class="item-text">{{ fnItem.caption }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            query: {},
            fp: [],
            fn: [],
            // 获取不同设备屏幕的浏览器高度从而更好地适配滚动效果
            windowHeight: 0,
            // 判断是video还是image
            isVideo: 0
        };
    },
    mounted() {
        this.windowHeight = window.innerHeight - 240;
    },
    async created () {
        await this.getImages();
    },
    methods: {
        getImages() {
            this.axios.get('/static/test.json').then((res) => {
                this.query = res.data.query;
                let end = this.query.imageUrl.length - 3;
                if (end > 0 && this.query.imageUrl.lastIndexOf('mp4') === end) {
                    this.isVideo = true;
                }
                this.fp = res.data.fp;
                this.fn = res.data.fn;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    // text-align: center;
    // height: 100%;
    // overflow: hidden;
    .query {
        text-align: center;
        // padding: 20px 0;
    }
    .detail {
        display: flex;
        &-fp {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 50%;
            border: solid 1px;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
    .item {
        &-image {
            width: 200px;
            height: 200px;
        }
        &-text {
            margin-top: -15px;
            font-weight: bold;
        }
        &-video {
            width: 200px;
            height: 200px;
        }
    }
}

</style>
