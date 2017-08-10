<style scoped>

</style>
<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <label>ID: </label>
            <input v-model="filterId" size="10" />
    
            <label>Address: </label>
            <input type="text" v-model="filterAddress" size="15" />
    
            <label>State: </label>
            <select v-model="filterState">
                <option value="-1">ALL</option>
                <option value="0">UP</option>
                <option value="1">DOWN</option>
                <option value="2">TOMBSTONE</option>
            </select>
    
            <label>Zone: </label>
            <input type="text" v-model="filterZone" size="10" />
    
            <label>Rack: </label>
            <input type="text" v-model="filterRack" size="10" />
        </div>
        <div class="panel-body">
            <table width="100%" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="5%">ID</th>
                        <th width="15%">Address</th>
                        <th width="5%">Cell</th>
                        <th width="5%">Leader</th>
                        <th width="5%">Capacity</th>
                        <th width="5%">Available</th>
                        <th width="15%">Start At</th>
                        <th width="15%">Heartbeat At</th>
                        <th width="10%">Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in showStores" :key="s.meta.id" :class="{warning: s.meta.state == 1, danger: s.meta.state == 2}">
                        <td>
                            <a href="#" @click="toStore(s.meta.id)">
                                {{s.meta.id}}
                            </a>
                        </td>
                        <td>{{s.meta.address}}</td>
                        <td>{{s.status.stats.cellCount}}</td>
                        <td>{{s.status.leaderCount}}</td>
                        <td>{{s.status.stats.capacity | GB}}</td>
                        <td>{{s.status.stats.available | GB}}</td>
                        <td>{{s.status.stats.startTime | date}}</td>
                        <td>{{s.status.lastHeartbeatTS | date}}</td>
                        <td>{{s.meta.state | storeState}}</td>
                        <td>
                            <button type="button" class="btn btn-warning btn-xs" @click="offlineStores(s)">Offline</button>
                            <button type="button" class="btn btn-danger btn-xs" @click="deleteStore(s)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Util from '../libs/util.js';

export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Store List")
        this.loadStores()
    },

    computed: {
        showStores() {
            return this.filter(this.stores || [])
        }
    },

    data() {
        return {
            filterState: -1,
            filterAddress: "",
            filterId: "",
            filterRack: "",
            filterZone: "",

            stores: []
        }
    },

    methods: {
        filter(values) {
            var shows = []
            for (var i = 0; i < values.length; i++) {
                var e = values[i];

                if (this.filterByID(e) &&
                    this.filterByState(e) &&
                    this.filterByAddress(e) &&
                    this.filterByLabel(e, "zone", this.filterZone) &&
                    this.filterByLabel(e, "rack", this.filterRack)) {
                    shows.push(e)
                }
            }

            return shows
        },

        filterByLabel(value, labelKey, labelValue) {
            if (!value) {
                return true
            }

            var lables = value.meta.lables
            for (var i = 0; i < lables.length; i++) {
                var label = lables[i];
                if (label.key == labelKey && -1 != label.value.indexOf(labelValue)) {
                    return true
                }
            }

            return false
        },

        filterByState(value) {
            return this.filterState == -1 || value.meta.state == this.filterState
        },

        filterByAddress(value) {
            return this.filterAddress == "" || value.meta.address.indexOf(this.filterAddress) != -1
        },

        filterByID(value) {
            return this.filterId == "" || value.meta.id == this.filterId
        },

        toStore(id) {
            this.$router.replace("/stores/" + id)
        },

        loadStores() {
            var that = this
            this.$http.get(this.elasticellCfg.storesAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.stores = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        },

        offlineStores(store) {
            var that = this

            var fn = function () {
                that.toOfflineStore(store.meta.id)
            }

            this.$parent.alertConfirm("Are you shoule offline the store<" + JSON.stringify(store.meta) + ">", fn)
        },

        deleteStore(store) {
            var that = this

            var fn = function () {
                that.toDeleteStore(store.meta.id)
            }

            this.$parent.alertConfirm("Are you shoule delete the store<" + JSON.stringify(store.meta) + ">", fn)
        },

        toOfflineStore(id) {
            var that = this

            this.$http.delete(this.elasticellCfg.storeAPI(id)).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                } else {
                    that.loadStores()
                    that.$parent.alertSuccess("Offline store success")
                }
            }, response => {
                that.$parent.alertError(response)
            })
        },

        toDeleteStore(id) {
            var that = this

            this.$http.delete(this.elasticellCfg.storeAPI(id) + "?force").then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                } else {
                    that.loadStores()
                    that.$parent.alertSuccess("Delete store success")
                }
            }, response => {
                that.$parent.alertError(response)
            })
        }
    }
}
</script>
