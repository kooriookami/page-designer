<template>
    <div class="swipe-form-container">
        <div class="form-title">
            <span>图片广告</span>
            <span class="form-remarks">最多添加 10 个广告</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <draggable v-model="current.list" item-key="sort" group="swipeItem" :animation="150"
                           filter=".el-input" :preventOnFilter="false" @change="changeSwipeItem">
                    <template #item="{element,index}">
                        <div class="form-item" :key="index">
                            <div class="form-item-left">
                                <el-form-item label-width="0" :prop="`list.${index}.image`" :rules="rules.list.image">
                                    <SelectImage :image="element.image" :limit="1" :size="80"
                                                 @set-name="value=>setSwipeItemImage(element,index,value)"></SelectImage>
                                </el-form-item>
                            </div>

                            <div class="form-item-right">
                                <el-form-item label="标题" :prop="`list.${index}.name`">
                                    <el-input v-model="element.name" placeholder="请输入标题"></el-input>
                                </el-form-item>
                                <el-form-item label="链接" :prop="`list.${index}.target`">
                                    <TargetCascader :data="element"></TargetCascader>
                                </el-form-item>
                            </div>

                            <van-icon class="form-item-delete" name="clear" size="18"
                                      v-if="current.list && current.list.length > 1" @click="deleteSwipeItem(element)"></van-icon>
                        </div>
                    </template>
                </draggable>
                <el-form-item label-width="0">
                    <el-button style="width: 100%" v-if="current.list && current.list.length < 10" plain @click="addSwipeItem">添加广告</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import SelectImage from '../../../../components/upload/SelectImage';
    import TargetCascader from '../../target-cascader/TargetCascader';
    import draggable from 'vuedraggable';

    export default {
        name: 'SwipeForm',
        components: {
            SelectImage,
            TargetCascader,
            draggable
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '图片广告',
                    component: 'Swipe',
                    sort: 0,
                    list: [
                        {
                            name: '',
                            target: [],
                            targetName: '',
                            image: '',
                            sort: 0
                        }
                    ]
                }
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        methods: {
            changeSwipeItem() {
                // 排序
                this.sortList(this.current.list);
            },
            addSwipeItem() {
                this.current.list.push({
                    type: '',
                    name: '',
                    target: [],
                    targetName: '',
                    image: '',
                    sort: 0
                });
                // 排序
                this.sortList(this.current.list);
            },
            setSwipeItemImage(item, index, value) {
                item.image = value;
                this.$refs.form.validateField(`list.${index}.image`);
            },
            deleteSwipeItem(item) {
                this.current.list = this.current.list.filter(value => value !== item);
                // 排序
                this.sortList(this.current.list);
            }
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {
                    list: {
                        image: [
                            {required: true, message: '请上传图片', trigger: 'change'}
                        ]
                    }
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .swipe-form-container {

    }
</style>
