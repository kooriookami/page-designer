<template>
    <div class="swipe-container">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item,index) in data.list" :key="index">
                <div class="swipe-item">
                    <van-image v-if="item.image" :src="item.image" fit="cover" width="100%" height="100%"></van-image>
                    <van-image v-else :src="require('../../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>

                    <div v-if="item.name" class="swipe-item-title">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name: 'Swipe',
        props: ['data']
    };
</script>

<style lang="scss" scoped>
    .swipe-container {
        .van-swipe {
            .van-swipe-item {
                .swipe-item {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .van-image {
                        width: 100%;
                        height: 100%;
                    }

                    .swipe-item-title {
                        position: absolute;
                        background: rgba(0, 0, 0, 0.8);
                        left: 0;
                        right: 0;
                        bottom: 0;
                        padding: 10px;
                        color: white;
                    }
                }
            }
        }
    }
</style>
