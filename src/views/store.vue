<style scoped>

</style>
<template>
    <div>
        <div class="row">
            <div class="col-xs-6">
                <div class="panel " :class='{"panel-default": store.meta.state == 0, "panel-warning": store.meta.state == 1, "panel-danger": store.meta.state == 2}'>
                    <div class="panel-heading">
                        Store({{store.meta.state | storeState}}): {{store.meta.address}}
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                Storage Capacity
                                <span class="pull-right">
                                    <em>{{store.status.stats.capacity | GB}} GB</em>
                                </span>
                            </div>
    
                            <div class="list-group-item">
                                Storage Available
                                <span class="pull-right">
                                    <em>{{store.status.stats.available | GB}} GB</em>
                                </span>
                            </div>
    
                            <div class="list-group-item">
                                Cell Count
                                <span class="pull-right">
                                    <em>{{store.status.stats.cellCount}}</em>
                                </span>
                            </div>
    
                            <div class="list-group-item">
                                Leader Count
                                <span class="pull-right">
                                    <em>{{store.status.leaderCount}}</em>
                                </span>
                            </div>
    
                            <div class="list-group-item">
                                Start At
                                <span class="pull-right">
                                    <em>{{store.status.stats.startTime | date}}</em>
                                </span>
                            </div>
    
                            <div class="list-group-item">
                                Last Heartbeat At
                                <span class="pull-right">
                                    <em>{{store.status.lastHeartbeatTS | date}}</em>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="panel" :class='{"panel-default": store.meta.state == 0, "panel-warning": store.meta.state == 1, "panel-danger": store.meta.state == 2}'>
                    <div class="panel-heading">
                        Labels
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <div v-for="l in store.meta.lables" :key="l.key" class="list-group-item">
                                {{l.key}}
                                <span class="pull-right">
                                    <em>{{l.value}}</em>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <app-cells :cells="filterCells" :elasticellCfg="elasticellCfg" @refresh="loadCells"></app-cells>
    </div>
</template>
<script>
import AppCells from './cells.vue'

export default {
    props: ['elasticellCfg'],

    components: {
        "app-cells": AppCells
    },

    created() {
        this.id = this.$route.params.id
        this.$parent.updateViewTitle("Store Info")
        this.loadStore()
        this.loadCells()
    },

    computed: {
        filterCells: function () {
            return this.filter(this.cells || [])
        }
    },

    data() {
        return {
            id: null,

            filterLeaders: "",

            store: {
                meta: {},
                status: {
                    stats: {}
                }
            },
            cells: [],
        }
    },

    methods: {
        filter(values) {
            var shows = []
            for (var i = 0; i < values.length; i++) {
                var e = values[i];

                if (this.filterByLeader(e)) {
                    shows.push(e)
                }
            }

            return shows
        },

        filterByLeader(value) {
            return this.filterLeaders == "" || value.leader.storeID == this.store.meta.id
        },

        loadStore() {
            var that = this
            this.$http.get(this.elasticellCfg.storeAPI(this.id)).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.store = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        },

        loadCells() {
            var that = this
            this.$http.get(this.elasticellCfg.storeCellsAPI(this.id)).then(response => {
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
