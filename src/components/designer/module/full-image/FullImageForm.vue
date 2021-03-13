<template>
    <div class="full-image-form-container">
        <div class="form-title">
            <span>全幅图片</span>
        </div>

        <div class="form-main">
            <el-form ref="form" :model="current" :rules="rules" label-width="auto" size="small">
                <el-form-item label="图片" prop="image">
                    <SelectImage :image="current.image" :limit="1" :size="80" @set-name="setFullImage"></SelectImage>
                </el-form-item>
                <el-form-item label="图片边距" prop="imagePadding">
                    <el-slider v-model="current.imagePadding" :max="30" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
                <el-form-item label="圆角大小" prop="borderRadius">
                    <el-slider v-model="current.borderRadius" show-input :show-input-controls="false"></el-slider>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import SelectImage from '../../../../components/upload/SelectImage';
    import {mapState} from 'vuex';

    export default {
        name: 'FullImageForm',
        components: {
            SelectImage
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '全幅图片',
                    component: 'Image',
                    sort: 0,
                    image: '',
                    imagePadding: 0,
                    borderRadius: 0
                }
            };
        },
        created() {
            this.initForm(this.current, this.form);
        },
        methods: {
            setFullImage(value) {
                this.current.image = value;
            }
        },
        computed: {
            ...mapState(['current']),
            rules() {
                return {
                    image: [
                        {required: true, message: '请上传图片', trigger: 'change'}
                    ]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .full-image-form-container {

    }
</style>
