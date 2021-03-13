<template>
    <div class="full-image-container" :style="mainStyle">
        <div ref="image" class="full-image" :style="imageStyle">
            <van-image v-if="data.image" :src="data.image" fit="cover" width="100%" height="100%" :style="imageStyle"></van-image>
            <van-image v-else :src="require('@/assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FullImage',
        props: ['data'],
        computed: {
            mainStyle() {
                return {
                    padding: `0 ${this.data.imagePadding}px`
                };
            },
            imageStyle() {
                return {
                    borderRadius: `${this.data.borderRadius}px`
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .full-image-container {
        .full-image {
            display: flex;
            justify-content: center;
            overflow: hidden;
        }
    }
</style>
