<template>
    <div class="navigation-container" :style="mainStyle">
        <van-row type="flex" :gutter="data.imagePadding" v-if="data.list">
            <van-col :style="{width:`${100 / data.list.length}%`}" v-for="item in data.list">
                <div ref="image" class="item-image" v-ratio="1">
                    <van-image v-if="item.image" :src="item.image" fit="cover" width="100%" height="100%" :style="imageStyle"></van-image>
                    <van-image v-else :src="require('../../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
                </div>

                <div class="navigation-remarks van-ellipsis" v-if="item.name" :style="remarksStyle">
                    <span>{{item.name}}</span>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        props: ['data'],
        computed: {
            mainStyle() {
                return {
                    background: this.data.backgroundColor,
                    padding: `0 ${this.data.navigationPadding}px`
                };
            },
            imageStyle() {
                return {
                    borderRadius: `${this.data.borderRadius}px`,
                    overflow: 'hidden'
                };
            },
            remarksStyle() {
                return {
                    color: this.data.nameColor
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .navigation-container {
        .van-row {
            .van-col {
                .item-image {
                    transition: all 0.3s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        .navigation-remarks {
            text-align: center;
            font-size: 12px;
            padding: 10px 0;
        }
    }
</style>
