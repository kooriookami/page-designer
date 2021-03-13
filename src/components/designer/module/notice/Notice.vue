<template>
    <div class="notice-container">
        <van-notice-bar :text="data.notice" left-icon="volume-o"
                        :background="data.backgroundColor" :color="data.fontColor"></van-notice-bar>
    </div>
</template>

<script>
    export default {
        name: 'Notice',
        props: ['data']
    };
</script>

<style lang="scss" scoped>
    .notice-container {

    }
</style>
