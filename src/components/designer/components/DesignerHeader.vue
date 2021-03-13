<template>
    <div class="designer-header-container">
        <div class="header-left">
            <el-button class="collapse-icon" type="text" @click="setCollapse">
                <i class="fal fa-arrow-to-left" :style="collapseIconStyle"></i>
            </el-button>
        </div>

        <div class="header-right">
            <el-space :size="10">
                <i class="fab fa-github" @click="toGithub"></i>
                <el-button plain @click="preview" size="medium">预览</el-button>
                <el-button type="primary" @click="submit" size="medium">提交</el-button>
            </el-space>

            <PreviewPage :pageInfo="pageInfo" :components="components" v-model="showPreview"></PreviewPage>
        </div>
    </div>
</template>

<script>
    import PreviewPage from './components/PreviewPage';
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: 'DesignerHeader',
        components: {
            PreviewPage
        },
        data() {
            return {
                previewDialog: false,
                showPreview: false
            };
        },
        methods: {
            ...mapMutations(['setScrollId', 'setCurrent', 'setValidateKey', 'setCollapse']),
            toGithub() {
                open('https://github.com/kooriookami/page-designer');
            },
            preview() {
                this.validateAll().then(() => {
                    this.showPreview = true;
                });
            },
            closePreview() {
                this.showPreview = false;
            },
            submit() {
                this.validateAll().then(() => {
                    let components = this.$_.cloneDeep(this.components);
                    components.forEach(value => {
                        if (value.component === 'Goods') {
                            // 删除goods详情
                            value.list.forEach(item => {
                                item.data = null;
                            });
                        }
                        if (value.component === 'RichText') {
                            //  转base64
                            value.content = value.content.toBase64();
                        }
                    });
                    this.pageInfo.components = components;
                    console.log(JSON.stringify(this.pageInfo));
                    this.$message.success('请在控制台查看数据');
                });
            },
            validateAll() {
                // 先校验pageInfo
                return this.validateForm(this.pageInfo, this.formRules.Page).then(() => {
                    // 递归校验再校验components
                    if (this.components.length) {
                        return this.recursiveValidate();
                    } else {
                        this.$message.error('请添加组件');
                        throw new Error();
                    }
                }).catch(({errors, fields}) => {
                    if (errors?.length) {
                        this.setCurrent(this.pageInfo);
                        this.setScrollId('pageInfo');
                        this.$message.error(errors[0].message);
                        this.setValidateKey();
                    }
                    throw new Error();
                });
            },
            // 递归校验
            recursiveValidate(index = 0) {
                let component = this.components[index];
                return this.validateForm(component, this.formRules[component.component]).then(() => {
                    if (index < this.components.length - 1) {
                        return this.recursiveValidate(index + 1);
                    }
                }).catch(({errors, fields}) => {
                    if (errors?.length) {
                        this.setCurrent(component);
                        this.setScrollId(component.id);
                        this.$message.error(errors[0].message);
                        this.setValidateKey();
                    }
                    throw new Error();
                });
            }
        },
        computed: {
            ...mapState(['components', 'pageInfo', 'collapse']),
            collapseIconStyle() {
                return {
                    transform: this.collapse ? 'rotate(180deg)' : ''
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .designer-header-container {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-left {
            .collapse-icon {
                font-size: 24px;

                i {
                    transition: all 0.3s;
                }
            }
        }

        .header-right {
            i {
                font-size: 24px;
                cursor: pointer;

                &:hover {
                    color: $primary-color
                }
            }
        }
    }
</style>
