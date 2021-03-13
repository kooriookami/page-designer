<template>
    <div class="manage-form-container">
        <div class="form-title">
            <span>组件管理</span>
        </div>

        <div class="form-main">
            <div class="clear-button" v-if="components.length">
                <el-popconfirm title="确认清除组件？" icon="el-icon-error" icon-color="#f56c6c" placement="left" @confirm="clearComponent">
                    <template #reference>
                        <el-button type="text">清除组件</el-button>
                    </template>
                </el-popconfirm>
            </div>

            <draggable class="component-sort" item-key="id" v-model="components" :animation="150" filter=".delete-icon,.copy-icon" @change="changeComponent">
                <template #item="{element}">
                    <div class="form-item" @click="scrollToComponent(element)">
                        <van-icon class-prefix="fal fa-bars" size="16" color="#606266"></van-icon>
                        <span class="component-title">{{element.title}}</span>
                        <el-popconfirm title="确认删除组件？" placement="left" @confirm="deleteComponent(element)">
                            <template #reference>
                                <van-icon class="delete-icon" class-prefix="fal fa-trash-alt" size="16" color="#606266"></van-icon>
                            </template>
                        </el-popconfirm>
                        <van-icon class="copy-icon" class-prefix="fal fa-copy" size="16" color="#606266" @click="copyComponent(element)"></van-icon>
                    </div>
                </template>
            </draggable>

            <el-empty description="暂无组件" v-if="!components.length"></el-empty>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import {mapMutations} from 'vuex';

    export default {
        name: 'ManageForm',
        components: {
            draggable
        },
        methods: {
            ...mapMutations(['setComponents', 'setScrollId', 'setCurrent']),
            scrollToComponent(item) {
                this.setScrollId(item.id);
            },
            changeComponent() {
                // 排序
                this.sortList(this.components);
            },
            // 清空所有
            clearComponent() {
                this.setComponents([]);
            },
            deleteComponent(item) {
                let data = this.components.filter(value => value !== item);
                this.setComponents(data);
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
            components: {
                get() {
                    return this.$store.state.components;
                },
                set(value) {
                    this.$store.commit('setComponents', value);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .manage-form-container {
        .form-main {
            .clear-button {
                display: flex;
                justify-content: flex-end;

                .el-button {
                    padding: 0;
                    min-height: auto;
                }
            }

            .component-sort {
                margin-top: 20px;

                .form-item {
                    display: flex;
                    align-items: center;
                    cursor: move;

                    .component-title {
                        flex-grow: 1;
                        margin: 0 10px;
                    }

                    .delete-icon {
                        cursor: pointer;
                    }

                    .copy-icon {
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>
