<style scoped>

</style>
<template>
    <div>
        <p>Welcome to your iView app!</p>
        <Button type="ghost" @click="handleStart">Start iView</Button>
    </div>
</template>
<script>
export default {
    created() {
        var app = this.$parent.$parent.$parent

        app.updateBreadcrumb([{
            text: "Index",
            path: "/"
        },
        {
            text: "Index2",
            path: "/hello"
        }], "hello")

        app.updateNav(["index"], "index")
    },

    methods: {
        handleStart() {
            console.log(this.$Modal)
            this.$Modal.info({
                title: 'Bravo',
                content: 'Now, enjoy the convenience of iView.'
            })
        }
    }
}
</script>
