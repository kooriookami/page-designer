<template>
    <div class="goods-item-container">
        <van-row>
            <van-col :span="imageSpan">
                <div v-ratio="1" class="item-image">
                    <van-image :src="item.data?.image" width="100%" height="100%" fit="cover"></van-image>
                    <van-tag v-if="raw.showBadge && raw.badge" class="item-badge" type="danger" mark size="medium">
                        <span>{{raw.badge}}</span>
                    </van-tag>
                </div>
            </van-col>

            <van-col :span="infoSpan">
                <div ref="info" class="item-info">
                    <div>
                        <div class="info-name van-multi-ellipsis--l2" v-if="raw.showName && item.data?.name">
                            <span>{{item.data?.name}}</span>
                        </div>
                        <div class="info-remarks van-ellipsis" v-if="raw.showRemarks && item.data?.remarks">
                            <span>{{item.data?.remarks}}</span>
                        </div>
                    </div>

                    <div class="info-operation" v-if="raw.showPrice || raw.showButton">
                        <div class="info-price" v-if="raw.showPrice">
                            <span class="cny">￥</span>
                            <span>{{(item.data?.price / 100).toFixed(2)}}</span>
                        </div>

                        <div class="info-button" v-if="raw.showButton">
                            <van-icon name="cart-circle-o" color="#F56C6C" size="24"></van-icon>
                        </div>
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: 'GoodsItem',
        props: ['item', 'type', 'raw'],
        data() {
            return {
                imageSpan: '',
                infoSpan: ''
            };
        },
        methods: {
            setItemScale() {
                switch (this.type) {
                    case 'big':
                    case 'medium':
                    case 'small':
                    case 'hybrid':
                        this.imageSpan = 24;
                        this.infoSpan = 24;
                        break;
                    case 'list':
                        this.imageSpan = 8;
                        this.infoSpan = 16;
                        break;
                }
            }
        },
        watch: {
            raw: {
                handler() {
                    this.setItemScale();
                },
                immediate: true,
                deep: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .goods-item-container {
        .item-image {
            transition: all 0.3s;
            position: relative;
            overflow: hidden;

            .item-badge {
                position: absolute;
                top: 10px;
                left: 0;
            }
        }

        .item-info {
            height: 100%;
            padding: 0 10px 10px;
            background: white;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .info-name {
                font-size: 14px;
                margin-top: 10px;
            }

            .info-remarks {
                font-size: 12px;
                margin-top: 10px;
                color: $info-color;
            }

            .info-operation {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: 10px;

                .info-price {
                    flex-grow: 1;
                    font-size: 16px;
                    font-weight: 500;
                    color: $danger-color;

                    .cny {
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
