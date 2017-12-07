const routers = [
    {
        path: '/',
        meta: {
            title: 'index'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/init',
        meta: {
            title: 'Init Elasticell Cluster'
        },
        component: (resolve) => require(['./views/init.vue'], resolve)
    },
    {
        path: '/setting',
        meta: {
            title: 'Setting Elasticell'
        },
        component: (resolve) => require(['./views/setting.vue'], resolve)
    },
    {
        path: '/operators',
        meta: {
            title: 'Elasticell Operator List'
        },
        component: (resolve) => require(['./views/operator-list.vue'], resolve)
    },
    {
        path: '/indices',
        meta: {
            title: 'Elasticell Index Management'
        },
        component: (resolve) => require(['./views/index-mgmt.vue'], resolve)
    },
    {
        path: '/stores',
        meta: {
            title: 'Elasticell Store List'
        },
        component: (resolve) => require(['./views/store-list.vue'], resolve)
    },
    {
        path: '/stores/:id',
        meta: {
            title: 'Elasticell Store Info'
        },
        component: (resolve) => require(['./views/store.vue'], resolve)
    },
    {
        path: '/cells',
        meta: {
            title: 'Elasticell Cell List'
        },
        component: (resolve) => require(['./views/cell-list.vue'], resolve)
    }
];
export default routers;