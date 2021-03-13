<template>
    <div class="title-text-form-container">
        <div class="form-title">
            <span>标题文本</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="current.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remarks">
                    <el-input type="textarea" :rows="2" v-model="current.remarks" placeholder="请输入描述"></el-input>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="显示位置" prop="position">
                    <el-radio-group v-model="current.position">
                        <el-radio-button label="left">居左</el-radio-button>
                        <el-radio-button label="center">居中</el-radio-button>
                        <el-radio-button label="right">居右</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题大小" prop="nameSize">
                    <el-radio-group v-model="current.nameSize">
                        <el-radio-button :label="16">大</el-radio-button>
                        <el-radio-button :label="14">中</el-radio-button>
                        <el-radio-button :label="12">小</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述大小" prop="remarksSize">
                    <el-radio-group v-model="current.remarksSize">
                        <el-radio-button :label="16">大</el-radio-button>
                        <el-radio-button :label="14">中</el-radio-button>
                        <el-radio-button :label="12">小</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题粗细" prop="nameBold">
                    <el-radio-group v-model="current.nameBold">
                        <el-radio-button label="normal">常规</el-radio-button>
                        <el-radio-button label="bold">加粗</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述粗细" prop="remarksBold">
                    <el-radio-group v-model="current.remarksBold">
                        <el-radio-button label="normal">常规</el-radio-button>
                        <el-radio-button label="bold">加粗</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题颜色" prop="nameColor">
                    <el-color-picker v-model="current.nameColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="描述颜色" prop="remarksColor">
                    <el-color-picker v-model="current.remarksColor"></el-color-picker>
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
        name: 'TitleTextForm',
        data() {
            return {
                form: {
                    id: '',
                    title: '',
                    component: '',
                    sort: 0,
                    name: '',
                    remarks: '',
                    position: 'left',
                    nameSize: 16,
                    remarksSize: 12,
                    nameBold: 'bold',
                    remarksBold: 'normal',
                    nameColor: '#303133',
                    remarksColor: '#969799',
                    backgroundColor: '#ffffff'
                }   // form用来初始化值的
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {
                    name: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .title-text-form-container {

    }
</style>
