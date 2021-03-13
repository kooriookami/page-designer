<template>
    <div class="designer-main-container">
        <div class="main-screen" :style="mainStyle">
            <div id="pageInfo" @click="selectPageHeader">
                <PageHeader :data="pageInfo"></PageHeader>
            </div>
            <!--拖放区域-->
            <draggable class="put-area" v-model="components" group="component" @add="addComponent" @change="changeComponent"
                       item-key="id" :animation="150" filter=".title-popover,.delete-popover,.copy-popover">
                <template #item="{element}">
                    <div class="component" :id="element.id" :class="{'current-use':element.id === current.id}" @click="setCurrent(element)">
                        <div class="title-popover" @click.stop>
                            <span>{{element.title}}</span>
                        </div>
                        <component :is="element.component" :data="element" :key="element.id"></component>
                        <div class="delete-popover" @click.stop="deleteComponent(element)">
                            <van-icon class-prefix="fal fa-trash-alt" size="16" color="#606266"></van-icon>
                        </div>
                        <div class="copy-popover" @click.stop="copyComponent(element)">
                            <van-icon class-prefix="fal fa-copy" size="16" color="#606266"></van-icon>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>

        <div class="hover-button-group">
            <el-button :plain="current.component!=='Page'" :type="current.component==='Page'?'primary':undefined"
                       size="small" icon="el-icon-mobile-phone" @click="selectPageHeader">页面设置
            </el-button>
            <el-button :plain="current.component!=='Manage'" :type="current.component==='Manage'?'primary':undefined"
                       size="small" icon="el-icon-copy-document" @click="selectManage">组件管理
            </el-button>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import PageHeader from '../module/page/PageHeader';
    import TitleText from '../module/title-text/TitleText';
    import FullImage from '../module/full-image/FullImage';
    import Goods from '../module/goods/Goods';
    import Swipe from '../module/swipe/Swipe';
    import Navigation from '../module/navigation/Navigation';
    import RichText from '../module/rich-text/RichText';
    import Cube from '../module/cube/Cube';
    import Divider from '../module/divider/Divider';
    import Notice from '../module/notice/Notice';
    import Coupon from '../module/coupon/Coupon';
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: 'DesignerMain',
        components: {
            draggable,
            PageHeader,
            TitleText,
            FullImage,
            Goods,
            Swipe,
            Navigation,
            RichText,
            Cube,
            Divider,
            Notice,
            Coupon
        },
        methods: {
            ...mapMutations(['setCurrent', 'setComponents', 'setScrollId']),
            addComponent(e) {
                this.setCurrent(this.components[e.newIndex]);
            },
            changeComponent() {
                // 排序
                this.sortList(this.components);
            },
            selectPageHeader() {
                this.setCurrent(this.pageInfo);
            },
            selectManage() {
                this.setCurrent({
                    component: 'Manage'
                });
            },
            deleteComponent(item) {
                // 如果删除的组件是current，则清空current
                if (item === this.current) {
                    this.setCurrent({});
                }
                this.components = this.components.filter(value => value !== item);
                // 排序
                this.sortList(this.components);
            },
            copyComponent(item) {
                // 深拷贝
                let component = this.$_.cloneDeep(item);
                component.id = this.uuid().replace(/-/g, '');
                this.setCurrent(component);
                this.components.splice(item.sort + 1, 0, component);
                // 排序
                this.sortList(this.components);
                setTimeout(() => {
                    this.setScrollId(component.id);
                });
            }
        },
        computed: {
            ...mapState(['pageInfo', 'current']),
            components: {
                get() {
                    return this.$store.state.components;
                },
                set(value) {
                    this.$store.commit('setComponents', value);
                }
            },
            mainStyle() {
                return {
                    width: `${this.screenWidth}px`,
                    background: this.pageInfo.backgroundColor
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .designer-main-container {
        padding: 40px;

        .component-hover {
            cursor: move;

            &:after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                content: '';
                display: block;
                border: 1px dashed $primary-color;
                z-index: 5;
            }
        }

        .component-use {
            &:after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                content: '';
                display: block;
                border: 2px solid $primary-color;
                z-index: 10;
            }
        }

        .main-screen {
            margin: 0 auto;
            background: #ffffff;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

            .put-area {
                min-height: 700px;

                ::v-deep(.drag-item) {
                    max-width: 100%;
                    float: none;

                    .item-main {
                        display: none;
                    }

                    &:after {
                        display: block;
                        content: '组件放置区域';
                        line-height: 40px;
                        text-align: center;
                        color: white;
                        background: $primary-color;
                    }
                }

                .component {
                    position: relative;
                    user-select: none;

                    .popover {
                        position: absolute;
                        top: 0;
                        background: white;
                        border-radius: 4px;
                        padding: 5px 10px;
                        text-align: center;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                    }

                    .title-popover {
                        @extend .popover;
                        font-size: 12px;
                        width: 80px;
                        left: -85px;
                        cursor: auto;
                    }

                    .delete-popover {
                        @extend .popover;
                        opacity: 0;
                        right: -40px;
                        transition: all 0.3s;
                        cursor: pointer;
                    }

                    .copy-popover {
                        @extend .popover;
                        opacity: 0;
                        right: -80px;
                        transition: all 0.3s;
                        cursor: pointer;
                    }

                    &:hover {
                        @extend .component-hover;

                        .delete-popover, .copy-popover {
                            opacity: 1;
                        }
                    }
                }

                .current-use {
                    @extend .component-use;

                    &:hover {
                        @extend .component-use;
                    }
                }
            }
        }

        .hover-button-group {
            position: fixed;
            top: 140px;
            right: 410px;

            .el-button {
                display: block;
                margin: 0 0 10px;
            }
        }
    }
</style>
