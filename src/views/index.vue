<style scoped>

</style>
<template>
    <div class="row">
        <div class="col-xs-4">
            <div class="panel" :class="storageClass">
                <div class="panel-heading">
                    Storage Info
                </div>
    
                <div class="panel-body">
                    <div class="list-group">
                        <div class="list-group-item">
                            Capacity
                            <span class="pull-right">
                                <em>{{system.storageCapacity | GB}} GB</em>
                            </span>
                        </div>
                        <div class="list-group-item">
                            Available
                            <span class="pull-right">
                                <em>{{system.storageAvailable | GB}} GB</em>
                            </span>
                        </div>
                        <div class="list-group-item">
                            Available Rate
                            <span class="pull-right">
                                <em>{{availableRate}}%</em>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="col-xs-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Store Info
                </div>
    
                <div class="panel-body">
                    <div class="list-group">
                        <div class="list-group-item">
                            Store Count
    
                            <span class="pull-right">
                                <em>{{system.storeCount}}</em>
                            </span>
                        </div>
    
                        <div class="list-group-item">
                            Offline Store Count
    
                            <span class="pull-right">
                                <em>{{system.offlineStoreCount}}</em>
                            </span>
                        </div>
                        <div class="list-group-item">
                            TombStone Store Count
    
                            <span class="pull-right">
                                <em>{{system.tombStoneStoreCount}}</em>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="col-xs-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Cell Info
                </div>
    
                <div class="panel-body">
                    <div class="list-group">
                        <div class="list-group-item">
                            Cell Count
    
                            <span class="pull-right">
                                <em>{{system.cellCount}}</em>
                            </span>
                        </div>
                        <div class="list-group-item">
                            Missing Replicas Cell Count
    
                            <span class="pull-right">
                                <em>{{system.replicasNotFullCellCount}}</em>
                            </span>
                        </div>
    
                        <div class="list-group-item">
                            Scheduler Operator Count
    
                            <span class="pull-right">
                                <em>{{system.operatorCount}}</em>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Util from '../libs/util.js';

export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Elasticell Cluster Summary")
        this.loadSystem()

        setInterval(this.loadSystem, 2000);
    },

    computed: {
        availableRate: function () {
            return parseInt(this.system.storageAvailable / this.system.storageCapacity * 10000) / 100.0
        },

        storageClass: function () {
            return {
                "panel-default": this.availableRate >= 80,
                "panel-warning": this.availableRate < 80 && this.availableRate >= 20,
                "panel-danger": this.availableRate < 20
            }
        }
    },

    data() {
        return {
            system: {}
        }
    },

    methods: {
        loadSystem() {
            var that = this
            this.$http.get(this.elasticellCfg.summaryAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.system = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        }
    }
}
</script>
