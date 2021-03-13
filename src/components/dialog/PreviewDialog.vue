<template>
    <div class="preview-dialog-container">
        <el-dialog title="图片预览" :model-value="modelValue" width="800px" :before-close="closeDialog" append-to-body>
            <div class="preview-image">
                <el-image :src="src"></el-image>
            </div>
            <template #footer>
                <el-button type="primary" size="medium" @click="closeDialog">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'PreviewDialog',
        props: ['modelValue', 'src'],
        methods: {
            closeDialog() {
                this.$emit('update:modelValue', false);
            }
        }
    };
</script>

<style lang="scss">
    // 用了append-to-body，无法在container里
    .preview-image {
        display: flex;
        justify-content: center;
    }
</style>
