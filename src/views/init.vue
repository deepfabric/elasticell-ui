<style scoped>

</style>
<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <label>Init Cell Count</label>
                <input class="form-control" type="number" v-model.number="initCellCount">
                <p class="help-block">If the value is large than 1, using the [0, max uint64] to split the key range for cell. Otherwise, use the dictionary order to split cell</p>
            </div>

            <button class="btn btn-primary" @click="init">Init</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Init Elasticell Cluster")
        this.loadSystem()
    },

    data() {
        return {
            initCellCount: 1,
        }
    },

    methods: {
        loadSystem() {
            var that = this
            this.$http.get(this.elasticellCfg.systemAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                if (response.body.value.initParams) {
                    that.initCellCount = response.body.value.initParams.initCellCount
                } 
            }, response => {
                that.$parent.alertError(response)
            })
        },

        init() {
            var that = this
            var api = this.elasticellCfg.systemAPI()
            var data = {
                initCellCount: this.initCellCount
            }

            this.$http.post(api, data).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.$router.replace("/")
            }, response => {
                that.$parent.alertError(response)
            })
        }
    }
}
</script>
