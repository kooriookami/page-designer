<template>
    <div class="navigation-form-container">
        <div class="form-title">
            <span>图文导航</span>
            <span class="form-remarks">最多添加 6 个导航</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <draggable v-model="current.list" group="navigationItem" :animation="150" item-key="sort"
                           filter=".el-input" :preventOnFilter="false" @change="changeNavigationItem">
                    <template #item="{element,index}">
                        <div class="form-item" :key="index">
                            <div class="form-item-left">
                                <el-form-item label-width="0" :prop="`list.${index}.image`" :rules="rules.list.image">
                                    <SelectImage :image="element.image" :limit="1" :size="80"
                                                 @set-name="value=>setNavigationItemImage(element,index,value)"></SelectImage>
                                </el-form-item>
                            </div>

                            <div class="form-item-right" style="margin-left: -28px">
                                <el-form-item label="标题" :prop="`list.${index}.name`">
                                    <el-input v-model="element.name" placeholder="请输入标题"></el-input>
                                </el-form-item>
                                <el-form-item label="链接" :prop="`list.${index}.target`" :rules="rules.list.target">
                                    <TargetCascader :data="element"></TargetCascader>
                                </el-form-item>
                            </div>

                            <van-icon class="form-item-delete" name="clear" size="18"
                                      v-if="current.list && current.list.length > 1" @click="deleteNavigationItem(element)"></van-icon>
                        </div>
                    </template>
                </draggable>
                <el-form-item label-width="0">
                    <el-button style="width: 100%" v-if="current.list && current.list.length < 6" plain @click="addNavigationItem">添加导航</el-button>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="导航边距" prop="navigationPadding">
                    <el-slider v-model="current.navigationPadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="图片间距" prop="imagePadding">
                    <el-slider v-model="current.imagePadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="圆角大小" prop="borderRadius">
                    <el-slider v-model="current.borderRadius" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="current.backgroundColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字颜色" prop="nameColor">
                    <el-color-picker v-model="current.nameColor"></el-color-picker>
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
        name: 'NavigationForm',
        components: {
            draggable,
            SelectImage,
            TargetCascader
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '公告',
                    component: 'Navigation',
                    sort: 0,
                    list: [
                        {
                            name: '',
                            target: [],
                            targetName: '',
                            image: '',
                            sort: 0
                        }
                    ],
                    navigationPadding: 15,
                    imagePadding: 10,
                    borderRadius: 8,
                    backgroundColor: '',
                    nameColor: '#303133'
                }
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        methods: {
            changeNavigationItem() {
                // 排序
                this.sortList(this.current.list);
            },
            addNavigationItem() {
                this.current.list.push({
                    name: '',
                    target: [],
                    targetName: '',
                    image: '',
                    sort: 0
                });
                // 排序
                this.sortList(this.current.list);
            },
            setNavigationItemImage(item, index, value) {
                item.image = value;
                this.$refs.form.validateField(`list.${index}.image`);
            },
            deleteNavigationItem(item) {
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
                            {required: true, message: '请选择图片', trigger: 'change'}
                        ],
                        target: [
                            {required: true, message: '请选择链接', trigger: 'change'}
                        ]
                    }
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .navigation-form-container {

    }
</style>
