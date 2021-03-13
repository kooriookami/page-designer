<template>
    <div class="rich-text-container" :style="mainStyle">
        <div class="ql-container ql-snow" v-if="data.content">
            <div class="ql-editor" v-html="data.content"></div>
        </div>
        <div class="empty-text" v-else>
            <van-image :src="require('../../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RichText',
        props: ['data'],
        computed: {
            mainStyle() {
                return {
                    background: this.data.backgroundColor,
                    padding: `${this.data.textPadding}px`
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .rich-text-container {
        .ql-container {
            border: none;
            font-size: 14px;

            .ql-editor {
                padding: 0;

                ::v-deep(img) {
                    vertical-align: bottom;
                }
            }
        }

        .empty-text {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
