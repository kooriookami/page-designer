<template>
    <div class="drag-item-container">
        <div class="item-main">
            <div class="item-icon">
                <van-icon :class-prefix="`fal ${data.icon}`" size="24"></van-icon>
            </div>
            <div class="item-title">
                <span>{{data.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DragItem',
        props: ['data']
    };
</script>

<style lang="scss" scoped>
    .drag-item-container {
        .item-main {
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-size: 12px;
            cursor: move;

            .item-title {
                margin-top: 10px;
            }

            &:hover {
                background: $primary-color;
                color: white;
            }
        }
    }
</style>
