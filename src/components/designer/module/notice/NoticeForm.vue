<template>
    <div class="notice-form-container">
        <div class="form-title">
            <span>公告</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="公告" prop="notice">
                    <el-input v-model="current.notice" placeholder="请输入公告"></el-input>
                </el-form-item>
                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="current.backgroundColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字颜色" prop="fontColor">
                    <el-color-picker v-model="current.fontColor"></el-color-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'NoticeForm',
        data() {
            return {
                form: {
                    id: '',
                    title: '公告',
                    component: 'Notice',
                    sort: 0,
                    notice: '',
                    backgroundColor: '#fffbe8',
                    fontColor: '#ff6600'
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
                    notice: [
                        {required: true, message: '请输入公告', trigger: 'blur'}
                    ]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .notice-form-container {

    }
</style>
