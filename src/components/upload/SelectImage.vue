<template>
    <div class="select-image-container">
        <!--图片列表-->
        <div class="image-list">
            <ImageItem class="image-item" :src="image" :size="size" v-for="image in imageList" :disabled="disabled" @delete-image="deleteImage"></ImageItem>
            <!--选择按钮-->
            <div class="card-select image-item" v-if="!imageExceed" @click="clickSelect" :style="cardSelectStyle" :class="{'card-select-disabled':disabled}">
                <i class="el-icon-plus"></i>
            </div>
        </div>

        <ImageManageDialog v-model="imageManageDialog" @set-name="setName" :max="maxImage"></ImageManageDialog>
    </div>
</template>

<script>
    import ImageItem from './ImageItem';
    import ImageManageDialog from '../dialog/ImageManageDialog';

    export default {
        name: 'SelectImage',
        components: {
            ImageItem,
            ImageManageDialog
        },
        props: ['limit', 'image', 'disabled', 'size', 'direct'],
        data() {
            return {
                maxSize: 2 * 1024 * 1024, // 最大文件体积 byte
                defaultLimit: 5,
                defaultSize: 100,
                imageManageDialog: false
            };
        },
        methods: {
            clickSelect() {
                if (this.disabled) {
                    return;
                }
                this.imageManageDialog = true;
            },
            setName(value) {
                this.imageList.push(value);
                this.$emit('set-name', this.imageList.join('|'));
            },
            deleteImage(image) {
                const list = this.imageList.filter(value => value !== image);
                this.$emit('set-name', list.join('|'));
            }
        },
        computed: {
            cardSelectStyle() {
                return {
                    width: `${this.size || this.defaultSize}px`,
                    height: `${this.size || this.defaultSize}px`
                };
            },
            imageList() {
                if (this.image) {
                    return this.image.split('|');
                }
                return [];
            },
            maxImage() {
                return (this.limit || this.defaultLimit) - this.imageList.length;
            },
            // 图片超过数量了
            imageExceed() {
                return this.imageList.length >= (this.limit || this.defaultLimit);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .select-image-container {
        .card-select {
            background: whitesmoke;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: $info-color;
            cursor: pointer;

            &:hover {
                border: 1px solid $primary-color;
            }
        }

        .card-select-disabled {
            cursor: not-allowed;

            &:hover {
                border: none;
            }
        }

        .image-list {
            display: flex;
            flex-wrap: wrap;
            margin-right: -10px;
            margin-bottom: -10px;

            .image-item {
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
    }
</style>
