<template>
    <div class="goods-dialog-container">
        <el-dialog title="商品列表" :model-value="modelValue" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-table ref="table" :data="goodsList" row-key="id" @selection-change="selectionChange" @row-click="rowClick" max-height="400px">
                <el-table-column type="selection" reserve-selection align="center"></el-table-column>
                <el-table-column prop="name" label="商品名" min-width="220" align="center"></el-table-column>
                <el-table-column prop="price" label="价格" min-width="160" align="center" :formatter="priceFormatter"></el-table-column>
            </el-table>

            <template #footer>
                <el-space :size="10">
                    <el-button size="medium" @click="cancelForm">取消</el-button>
                    <el-badge :value="currentGoodsList.length" :hidden="!currentGoodsList.length">
                        <el-button type="primary" size="medium" @click="confirmForm" :disabled="!currentGoodsList.length">确认</el-button>
                    </el-badge>
                </el-space>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'GoodsDialog',
        props: ['modelValue', 'data', 'type'],
        data() {
            return {
                goodsList: [],
                currentGoodsList: []
            };
        },
        methods: {
            getGoodsList() {
                this.goodsList = [
                    {
                        'id': 1,
                        'name': '顶致奶茶',
                        'price': 880,
                        'image': require('@/assets/image/placeimg1.jpg'),
                        'remarks': '这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦'
                    },
                    {
                        'id': 2,
                        'name': '奥妙深层洁净洗衣液',
                        'price': 1550,
                        'image': require('@/assets/image/placeimg2.jpg'),
                        'remarks': '这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦'
                    },
                    {
                        'id': 3,
                        'name': '蓝月亮自然清香洗衣液 1KG',
                        'price': 1890,
                        'image': require('@/assets/image/placeimg3.jpg'),
                        'remarks': '这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦'
                    },
                    {

                        'id': 4,
                        'name': '悠悠棉花糖',
                        'price': 500,
                        'image': require('@/assets/image/placeimg1.jpg'),
                        'remarks': '很大'
                    },
                    {
                        'id': 5,
                        'name': '卫新薰衣草洗衣液3kg',
                        'price': 1560,
                        'image': require('@/assets/image/placeimg2.jpg'),
                        'remarks': '这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦'
                    },
                    {
                        'id': 6,
                        'name': '统一阿萨姆奶茶500ml',
                        'price': 450,
                        'image': require('@/assets/image/placeimg3.jpg'),
                        'remarks': '这是一款超好喝的奶茶，建议摆在显眼的位置，多上架一些。'
                    },
                    {
                        'id': 7,
                        'name': '清扬运动薄荷洗发水 175g',
                        'price': 1550,
                        'image': require('@/assets/image/placeimg1.jpg'),
                        'remarks': '这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦这是一个描述啦啦啦'
                    }
                ];
            },
            selectionChange(value) {
                this.currentGoodsList = value;
            },
            rowClick(row, column, event) {
                // 单击可多选
                this.$refs.table.toggleRowSelection(row);
            },
            cancelForm() {
                this.$refs.table.clearSelection();
                this.$emit('update:modelValue', false);
            },
            confirmForm() {
                this.$emit('get-data', this.currentGoodsList);
                this.cancelForm();
            }
        },
        watch: {
            modelValue() {
                if (this.modelValue) {
                    this.getGoodsList();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .goods-dialog-container {
        ::v-deep(.el-table) {
            td, th {
                padding: 8px 0;
            }
        }
    }
</style>
