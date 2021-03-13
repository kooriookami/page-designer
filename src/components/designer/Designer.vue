<template>
    <div class="designer-container">
        <el-header>
            <DesignerHeader></DesignerHeader>
        </el-header>

        <el-container>
            <el-aside class="left-aside" width="200px">
                <el-scrollbar>
                    <DesignerLeft></DesignerLeft>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar ref="main-scrollbar">
                    <DesignerMain></DesignerMain>
                </el-scrollbar>
            </el-main>
            <el-aside class="right-aside" width="400px">
                <el-scrollbar>
                    <DesignerRight></DesignerRight>
                </el-scrollbar>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import DesignerHeader from './components/DesignerHeader';
    import DesignerLeft from './components/DesignerLeft';
    import DesignerMain from './components/DesignerMain';
    import DesignerRight from './components/DesignerRight';
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: 'Designer',
        components: {
            DesignerHeader,
            DesignerLeft,
            DesignerMain,
            DesignerRight
        },
        data() {
            return {
                scrollTimer: ''
            };
        },
        unmounted() {
            clearInterval(this.scrollTimer);
        },
        methods: {
            ...mapMutations(['setScrollId', 'setStatus', 'setPageInfo', 'setComponents', 'setStoreId'])
        },
        computed: {
            ...mapState(['scrollId', 'status', 'pageInfo'])
        },
        watch: {
            scrollId() {
                if (this.scrollId) {
                    clearInterval(this.scrollTimer);
                    let temp = 1;  // 每次滚动的像素
                    let newTop = document.getElementById(this.scrollId).offsetTop - 80;
                    let oldTop = this.$refs['main-scrollbar'].wrap.scrollTop;
                    this.scrollTimer = setInterval(() => {
                        if (Math.abs(newTop - oldTop) - temp > 0) {
                            oldTop = this.$refs['main-scrollbar'].wrap.scrollTop = oldTop + Math.sign(newTop - oldTop) * temp;
                            temp++;
                        } else {
                            this.$refs['main-scrollbar'].wrap.scrollTop = newTop;
                            clearInterval(this.scrollTimer);
                            this.setScrollId('');
                        }
                    }, 17);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .designer-container {
        .el-header {
            border-bottom: 1px solid #dcdfe6;
        }

        .el-container {
            height: calc(100vh - 60px);

            .left-aside {
                border-right: 1px solid #dcdfe6;
            }

            .el-main {
                padding: 0;
                background: whitesmoke;
            }

            .right-aside {
                border-left: 1px solid #dcdfe6;
            }
        }
    }
</style>
