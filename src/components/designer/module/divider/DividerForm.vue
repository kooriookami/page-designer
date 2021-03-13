<template>
    <div class="divider-form-container">
        <div class="form-title">
            <span>辅助分割</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="分割样式" prop="lineStyle">
                    <el-radio-group v-model="current.lineStyle">
                        <el-radio-button label="solid">实线</el-radio-button>
                        <el-radio-button label="dashed">虚线</el-radio-button>
                        <el-radio-button label="dotted">点线</el-radio-button>
                        <el-radio-button label="">留白</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="辅助线粗细" prop="lineWidth">
                    <el-slider v-model="current.lineWidth" :min="1" :max="10" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="左右边距" prop="linePadding">
                    <el-slider v-model="current.linePadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="分割高度" prop="height">
                    <el-slider v-model="current.height" :min="10" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="辅助线颜色" prop="lineColor">
                    <el-color-picker v-model="current.lineColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色" prop="backgroundColor">
                    <el-color-picker v-model="current.backgroundColor"></el-color-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'DividerForm',
        data() {
            return {
                form: {
                    id: '',
                    title: '辅助分割',
                    component: 'Divider',
                    sort: 0,
                    lineStyle: 'solid',
                    lineWidth: 2,
                    linePadding: 15,
                    height: 30,
                    lineColor: '#c0c4cc',
                    backgroundColor: ''
                }
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {};
            }
        }
    };
</script>

<style lang="scss" scoped>
    .divider-form-container {

    }
</style>
