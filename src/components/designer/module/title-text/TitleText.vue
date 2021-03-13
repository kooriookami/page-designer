<template>
    <div class="title-text-container" :style="mainStyle">
        <div :style="nameStyle">
            <span>{{data.name}}</span>
        </div>

        <div v-if="data.remarks" class="text-remark" :style="remarksStyle">
            <span>{{data.remarks}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TitleText',
        props: ['data'],
        computed: {
            mainStyle() {
                return {
                    background: this.data.backgroundColor,
                    textAlign: this.data.position
                };
            },
            nameStyle() {
                return {
                    fontSize: `${this.data.nameSize}px`,
                    fontWeight: this.data.nameBold,
                    color: this.data.nameColor
                };
            },
            remarksStyle() {
                return {
                    fontSize: `${this.data.remarksSize}px`,
                    fontWeight: this.data.remarksBold,
                    color: this.data.remarksColor
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .title-text-container {
        padding: 15px;

        .text-remark {
            margin-top: 10px;
        }
    }
</style>
