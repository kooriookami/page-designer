<template>
    <div class="goods-container" :style="mainStyle">
        <ListStyle :type="data.listStyle" :raw="data" :list="data.list" component="GoodsItem"></ListStyle>
    </div>
</template>

<script>
    import ListStyle from '../../list-style/ListStyle';
    import GoodsItem from '../../goods/GoodsItem';

    export default {
        name: 'Goods',
        props: ['data'],
        components: {
            ListStyle,
            GoodsItem
        },
        computed: {
            mainStyle() {
                return {
                    padding: `0 ${this.data.goodsPadding}px`
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .goods-container {

    }
</style>
