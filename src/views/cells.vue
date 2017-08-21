<style scoped>

</style>
<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <label>Cell ID: </label>
            <input v-model="filterId" size="10" />
    
            <label>Peer ID: </label>
            <input v-model="filterPeerId" size="10" />
    
            <label>Store: </label>
            <input v-model="filterStore" size="10" />
    
            <label>Key: </label>
            <input v-model="filterKey" size="10" />
        </div>
        <div class="panel-body">
            <div class="row">
                <div v-for="c in filterCells" :key="c.meta.id" class="col-xs-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <label>ID: </label>
                            <span>{{c.meta.id}}</span>
    
                            <label>Leader: </label>
                            <a href="#" @click="toStore(c.leader.storeID)">
                                <span>Peer
                                    <{{c.leader.id}}> on Store
                                        <{{c.leader.storeID}}>
                                </span>
                            </a>
                        </div>
    
                        <div class="panel-body">
                            <table width="100%" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Peer</th>
                                        <th>Store</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
    
                                <tbody>
                                    <tr v-for="p in c.meta.peers" :key="p.id">
                                        <td>{{p.id}}</td>
                                        <td>
                                            <a href="#" @click="toStore(p.storeID)">Store
                                                <{{p.storeID}}>
                                            </a>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary btn-xs" @click="getOperator(c.meta.id)">Operator</button>
                                            <button v-if="p.id != c.leader.id" type="button" class="btn btn-warning btn-xs" @click="transferLeader(c.meta.id, p.id)">Leader</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['elasticellCfg', 'cells'],

    data() {
        return {
            filterKey: "",
            filterId: "",
            filterStore: "",
            filterPeerId: "",

            app: {},
        }
    },

    created() {
        this.app = this.$parent.$parent
    },

    computed: {
        filterCells() {
            return this.filter(this.cells || [])
        }
    },

    methods: {
        filter(values) {
            var shows = []
            for (var i = 0; i < values.length; i++) {
                var e = values[i];

                if (this.filterByKey(e) &&
                    this.filterById(e) &&
                    this.filterByStore(e) &&
                    this.filterByPeerId(e)) {
                    shows.push(e)
                }
            }

            return shows
        },
        
        filterByPeerId(value) {
            if (!this.filterPeerId) {
                return true
            }

            for (var i = 0; i < value.meta.peers.length; i++) {
                if (this.filterPeerId == value.meta.peers[i].id) {
                    return true
                }
            }

            return false
        },

        filterByStore(value) {
            if (!this.filterStore) {
                return true
            }

            for (var i = 0; i < value.meta.peers.length; i++) {
                if (this.filterStore == value.meta.peers[i].storeID) {
                    return true
                }
            }

            return false
        },

        filterById(value) {
            return this.filterId == "" || value.meta.id == this.filterId
        },

        filterByKey(value) {
            if (this.filterKey == "") {
                return true
            }

            return (!value.meta.start || value.meta.start <= this.filterKey) &&
                (!value.meta.end || value.meta.end > this.filterKey)
        },


        toStore(id) {
            this.$router.replace("/stores/" + id)
        },

        loadCells() {
            var that = this
            this.$http.get(this.elasticellCfg.cellsAPI()).then(response => {
                if (response.body.code != 0) {
                    that.app.alertError(response.body.error)
                    return
                }

                that.cells = response.body.value
            }, response => {
                that.app.alertError(response)
            })
        },

        getOperator(cellId) {
            var that = this

            this.$http.get(this.elasticellCfg.operatorAPI(cellId)).then(response => {
                if (response.body.code != 0) {
                    that.app.alertError(response.body.error)
                    return
                }

                that.app.alertSuccess(response.body.value || "none")
            }, response => {
                that.app.alertError(response)
            })
        },

        transferLeader(cellId, peerId) {
            var that = this
            var fn = function () {
                that.doTransferLeader(cellId, peerId)
            }

            this.app.alertConfirm("Transfer leader", "", fn)
        },

        doTransferLeader(cellId, peerId) {
            var that = this

            this.$http.put(this.elasticellCfg.transferLeaderAPI(cellId), {
                cellId: cellId,
                toPeerId: peerId
            }).then(response => {
                if (response.body.code != 0) {
                    that.app.alertError(response.body.error)
                    return
                }

                that.loadCells()
            }, response => {
                that.app.alertError(response)
            })
        }
    }
}
</script>
