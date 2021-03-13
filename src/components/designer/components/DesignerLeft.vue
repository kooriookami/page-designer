<template>
    <div class="designer-left-container">
        <draggable tag="el-row" :list="moduleList" item-key="title" :group="group" :sort="false" :animation="150" :clone="cloneComponent">
            <template #item="{element}">
                <el-col class="drag-item" :span="12">
                    <DragItem :data="element"></DragItem>
                </el-col>
            </template>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import DragItem from '../drag/DragItem';

    export default {
        name: 'DesignerLeft',
        components: {
            draggable,
            DragItem
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
    }
</style>
