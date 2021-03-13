<template>
    <div class="list-style-container">
        <van-row type="flex" :gutter="10" v-if="list?.length">
            <!--大图模式-->
            <van-col class="clear-margin-1" :span="24" v-if="type==='big'" v-for="(item,index) in list" :key="index">
                <component :is="component" :raw="raw" :item="item" :type="type"></component>
            </van-col>
            <!--一行两个-->
            <van-col class="clear-margin-2" :span="12" v-if="type==='medium'" v-for="(item,index) in list" :key="index">
                <component :is="component" :raw="raw" :item="item" :type="type"></component>
            </van-col>
            <!--一行三个-->
            <van-col class="clear-margin-3" :span="8" v-if="type==='small'" v-for="(item,index) in list" :key="index">
                <component :is="component" :raw="raw" :item="item" :type="type"></component>
            </van-col>
            <!--列表-->
            <van-col class="clear-margin-1" :span="24" v-if="type==='list'" v-for="(item,index) in list" :key="index">
                <component :is="component" :raw="raw" :item="item" :type="type"></component>
            </van-col>
            <!--一大两小-->
            <van-col :class="{'clear-margin-2':list.length % 3===0,'clear-margin-1':list.length % 3!==0}"
                     :span="(index % 3 === 0) ? 24 : 12" v-if="type==='hybrid'" v-for="(item,index) in list" :key="index">
                <component :is="component" :raw="raw" :item="item" :type="type"></component>
            </van-col>
        </van-row>
        <!--空时-->
        <div class="empty-list" v-else>
            <van-image :src="require('../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
        </div>
    </div>
</template>

<script>
    import GoodsItem from '../goods/GoodsItem';

    export default {
        name: 'ListStyle',
        props: ['type', 'raw', 'list', 'component'],   // type和list都是raw的属性，为了命名统一单独拆出来
        components: {
            GoodsItem
        }
    };
</script>

<style lang="scss" scoped>
    .list-style-container {
        .van-row {
            flex-wrap: wrap;

            .van-col {
                margin-bottom: 10px;
            }

            .clear-margin-1 {
                &:nth-last-child(-n+1) {
                    margin-bottom: 0;
                }
            }

            .clear-margin-2 {
                &:nth-last-child(-n+2) {
                    margin-bottom: 0;
                }
            }

            .clear-margin-3 {
                &:nth-last-child(-n+3) {
                    margin-bottom: 0;
                }
            }
        }

        .empty-list {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
