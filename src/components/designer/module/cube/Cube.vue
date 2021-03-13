<template>
    <div class="cube-container" :style="mainStyle">
        <div ref="cube" class="cube">
            <div class="cube-item cube-selected" v-for="(item,index) in data.list" :key="index" :style="cubeComputedStyle(item.cube)">
                <div class="cube-selected-image">
                    <van-image v-if="item.image" :src="item.image" width="100%" height="100%" fit="cover"></van-image>
                    <van-image v-else :src="require('../../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
                </div>
            </div>
        </div>

        <div class="cube-empty" v-if="!data.list || !data.list.length">
            <van-image :src="require('../../../../assets/image/empty.png')" fit="contain" width="50%" height="50%"></van-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Cube',
        props: ['data'],
        methods: {
            // 计算选择层起始坐标
            startCoordinate(item) {
                let xList = [], yList = [];
                item.forEach(value => {
                    xList.push(value.x);
                    yList.push(value.y);
                });
                return {
                    x: Math.min(...xList),
                    y: Math.min(...yList)
                };
            },
            // 计算选择层结束坐标
            endCoordinate(item) {
                let xList = [], yList = [];
                item.forEach(value => {
                    xList.push(value.x);
                    yList.push(value.y);
                });
                return {
                    x: Math.max(...xList),
                    y: Math.max(...yList)
                };
            },
            // 生成层的宽度
            cubeComputedWidth(item) {
                // 单个item大小 - 多余边框的大小
                let start = this.startCoordinate(item);
                let end = this.endCoordinate(item);
                return (end.x - start.x + 1) * this.cubeItemSize - (end.x - start.x + 2) * this.data.imagePadding;
            },
            // 生成层的高度
            cubeComputedHeight(item) {
                let start = this.startCoordinate(item);
                let end = this.endCoordinate(item);
                return (end.y - start.y + 1) * this.cubeItemSize - (end.y - start.y + 2) * this.data.imagePadding;
            },
            // 生成层的顶部距离
            cubeComputedTop(item) {
                let start = this.startCoordinate(item);
                return (start.y - 1) * this.cubeItemSize - (start.y - 1) * this.data.imagePadding;
            },
            // 生成层的左边距离
            cubeComputedLeft(item) {
                let start = this.startCoordinate(item);
                return (start.x - 1) * this.cubeItemSize - (start.x - 1) * this.data.imagePadding + this.data.cubePadding;
            },
            cubeComputedStyle(item) {
                return {
                    width: `${this.cubeComputedWidth(item)}px`,
                    height: `${this.cubeComputedHeight(item)}px`,
                    top: `${this.cubeComputedTop(item)}px`,
                    left: `${this.cubeComputedLeft(item)}px`
                };
            }
        },
        computed: {
            mainStyle() {
                return {
                    height: `${this.cubeSize}px`
                };
            },
            cubeSize() {
                return this.screenWidth - 2 * this.data.cubePadding;
            },
            cubeItemSize() {
                // 设x为不含两边框的大小，cubeItemSize等于x+2个边框，cube上下左右的四边不计算，独立于页面边距
                // 密度*x+（密度-1）*边框=容器大小
                return (this.cubeSize - (this.data.density - 1) * this.data.imagePadding) / this.data.density + 2 * this.data.imagePadding;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .cube-container {
        .cube {
            position: relative;

            .cube-item {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $info-color;
                cursor: pointer;
            }

            .cube-selected {
                .cube-selected-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .cube-empty {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
