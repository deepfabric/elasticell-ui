<style scoped>

</style>
<template>
    <Menu :active-name="currentNav" :open-names="openNav" theme="dark" width="auto">
        <div class="layout-logo-left">
            <!-- <h2>
                        Elasticell Dashboard
                    </h2> -->
        </div>
    
        <template v-for="nav in navs">
            <Submenu v-if="nav.children" :name="nav.name" :key="nav.name">
                <template slot="title">
                    <Icon :type="nav.icon" size="20"></Icon>
                    {{nav.text}}
                </template>
    
                <router-link v-for="sub in nav.children" :to="sub.path" :key="sub.name">
                    <Menu-item :name="sub.name">
                        {{sub.text}}
                    </Menu-item>
                </router-link>
            </Submenu>
    
            <router-link v-if="!nav.children" :to="nav.path" :key="nav.name">
                <Menu-item v-if="!nav.children" :name="nav.name">
                    <Icon :type="nav.icon" size="20"></Icon>
                    <span>{{nav.text}}</span>
                </Menu-item>
            </router-link>
        </template>
    </Menu>
</template>
<script>
export default {
    props: ['navs', 'openNav', 'currentNav']
}
</script>