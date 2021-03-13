<template>
    <div class="image-manage-dialog-container">
        <el-dialog title="图片管理" :model-value="modelValue" width="800px" append-to-body
                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div>
                <span>可选 {{max}} 张</span>
            </div>

            <div class="image-list">
                <div style="margin-top: 20px" v-for="(image,index) in imageList">
                    <ImageItem class="image-item" :src="image" :disabled="true"></ImageItem>
                    <div style="margin-top: 10px">
                        <el-checkbox-group style="max-width: 100px" v-model="currentImageList" :max="max">
                            <el-checkbox :label="image">图片 {{index+1}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

            <PreviewDialog v-model="previewDialog" :src="src"></PreviewDialog>

            <el-empty v-if="!imageList.length" description="暂无图片"></el-empty>

            <template #footer>
                <el-space :size="10">
                    <el-button size="medium" @click="cancelForm">取消</el-button>
                    <el-badge :value="currentImageList.length" :hidden="!currentImageList.length">
                        <el-button type="primary" size="medium" @click="confirmForm" :disabled="!currentImageList.length">确定</el-button>
                    </el-badge>
                </el-space>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import ImageItem from '../upload/ImageItem';
    import PreviewDialog from './PreviewDialog';

    export default {
        name: 'ImageManageDialog',
        props: ['modelValue', 'max'],
        components: {
            ImageItem,
            PreviewDialog
        },
        data() {
            return {
                maxSize: 2 * 1024 * 1024, // 最大文件体积 byte
                src: '',
                imageList: [],
                currentImageList: [],
                size: 10,    //默认10条
                page: 1,    //当前页
                defaultLimit: 10,
                previewDialog: false
            };
        },
        methods: {
            getImageList() {
                this.imageList = [
                    require('@/assets/image/placeimg1.jpg'),
                    require('@/assets/image/placeimg2.jpg'),
                    require('@/assets/image/placeimg3.jpg')
                ];
            },
            cancelForm() {
                this.currentImageList = [];
                this.$emit('update:modelValue', false);
            },
            confirmForm() {
                this.$emit('set-name', this.currentImageList.join('|'));
                this.cancelForm();
            }
        },
        watch: {
            modelValue() {
                if (this.modelValue) {
                    this.getImageList();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-manage-dialog-container, .el-dialog {
        .image-list {
            display: flex;
            flex-wrap: wrap;
            margin-right: -10px;
            margin-bottom: -10px;

            .image-item {
                margin-right: 10px;
            }
        }
    }
</style>
