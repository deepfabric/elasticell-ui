const routers = [
    {
        path: '/',
        meta: {
            title: 'index'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },

    {
        path: '/store',
        meta: {
            title: 'Elasticell Store List'
        },
        component: (resolve) => require(['./views/store-list.vue'], resolve)
    }
];
export default routers;