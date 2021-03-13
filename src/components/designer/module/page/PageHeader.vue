<template>
    <div class="page-header-container">
        <van-image style="display: flex" :src="require('../../../../assets/image/phone-header.png')" width="100%" height="100%"
                   ondragstart="return false"></van-image>
        <div class="page-title">
            <span>{{data.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageHeader',
        props: ['data']
    };
</script>

<style lang="scss" scoped>
    .page-header-container {
        user-select: none;
        position: relative;
        background: white;
        min-height: 60px;

        .page-title {
            position: absolute;
            top: 36px;
            left: 45px;
            right: 0;
            font-weight: bold;
        }
    }
</style>
