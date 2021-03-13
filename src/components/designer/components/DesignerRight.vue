<template>
    <div class="designer-right-container">
        <component ref="component" v-if="current.component" :is="current.component + 'Form'" :key="current.id"></component>
    </div>
</template>

<script>
    import PageForm from '../module/page/PageForm';
    import ManageForm from '../module/manage/ManageForm';
    import TitleTextForm from '../module/title-text/TitleTextForm';
    import FullImageForm from '../module/full-image/FullImageForm';
    import GoodsForm from '../module/goods/GoodsForm';
    import SwipeForm from '../module/swipe/SwipeForm';
    import NavigationForm from '../module/navigation/NavigationForm';
    import RichTextForm from '../module/rich-text/RichTextForm';
    import CubeForm from '../module/cube/CubeForm';
    import DividerForm from '../module/divider/DividerForm';
    import NoticeForm from '../module/notice/NoticeForm';
    import CouponForm from '../module/coupon/CouponForm';
    import {mapState} from 'vuex';

    export default {
        name: 'DesignerRight',
        components: {
            PageForm,
            ManageForm,
            TitleTextForm,
            FullImageForm,
            GoodsForm,
            SwipeForm,
            NavigationForm,
            RichTextForm,
            CubeForm,
            DividerForm,
            NoticeForm,
            CouponForm
        },
        computed: {
            ...mapState(['current', 'validateKey'])
        },
        watch: {
            validateKey() {
                setTimeout(() => {
                    if (this.$refs.component.$refs.form) {
                        this.$refs.component.$refs.form.validate();
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .designer-right-container {

    }
</style>
