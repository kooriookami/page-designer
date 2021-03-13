<template>
    <div class="coupon-container">
        <div class="coupon-list" :style="listStyle">
            <div class="coupon-item" v-for="(item,index) in 10" :key="index" :style="itemStyle">
                <div class="coupon-amount">
                    <span>100.01</span>
                    <span class="currency">元</span>
                </div>
                <div class="coupon-condition">
                    <span>全部商品可用</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Coupon',
        props: ['data'],
        computed: {
            listStyle() {
                return {
                    padding: `0 ${this.data.couponPadding}px`
                };
            },
            itemStyle() {
                return {
                    background: this.data.couponColor
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .coupon-container {
        .coupon-list {
            white-space: nowrap;
            overflow: hidden;

            .coupon-item {
                display: inline-block;
                vertical-align: top;
                text-align: center;
                margin-right: 10px;
                width: 150px;
                padding: 15px;
                border-radius: 8px;
                overflow: hidden;
                color: white;

                .coupon-amount {
                    font-size: 28px;
                    font-weight: bold;

                    .currency {
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }

                .coupon-condition {
                    margin-top: 5px;
                    font-size: 12px;
                    line-height: 16px;
                    white-space: pre-wrap;
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>
