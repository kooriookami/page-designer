<template>
    <div class="page-form-container">
        <div class="form-title">
            <span>页面设置</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="pageInfo" :rules="rules" label-width="auto" size="small">
                <el-form-item label="页面名" prop="name">
                    <el-input v-model="pageInfo.name" placeholder="请输入页面名"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remarks">
                    <el-input type="textarea" :rows="2" v-model="pageInfo.remarks" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="pageInfo.backgroundColor"></el-color-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'PageForm',
        computed: {
            ...mapState(['pageInfo']),
            rules() {
                return {
                    name: [
                        {required: true, message: '请输入页面名', trigger: 'blur'}
                    ]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page-form-container {

    }
</style>
