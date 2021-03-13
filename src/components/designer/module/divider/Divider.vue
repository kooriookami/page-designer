<template>
    <div class="divider-container" :style="mainStyle">
        <div class="line" :style="lineStyle"></div>
    </div>
</template>

<script>
    export default {
        name: 'Divider',
        props: ['data'],
        computed: {
            mainStyle() {
                return {
                    height: `${this.data.height}px`,
                    background: this.data.backgroundColor
                };
            },
            lineStyle() {
                return {
                    margin: `0 ${this.data.linePadding}px`,
                    borderStyle: this.data.lineStyle,
                    borderColor: this.data.lineColor,
                    borderWidth: `${this.data.lineWidth}px 0 0 0`
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .divider-container {
        display: flex;
        align-items: center;

        .line {
            flex-grow: 1;
            border-width: 1px 0 0 0;
        }
    }
</style>
