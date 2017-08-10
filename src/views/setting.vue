<style scoped>

</style>
<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <label>Elasticell PD Address</label>
                <input class="form-control" v-model="elasticellCfg.host">
                <p class="help-block">For example 127.0.0.1:8080, without the `http://`</p>
            </div>

            <div class="form-group">
                <label>Elasticell PD API Version</label>
                <input class="form-control" v-model="elasticellCfg.apiVersion">
                <p class="help-block">For example v1</p>
            </div>

            <button class="btn btn-primary" @click="setting">Setting</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Setting Elasticell")
    },

    methods: {
        setting() {
            this.$cookie.set(this.elasticellCfg.hostAttr, this.elasticellCfg.host)
            this.$cookie.set(this.elasticellCfg.apiVersionAttr, this.elasticellCfg.apiVersion)

            this.$parent.alertSuccess("Update Elasticell success")
        }
    }
}
</script>
