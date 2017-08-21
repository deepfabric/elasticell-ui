<style scoped>

</style>
<template>
    <app-cells :cells="cells" :elasticellCfg="elasticellCfg" @refresh="loadCells"></app-cells>
</template>
<script>
import AppCells from './cells.vue'

export default {
    props: ['elasticellCfg'],

    components: {
        "app-cells": AppCells
    },

    created() {
        this.$parent.updateViewTitle("Cell List")
        this.loadCells()
    },

    computed: {

    },

    data() {
        return {
            cells: []
        }
    },

    methods: {
        loadCells() {
            var that = this
            this.$http.get(this.elasticellCfg.cellsAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.cells = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        }
    }
}
</script>
