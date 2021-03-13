<template>
    <div class="rich-text-form-container">
        <div class="form-title">
            <span>富文本</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label-width="0" prop="content">
                    <QuillEditor v-model="current.content" @blur="$refs.form.validateField('content')"></QuillEditor>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="current.backgroundColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="页面边距" prop="textPadding">
                    <el-slider v-model="current.textPadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import QuillEditor from '../../../quill-editor/QuillEditor';
    import {mapState} from 'vuex';

    export default {
        name: 'RichTextForm',
        components: {
            QuillEditor
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '富文本',
                    component: 'RichText',
                    sort: 0,
                    backgroundColor: '',
                    textPadding: 15,
                    content: ''
                }
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {
                    content: [
                        {required: true, message: '请输入富文本', trigger: 'blur'}
                    ]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .rich-text-form-container {

    }
</style>
