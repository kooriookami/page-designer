<template>
    <div class="quill-editor-container">
        <div ref="editor"></div>
    </div>
</template>

<script>
    import Quill from 'quill';

    export default {
        name: 'RichTextEditor',
        props: ['modelValue'],
        data() {
            return {
                editor: {}
            };
        },
        mounted() {
            this.initEditor();
        },
        methods: {
            initEditor() {
                let fontSizeStyle = Quill.import('attributors/style/size');
                fontSizeStyle.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px',
                    '28px', '30px', '32px', '36px', '38px', '40px', '48px', '72px', false];
                Quill.register(fontSizeStyle, true);

                let options = {
                    modules: {
                        toolbar: {
                            container: [
                                ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                                [{'color': []}, {'background': []}],  // 字体颜色，字体背景颜色
                                ['blockquote', 'code-block'],  //引用，代码块
                                [{'header': 1}, {'header': 2}],  // 标题，键值对的形式；1、2表示字体大小
                                [{'list': 'ordered'}, {'list': 'bullet'}],  //列表
                                [{'align': []}], //对齐方式
                                [{'size': fontSizeStyle.whitelist}], // 字体大小
                                [{'header': [1, 2, 3, 4, 5, 6, false]}],  //几级标题
                                [{'font': []}],  //字体
                                ['image'] //上传图片、上传视频
                            ]
                        }
                    },
                    theme: 'snow'
                };
                this.editor = new Quill(this.$refs.editor, options);
                if (this.modelValue) {
                    this.editor.pasteHTML(this.modelValue);
                }
                this.editor.on('selection-change', range => {
                    !range ? this.$emit('blur') : this.$emit('focus');
                });
                this.editor.on('text-change', () => {
                    let html = this.$refs.editor.children[0].innerHTML;
                    this.$emit('update:modelValue', html);
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .quill-editor-container {

    }
</style>

<style lang="scss">
    .quill-editor-container {
        .ql-snow .ql-editor {
            min-height: 400px;
            padding: 15px;

            img {
                vertical-align: bottom;
            }
        }

        .ql-snow svg {
            height: 18px;
            width: 18px;
        }

        .ql-toolbar.ql-snow {
            border: 1px solid #dcdfe6;
            padding: 0;
        }

        .ql-container.ql-snow {
            border: 1px solid #dcdfe6;
            font-size: 14px;
        }

        .ql-toolbar.ql-snow .ql-formats {
            margin-right: 0;
        }

        .ql-snow .ql-picker-label {
            display: flex;
        }

        .ql-snow .ql-picker-options .ql-picker-item {
            padding: 0;
        }

        .ql-snow .ql-picker.ql-size {
            width: 80px;
        }

        .ql-snow .ql-picker.ql-header {
            width: 80px;
        }

        .ql-snow .ql-picker.ql-font {
            width: 100px;
        }

        .ql-snow .ql-editor.ql-blank:before {
            content: '请在此输入内容';
        }

        .ql-snow .ql-tooltip[data-mode=link]::before {
            content: "请输入链接地址：";
        }

        .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
            content: '保存';
        }

        .ql-snow .ql-tooltip[data-mode=video]::before {
            content: "请输入视频地址：";
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
            content: '10px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
            content: '12px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
            content: '14px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
            content: '16px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
            content: '18px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
            content: '20px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='22px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='22px']::before {
            content: '22px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
            content: '24px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='26px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='26px']::before {
            content: '26px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='28px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='28px']::before {
            content: '28px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='30px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='30px']::before {
            content: '30px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='32px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='32px']::before {
            content: '32px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='36px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before {
            content: '36px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='38px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='38px']::before {
            content: '38px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='40px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='40px']::before {
            content: '40px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='48px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='48px']::before {
            content: '48px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='72px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='72px']::before {
            content: '72px';
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item::before {
            content: '普通';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item::before {
            content: '文本';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
            content: '标题1';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
            content: '标题2';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
            content: '标题3';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
            content: '标题4';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
            content: '标题5';
        }

        .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
        .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
            content: '标题6';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item::before {
            content: '无衬线体';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
            content: '衬线字体';
        }

        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
            content: '等宽字体';
        }
    }
</style>
