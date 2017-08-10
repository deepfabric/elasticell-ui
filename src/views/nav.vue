<style scoped>

</style>
<template>
    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                 <template v-for="nav in navs">
                    <li v-if="!nav.children" :key="nav.name">
                        <a :href="nav.path"><i class="fa fa-fw" :class="nav.icon"></i> {{nav.text}}</a>
                    </li>

                    <li v-if="nav.children" :key="nav.name">
                        <a href="#">
                            <i class="fa fa-fw" :class="nav.icon"></i>
                            {{nav.text}}
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li v-for="sub in nav.children" :key="sub.name">
                                <a :href="sub.path">{{sub.text}}</a>
                            </li>
                        </ul>
                    </li>
                </template> 
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['navs']
}
</script>