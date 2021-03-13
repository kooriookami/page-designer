<template>
    <div class="designer-left-container">
        <draggable tag="el-row" :list="moduleList" item-key="sort" :group="group" :sort="false" :animation="150" :clone="cloneComponent">
            <template #item="{element}">
                <el-col class="drag-item" :span="12">
                    <div class="item-main">
                        <div class="item-icon">
                            <i :class="`fal ${element.icon}`"></i>
                        </div>
                        <div class="item-title">
                            <span>{{element.title}}</span>
                        </div>
                    </div>
                </el-col>
            </template>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {
        name: 'DesignerLeft',
        components: {
            draggable
        },
        data() {
            return {
                group: {
                    name: 'component',
                    pull: 'clone',
                    put: false
                }
            };
        },
        methods: {
            cloneComponent(value) {
                return {
                    id: this.uuid().replace(/-/g, ''),
                    title: value.title,
                    component: value.component,
                    sort: 0
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .designer-left-container {
        padding: 10px;

        .el-row {
            .el-col {
                .item-main {
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                    font-size: 12px;
                    cursor: move;

                    .item-icon {
                        font-size: 24px;
                    }

                    .item-title {
                        margin-top: 10px;
                    }

                    &:hover {
                        background: $primary-color;
                        color: white;
                    }
                }
            }
        }
    }
</style>
