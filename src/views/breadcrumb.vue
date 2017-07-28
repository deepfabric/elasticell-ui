<style scoped>

</style>
<template>
    <Breadcrumb>
        <Breadcrumb-item v-for="item in breadcrumbs" :href="item.path" :key="item.path">
            {{item.text}}
        </Breadcrumb-item>

        <Breadcrumb-item>{{currentBreadcrumb}}</Breadcrumb-item>
    </Breadcrumb>
</template>
<script>
export default {
    props: ['breadcrumbs', 'currentBreadcrumb']
}
</script>