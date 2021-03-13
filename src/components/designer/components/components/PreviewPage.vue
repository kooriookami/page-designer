<template>
    <div class="preview-page-container">
        <van-overlay :show="modelValue" v-if="modelValue" :z-index="10000">
            <van-icon class="close-icon" name="clear" color="white" size="40" @click="closePreview"></van-icon>
            <div class="preview-page" ondragstart="return false" :style="mainStyle">
                <div>
                    <PageHeader :data="pageInfo"></PageHeader>
                </div>

                <div class="preview-component">
                    <el-scrollbar>
                        <component v-for="item in components" :is="item.component" :data="item" :key="item.id"></component>
                    </el-scrollbar>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import PageHeader from '../../module/page/PageHeader';
    import TitleText from '../../module/title-text/TitleText';
    import FullImage from '../../module/full-image/FullImage';
    import Goods from '../../module/goods/Goods';
    import Swipe from '../../module/swipe/Swipe';
    import Navigation from '../../module/navigation/Navigation';
    import RichText from '../../module/rich-text/RichText';
    import Cube from '../../module/cube/Cube';
    import Divider from '../../module/divider/Divider';
    import Notice from '../../module/notice/Notice';
    import Coupon from '../../module/coupon/Coupon';

    export default {
        name: 'PreviewPage',
        props: ['modelValue', 'pageInfo', 'components'],
        components: {
            PageHeader,
            TitleText,
            FullImage,
            Goods,
            Swipe,
            Navigation,
            RichText,
            Cube,
            Divider,
            Notice,
            Coupon
        },
        methods: {
            closePreview() {
                this.$emit('update:modelValue', false);
            }
        },
        computed: {
            mainStyle() {
                return {
                    width: `${this.screenWidth}px`,
                    background: this.pageInfo.backgroundColor
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .preview-page-container {
        .van-overlay {
            display: flex;
            justify-content: center;
            align-items: center;

            .close-icon {
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
            }

            .preview-page {
                margin: 0 auto;
                background: #ffffff;
                user-select: none;
                box-shadow: 0 2px 12px 0 rgba(255, 255, 255, .1);

                .preview-component {
                    height: 700px;
                    overflow: hidden;
                }
            }
        }
    }
</style>
