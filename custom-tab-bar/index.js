Component({
    data: {
        active: 0,
        list: [{
                url: 'pages/home/index',
                label: '首页',
                icon: 'home',
            },
            {
                url: 'pages/application/index',
                label: '应用',
                icon: 'app',
            },
            {
                url: 'pages/chat/index',
                label: '聊天',
                icon: 'chat',
            },
            {
                url: 'pages/center/index',
                label: '我的',
                icon: 'user',
            },
        ],
    },
    methods: {
        onChange(e) {
            wx.switchTab({
                url: `/${this.data.list[e.detail.value].url}`,
            });
        },
        init() {
            const page = getCurrentPages().pop();
            const route = page ? page.route.split('?')[0] : '';
            const active = this.data.list.findIndex(
                (item) =>
                item.url === route
            );
            this.setData({
                active
            });
        },
    },
});