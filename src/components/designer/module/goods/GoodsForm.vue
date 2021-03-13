<template>
    <div class="goods-form-container">
        <div class="form-title">
            <span>商品</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <draggable class="goods-draggable" item-key="sort" tag="van-row" v-model="current.list" group="goodsItem" :animation="150" @change="changeGoodsItem">
                    <template #item="{element}">
                        <van-col style="width: 20%">
                            <div class="form-item">
                                <van-image :src="element.data?.image" fit="cover"></van-image>

                                <van-icon class="form-item-delete" name="clear" size="18" @click="deleteGoodsItem(element)"></van-icon>
                            </div>
                        </van-col>
                    </template>
                </draggable>
                <el-form-item label-width="0">
                    <el-button style="width: 100%" plain @click="addGoodsItem">添加商品</el-button>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="列表样式" prop="listStyle">
                    <el-radio-group v-model="current.listStyle">
                        <el-radio-button label="big">大</el-radio-button>
                        <el-radio-button label="medium">中</el-radio-button>
                        <el-radio-button label="small">小</el-radio-button>
                        <el-radio-button label="list">列表</el-radio-button>
                        <el-radio-button label="hybrid">一大两小</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品边距" prop="goodsPadding">
                    <el-slider v-model="current.goodsPadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="商品名" prop="showName">
                    <el-switch v-model="current.showName"></el-switch>
                </el-form-item>
                <el-form-item label="商品描述" prop="showRemarks">
                    <el-switch v-model="current.showRemarks"></el-switch>
                </el-form-item>
                <el-form-item label="商品价格" prop="showPrice">
                    <el-switch v-model="current.showPrice"></el-switch>
                </el-form-item>
                <el-form-item label="购买按钮" prop="showButton">
                    <el-switch v-model="current.showButton"></el-switch>
                </el-form-item>
                <el-form-item label="商品角标" prop="showBadge">
                    <el-switch v-model="current.showBadge"></el-switch>
                </el-form-item>
                <el-form-item label="角标文字" prop="badge" v-if="current.showBadge">
                    <el-input v-model="current.badge" placeholder="请输入角标文字"></el-input>
                </el-form-item>
            </el-form>

            <GoodsDialog v-model="goodsDialog" type="designerGoods" @get-data="setGoodsList"></GoodsDialog>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import GoodsDialog from '../../../../components/dialog/GoodsDialog';
    import {mapState} from 'vuex';

    export default {
        name: 'GoodsForm',
        components: {
            draggable,
            GoodsDialog
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '商品',
                    component: 'Goods',
                    sort: 0,
                    listClass: 'goods',
                    list: [],
                    listStyle: 'medium',
                    goodsPadding: 0,
                    showName: true,
                    showRemarks: true,
                    showPrice: true,
                    showButton: true,
                    showBadge: true,
                    badge: ''
                },
                goodsDialog: false
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        methods: {
            changeGoodsItem() {
                // 排序
                this.sortList(this.current.list);
            },
            addGoodsItem() {
                this.goodsDialog = true;
            },
            setGoodsList(data) {
                data.forEach(value => {
                    this.current.list.push({
                        id: value.id,
                        data: value,
                        sort: 0
                    });
                });
                // 排序
                this.sortList(this.current.list);
            },
            deleteGoodsItem(item) {
                this.current.list = this.current.list.filter(value => value !== item);
                // 排序
                this.sortList(this.current.list);
            }
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
    .goods-form-container {
        .form-item {
            padding: 0 !important;
            width: 60px;
            height: 60px;

            .van-image {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                overflow: hidden;
            }
        }
    }
</style>
