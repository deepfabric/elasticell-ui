<style scoped>

</style>
<template>
    <table width="100%" class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Operator</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="opt in opts" :key="opt">
                <td>
                    <pre>{{opt}}</pre>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import Util from '../libs/util.js';

export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Operator List")
        this.loadOpts()
    },

    computed: {
        
    },

    data() {
        return {
            opts: []
        }
    },

    methods: {
        loadOpts() {
            var that = this
            this.$http.get(this.elasticellCfg.operatorsAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.opts = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        }
    }
}
</script>
