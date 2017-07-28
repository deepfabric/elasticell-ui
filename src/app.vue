<style scoped>
@import 'styles/common.css';
</style>
<template>
    <div class="layout">
        <Row style="height: 100%;">
            <Col span="4" class="layout-menu-left">
                <app-nav :navs="navs" :openNav="openNav" :currentNav="currentNav"></app-nav>
            </Col>
    
            <Col span="20" class="layout-main-right">
                <div class="layout-header"></div>
        
                <div class="layout-breadcrumb">
                    <app-breadcrumb :breadcrumbs="breadcrumbs" :currentBreadcrumb="currentBreadcrumb"></app-breadcrumb>
                </div>
        
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import AppNav from './views/nav.vue'
import AppBreadcrumb from './views/breadcrumb.vue'

export default {
    components: {
        "app-nav": AppNav,
        "app-breadcrumb": AppBreadcrumb
    },

    data() {
        return {
            navs: [
                {
                    name: "index",
                    text: "Index",
                    icon: "home",
                    path: "/"
                },
                {
                    name: "store",
                    text: "Store",
                    icon: "cloud",
                    children: [
                        {
                            name: "store-list",
                            text: "List",
                            path: "/store"
                        },
                        {
                            name: "store-create",
                            text: "Create",
                            path: "/store/create"
                        }
                    ]
                },
                {
                    name: "cell",
                    text: "Cell",
                    icon: "grid",
                    children: [
                        {
                            name: "cell-list",
                            text: "List",
                            path: "/cell"
                        }
                    ]
                }
            ],
            openNav: ["store"],
            currentNav: "store-create",

            breadcrumbs: [],
            currentBreadcrumb: "",
        }
    },

    methods: {
        updateBreadcrumb(items, currentBreadcrumb) {
            this.breadcrumbs = items
            this.currentBreadcrumb = currentBreadcrumb
        },

        updateNav(openNav, currentNav) {
            this.openNav = openNav
            this.currentNav = currentNav
        }
    }
}
</script>
