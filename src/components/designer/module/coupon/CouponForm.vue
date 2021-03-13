<template>
    <div class="coupon-form-container">
        <div class="form-title">
            <span>优惠券</span>
            <span class="form-remarks">最多展示 10 个优惠券</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="优惠券边距" prop="couponPadding">
                    <el-slider v-model="current.couponPadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="优惠券颜色" prop="couponColor">
                    <el-color-picker v-model="current.couponColor"></el-color-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'CouponForm',
        data() {
            return {
                form: {
                    id: '',
                    title: '',
                    component: '',
                    sort: 0,
                    couponPadding: 15,
                    couponColor: '#ee0a24'
                }   // form用来初始化值的
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {};
            }
        }
    };
</script>

<style lang="scss" scoped>
    .coupon-form-container {

    }
</style>
