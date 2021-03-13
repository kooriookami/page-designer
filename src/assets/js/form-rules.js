export default {
    // 大写的原因是json中component是大写
    Page: {
        name: [
            {required: true, message: '请输入页面名'}
        ]
    },
    TitleText: {
        name: [
            {required: true, message: '请输入标题'}
        ]
    },
    FullImage: {
        image: [
            {required: true, message: '请上传图片'}
        ]
    },
    Goods: {
        list: {
            type: 'array', required: true, message: '请添加商品'
        }
    },
    Swipe: {
        list: {
            type: 'array', required: true,
            validator: (rule, value, callback, source) => {
                if (value.length) {
                    value.forEach(item => {
                        if (!item.image) {
                            callback('请上传图片');
                        }
                    });
                    callback();
                } else {
                    callback('请添加广告');
                }
            }
        }
    },
    Navigation: {
        list: {
            type: 'array', required: true,
            validator: (rule, value, callback, source) => {
                if (value.length) {
                    value.forEach(item => {
                        if (!item.image) {
                            callback('请上传图片');
                        }
                        if (!item.target.length) {
                            callback('请选择链接');
                        }
                    });
                    callback();
                } else {
                    callback('请添加导航');
                }
            }
        }
    },
    RichText: {
        content: [
            {required: true, message: '请输入富文本'}
        ]
    },
    Cube: {
        list: {
            type: 'array', required: true,
            validator: (rule, value, callback, source) => {
                let count = 0;
                source.list.forEach(item => {
                    if (item?.cube?.length) {
                        count += item.cube.length;
                    }
                    if (!item.image) {
                        callback('请上传图片');
                    }
                });
                if (count !== source.density ** 2) {
                    callback('请填满魔方');
                }
                callback();
            }
        }
    },
    Divider: {},
    Notice: {
        notice: [
            {required: true, message: '请输入公告'}
        ]
    },
    Coupon: {}
};
