<template>
    <div class="cube-form-container">
        <div class="form-title">
            <span>魔方</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="魔方密度" prop="density">
                    <el-slider v-model="current.density" :min="1" :max="7" show-input :show-input-controls="false"></el-slider>
                </el-form-item>

                <el-form-item label-width="0">
                    <div ref="cube" class="cube" :style="cubeStyle">
                        <div class="cube-item" v-for="(item,index) in (current.density**2||16)" :key="`unselected${index}`"
                             :style="cubeItemStyle(item)" :class="{'cube-item-selecting': isSelecting(itemCoordinate(item))}"
                             @mouseover="hoverCubeItem(item)" @click="clickCubeItem(item)">
                            <van-icon name="plus" size="16" color="#dcdee0"></van-icon>
                        </div>

                        <div class="cube-selected" v-for="(item,index) in current.list" :key="`selected${index}`" :style="cubeComputedStyle(item.cube)"
                             :class="{'current-selected-style':item.cube === currentList.cube}" @click="setCurrentList(item)">
                            <div class="cube-selected-text" v-if="!item.image">
                                <span>区域 {{index+1}}</span>
                            </div>
                            <div class="cube-selected-image" v-if="item.image">
                                <van-image :src="item.image" width="100%" height="100%" fit="cover"></van-image>
                            </div>
                            <van-icon class="cube-selected-delete" name="clear" size="18" @click.stop="deleteCubeSelected(item.cube)"></van-icon>
                        </div>
                    </div>
                </el-form-item>

                <div class="form-item" v-if="Object.keys(currentList).length">
                    <div class="form-item-left">
                        <el-form-item label-width="0">
                            <SelectImage :image="currentList.image" :limit="1" @set-name="setCubeItemImage" :size="80"></SelectImage>
                        </el-form-item>
                    </div>

                    <div class="form-item-right" style="margin-left: -28px">
                        <el-form-item label="链接">
                            <TargetCascader :data="currentList"></TargetCascader>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="图片间距" prop="imagePadding">
                    <el-slider v-model="current.imagePadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="页面边距" prop="cubePadding">
                    <el-slider v-model="current.cubePadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import SelectImage from '../../../../components/upload/SelectImage';
    import TargetCascader from '../../target-cascader/TargetCascader';
    import draggable from 'vuedraggable';
    import {mapState} from 'vuex';

    export default {
        name: 'CubeForm',
        components: {
            draggable,
            SelectImage,
            TargetCascader
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '魔方',
                    component: 'Cube',
                    sort: 0,
                    list: [],
                    density: 4, // 魔方密度
                    imagePadding: 0,
                    cubePadding: 0
                },
                cubeSize: 360,
                cubeBorder: 1,  //  边框宽度
                startCube: {},  // 正在选择的起始单元
                cubeSelectingList: [], // 正在选择的单元（单层数组）
                currentList: {} // 当前选中的list
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        mounted() {
            this.setItemScale();
        },
        methods: {
            setItemScale() {
                setTimeout(() => {
                    this.cubeSize = this.$refs.cube.clientWidth;
                });
            },
            // 获取item坐标
            itemCoordinate(item) {
                return {
                    x: item % this.current.density === 0 ? this.current.density : item % this.current.density,
                    y: Math.ceil(item / this.current.density)
                };
            },
            hoverCubeItem(item) {
                let x = this.itemCoordinate(item).x;
                let y = this.itemCoordinate(item).y;

                if (Object.keys(this.startCube).length) {
                    let start = this.startCoordinate([this.startCube, {x: x, y: y}]);
                    let end = this.endCoordinate([this.startCube, {x: x, y: y}]);
                    let selecting = [];

                    for (let i = start.x; i <= end.x; i++) {
                        for (let j = start.y; j <= end.y; j++) {
                            if (this.isSelected({x: i, y: j})) {
                                return;
                            }
                            selecting.push({x: i, y: j});
                        }
                    }
                    this.cubeSelectingList = selecting;
                }
            },
            clickCubeItem(item) {
                let x = this.itemCoordinate(item).x;
                let y = this.itemCoordinate(item).y;

                if (this.isSelected({x: x, y: y})) {
                    this.$message.error('已经被占用');
                    return;
                }

                if (!Object.keys(this.startCube).length) {
                    this.startCube = {x: x, y: y};
                    this.cubeSelectingList = [this.startCube];
                } else {
                    //获取开始和结束之间所有魔方单元
                    let start = this.startCoordinate([this.startCube, {x: x, y: y}]);
                    let end = this.endCoordinate([this.startCube, {x: x, y: y}]);
                    let selected = [];

                    for (let i = start.x; i <= end.x; i++) {
                        for (let j = start.y; j <= end.y; j++) {
                            if (this.isSelected({x: i, y: j})) {
                                this.$message.error('不能重叠');
                                return;
                            }
                            selected.push({x: i, y: j});
                        }
                    }
                    let list = {
                        cube: selected,
                        image: '',
                        target: [],
                        targetName: '',
                        sort: 0
                    };
                    this.currentList = list;
                    this.current.list.push(list);
                    this.sortList(this.current.list);
                    this.cubeSelectingList = [];
                    this.startCube = {};
                }
            },
            //判断是否正在选择
            isSelecting({x, y}) {
                for (let i = 0; i < this.cubeSelectingList.length; i++) {
                    let coord = this.cubeSelectingList[i];
                    if (coord.x === x && coord.y === y) {
                        return true;
                    }
                }
                return false;
            },
            //判断是否已经选择
            isSelected({x, y}) {
                for (let i = 0; i < this.current.list.length; i++) {
                    let data = this.current.list[i].cube;
                    for (let j = 0; j < data.length; j++) {
                        let coord = data[j];
                        if (coord.x === x && coord.y === y) {
                            return true;
                        }
                    }
                }
                return false;
            },
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
                return (end.x - start.x + 1) * this.cubeItemSize - (end.x - start.x) * this.cubeBorder;
            },
            // 生成层的高度
            cubeComputedHeight(item) {
                let start = this.startCoordinate(item);
                let end = this.endCoordinate(item);
                return (end.y - start.y + 1) * this.cubeItemSize - (end.y - start.y) * this.cubeBorder;
            },
            // 生成层的顶部距离
            cubeComputedTop(item) {
                let start = this.startCoordinate(item);
                return (start.y - 1) * this.cubeItemSize - (start.y - 1) * this.cubeBorder;
            },
            // 生成层的左边距离
            cubeComputedLeft(item) {
                let start = this.startCoordinate(item);
                return (start.x - 1) * this.cubeItemSize - (start.x - 1) * this.cubeBorder;
            },
            cubeItemStyle(item) {
                let coordinate = this.itemCoordinate(item);
                return {
                    width: `${this.cubeComputedWidth([coordinate])}px`,
                    height: `${this.cubeComputedHeight([coordinate])}px`,
                    top: `${this.cubeComputedTop([coordinate])}px`,
                    left: `${this.cubeComputedLeft([coordinate])}px`
                };
            },
            cubeComputedStyle(item) {
                return {
                    width: `${this.cubeComputedWidth(item)}px`,
                    height: `${this.cubeComputedHeight(item)}px`,
                    top: `${this.cubeComputedTop(item)}px`,
                    left: `${this.cubeComputedLeft(item)}px`
                };
            },
            setCurrentList(item) {
                this.currentList = item;
            },
            // 清空魔方
            clearCube() {
                this.startCube = {};
                this.cubeSelectingList = [];
                this.currentList = {};
                this.current.list = [];
            },
            setCubeItemImage(value) {
                this.currentList.image = value;
            },
            deleteCubeSelected(item) {
                this.current.list = this.current.list.filter(value => value.cube !== item);
                this.sortList(this.current.list);
                if (item === this.currentList.cube) {
                    this.currentList = {};
                }
            }
        },
        computed: {
            ...mapState(['current']),
            cubeStyle() {
                return {
                    height: `${this.cubeSize}px`
                };
            },
            cubeItemSize() {
                // 设x为不含两边框的大小，cubeItemSize等于x+2个边框
                // 密度*x+（密度+1）*边框=容器大小
                return (this.cubeSize - (this.current.density + 1) * this.cubeBorder) / this.current.density + 2 * this.cubeBorder;
            },
            rules() {
                return {};
            }
        },
        watch: {
            'current.density'() {
                this.clearCube();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .cube-form-container {
        .cube {
            position: relative;

            .cube-item {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #dcdfe6;
                color: $info-color;
                background: whitesmoke;
                cursor: pointer;
            }

            .cube-item-selecting {
                // 正在选择的方块
                background: lighten($primary-color, 20%);
            }

            .cube-selected {
                @extend .cube-item;
                background-color: white;

                .cube-selected-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                .cube-selected-delete {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    color: #969799;
                    background-color: white;
                    border-radius: 100%;
                    opacity: 0;
                    transition: all 0.3s;
                    z-index: 100;
                    cursor: pointer;
                }

                &:hover {
                    .cube-selected-delete {
                        opacity: 1;
                    }
                }
            }

            .current-selected-style {
                border: 1px solid $primary-color;
                color: $primary-color;
                z-index: 10;
            }
        }
    }
</style>
