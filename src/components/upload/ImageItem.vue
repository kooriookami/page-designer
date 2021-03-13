<template>
    <div class="image-item-container" :style="mainStyle">
        <el-image :src="src" fit="cover"></el-image>
        <div class="image-actions">
            <i class="el-icon-zoom-in" @click="imagePreview"></i>
            <i style="margin-left: 10px" class="el-icon-delete" @click="deleteImage" v-if="!disabled"></i>
        </div>

        <PreviewDialog v-model="previewDialog" :src="src"></PreviewDialog>
    </div>
</template>

<script>
    import PreviewDialog from '../dialog/PreviewDialog';

    export default {
        name: 'ImageItem',
        props: ['src', 'size', 'disabled'],
        components: {
            PreviewDialog
        },
        data() {
            return {
                previewDialog: false,
                defaultSize: 100
            };
        },
        methods: {
            imagePreview() {
                this.previewDialog = true;
            },
            deleteImage() {
                this.$emit('delete-image', this.src);
            }
        },
        computed: {
            mainStyle() {
                return {
                    width: `${this.size || this.defaultSize}px`,
                    height: `${this.size || this.defaultSize}px`
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-item-container {
        display: flex;
        position: relative;

        .el-image {
            width: 100%;
            height: 100%;
            border-radius: 8px;
        }

        .image-actions {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            opacity: 0;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
            color: #ffffff;
            font-size: 20px;

            i {
                cursor: pointer;
            }
        }

        &:hover {
            .image-actions {
                opacity: 1;
            }
        }
    }
</style>
