<template>
    <div class="content">
        <div class="query">
            <div class="query-select">
                <button
                    class="query-select-button"
                    @click="changeCurrent('current','add')"
                >+</button>
                <div class="query-select-message">当前读取的是 {{ current }}.json</div>
                <button
                    class="query-select-button"
                    @click="changeCurrent('current','del')"
                >-</button>
            </div>
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
                <div class="detail-fp-button">
                    <button @click="changeCurrent('fpCurrent','del')">上一页</button>
                    <div class="detail-fp-button-text">第{{ fpCurrent }}页</div>
                    <button @click="changeCurrent('fpCurrent','add')">下一页</button>
                </div>
                <div class="detail-fp-content">
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
            </div>
            <div
                :style="{ 'height': windowHeight + 'px'}"
                class="detail-fp"
            >
                <div class="detail-fp-button">
                    <button @click="changeCurrent('fnCurrent','del')">上一页</button>
                    <div class="detail-fp-button-text">第{{ fnCurrent }}页</div>
                    <button @click="changeCurrent('fnCurrent','add')">下一页</button>
                </div>
                <div class="detail-fp-content">
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
            isVideo: 0,
            // 当前读取json文件
            current: 1,
            // 当前fp页码
            fpCurrent: 1,
            // 当前fn页码
            fnCurrent: 1
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
            this.axios.get(`/static/${this.current}.json`).then((res) => {
                this.query = res.data.query;
                let end = this.query.imageUrl.length - 3;
                if (end > 0 && this.query.imageUrl.lastIndexOf('mp4') === end) {
                    this.isVideo = true;
                }

                // 对当前请求量和总数组长度做对比，从而优化读取到最后一页时点击下一页的提示并禁止继续读取下一页
                if (this.fpCurrent * 9 < res.data.fp.length + 9) {
                    this.fp = res.data.fp.slice(this.fpCurrent * 9 - 9, this.fpCurrent * 9);
                }
                else {
                    if (res.data.fp.length === 0) {
                        this.fp = res.data.fp;
                    }
                    else {
                        alert('已经是最后一页啦~');
                        this.fpCurrent--;
                    }
                }

                if (this.fnCurrent * 9 < res.data.fn.length + 9) {
                    this.fn = res.data.fn.slice(this.fnCurrent * 9 - 9, this.fnCurrent * 9);
                }
                else {
                    if (res.data.fn.length === 0) {
                        this.fn = res.data.fn;
                    }
                    else {
                        alert('已经是最后一页啦~');
                        this.fnCurrent--;
                    }
                }
            }).catch(err => {
                console.log('err', err);
                this.current--;
                alert('没有更多的数据了～');
            });
        },
        changeCurrent(type, method) {
            // 把三个函数整合为一个时，需考虑切换json时另外两个需重置回起始值
            if (type === 'current') {
                this.fpCurrent = 1;
                this.fnCurrent = 1;
            }
            // 判断同样的操作时处理不一样的type，是切换json、fp还是fn
            if (method === 'del') {
                this[type] === 1 ? alert('没有更多的数据了～') : this[type]--; this.getImages();
            }
            else {
                this[type]++;
                this.getImages();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    .query {
        display: flex;
        justify-content: center;
        align-items: center;
        &-select{
            &-button {
                width: 80px;
                height: 40px;
                font-size: 20px;
                border-radius: 10px;
            }
            &-message {
                margin: 15px 0;
                font-weight: bold;
            }
        }
    }
    .detail {
        display: flex;
        &-fp {
            width: 50%;
            border: solid 1px;
            overflow-y: auto;
            overflow-x: hidden;
            &-button {
                display: flex;
                margin: 10px 200px;
                &-text {
                    margin: 0 10px;
                }
            }
            &-content {
                display: flex;
                flex-wrap: wrap;
            }
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
