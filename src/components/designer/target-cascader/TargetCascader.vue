<template>
    <div class="target-cascader-container">
        <el-cascader ref="addressCascader" :options="targetOptions" v-model="data.target" placeholder="请选择链接" :show-all-levels="false" clearable></el-cascader>
    </div>
</template>

<script>

    export default {
        name: 'TargetCascader',
        props: ['data'],
        data() {
            return {
                targetOptions: [
                    {
                        value: 'functionPage',
                        label: '功能页面',
                        children: [
                            {
                                value: '/',
                                label: '首页'
                            },
                            {
                                value: '/category',
                                label: '全部商品'
                            },
                            {
                                value: '/cart',
                                label: '购物车'
                            },
                            {
                                value: '/my',
                                label: '个人中心'
                            },
                            {
                                value: '/coupon',
                                label: '优惠券'
                            }
                        ]
                    },
                    {
                        value: 'decorationPage',
                        label: '装修页面',
                        children: [
                            {
                                value: '/1',
                                label: '自定义 1'
                            },
                            {
                                value: '/2',
                                label: '自定义 2'
                            },
                            {
                                value: '/3',
                                label: '自定义 3'
                            }
                        ]
                    }
                ]
            };
        }
    };
</script>

<style lang="scss" scoped>
    .target-cascader-container {

    }
</style>
