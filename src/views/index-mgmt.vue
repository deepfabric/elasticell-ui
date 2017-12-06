<style scoped>

</style>
<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="list-group">
                <div class="form-group">
                    <label>Name: </label>
                    <input v-model="newIndex.name" size="10" required pattern="^\w+$" />
                </div>
                <div class="form-group">
                    <label>KeyPattern: </label>
                    <input type="text" v-model="newIndex.keyPattern" size="15" required />
                </div>
                <div class="form-group">                   
                    <table width="30%" class="table">
                        <thead>
                            <tr>
                                <th width="15%">Field</th>
                                <th width="15%">Type</th>
                                <th width="10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(f, seq) in newIndex.fields" :key="seq">
                                <td>
                                    <input type="text" v-model="f.name" size="15" required />
                                </td>
                                <td>
                                    <select v-model.number="f.type">
                                        <option value="0">Text</option>
                                        <option value="1">Uint8</option>
                                        <option value="2">Uint16</option>
                                        <option value="3">Uint32</option>
                                        <option value="4">Uint64</option>
                                        <option value="5">Float32</option>
                                        <option value="6">Float64</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-xs" @click="deleteField(seq)">DELETE</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-warning btn-xs" @click="addField()">ADD FIELD</button>
                    <button type="button" class="btn btn-warning btn-xs" @click="addIndex()">ADD INDEX</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <table width="100%" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" value="1" v-model.number="checkedAll" @click="selectAll" />
                        </th>
                        <th width="20%">Name</th>
                        <th width="30%">KeyPattern</th>
                        <th width="30%">Field</th>
                        <th width="20%">Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in showIndices" :key="s.name">
                        <td>
                            <input type="checkbox" :value="s.name" v-model.number="checkedIndices" />
                        </td>
                        <td>{{s.name}}</td>
                        <td>{{s.keyPattern}}</td>
                        <td>
                            <table width="100%" class="table">
                                <tbody>
                                    <tr v-for="f in s.fields" :key="f.name">
                                        <td>{{f.name}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table width="100%" class="table table-striped table-bordered table-hover">
                                <tbody>
                                    <tr v-for="f in s.fields" :key="f.type">
                                        <td>{{fieldTypeInt2Str(f.type)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-xs" @click="deleteIndex(s.name)">DELETE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Util from '../libs/util.js';
import validator from 'validator';

export default {
    props: ['elasticellCfg'],

    created() {
        this.$parent.updateViewTitle("Index Management")
        this.loadIndices()
    },

    computed: {
        showIndices() {
            return this.indices
        }
    },

    data() {
        return {
            indices: [],
            checkedIndices: [],
            checkedAll: 0,
            newIndex: {
                name: '',
                keyPattern: '',
                fields: []
            }
        }
    },

    methods: {
        selectAll() {
            if (this.checkedAll == 0) {
                this.checkedIndices = []
            } else {
                this.checkedIndices = []
                for (var i = 0; i < this.indices.length; i++) {
                    this.checkedIndices.push(this.indices[i].name)
                }
            }
        },

        toIndex(name) {
            this.$router.replace("/indices/" + name)
        },

        loadIndices() {
            var that = this
            this.$http.get(this.elasticellCfg.indicesAPI()).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                    return
                }

                that.indices = response.body.value
            }, response => {
                that.$parent.alertError(response)
            })
        },

        fieldTypeInt2Str(ti) {
            var ts = "Unknown"
            switch(ti) {
                case 0:
                    ts = "Text"
                    break
                case 1:
                    ts = "Uint8"
                    break
                case 2:
                    ts = "Uint16"
                    break
                case 3:
                    ts = "Uint32"
                    break
                case 4:
                    ts = "Uint64"
                    break
                case 5:
                    ts = "Float32"
                    break
                case 6:
                    ts = "Float64"
                    break
            }
            return ts
        },

        fieldTypeStr2Int(ts) {
            var ti = -1
            switch(ts) {
                case "Text":
                    ti = 0
                    break
                case "Uint8":
                    ti = 1
                    break
                case "Uint16":
                    ti = 2
                    break
                case "Uint32":
                    ti = 3
                    break
                case "Uint64":
                    ti = 4
                    break
                case "Float32":
                    ti = 5
                    break
                case "Float64":
                    ti = 6
                    break
            }
            return ti
        },

        deleteIndex(name) {
            var that = this

            var fn = function () {
                that.toDeleteIndex(name)
            }

            this.$parent.alertConfirm("Delete the index definition and data", name, fn)
        },

        toDeleteIndex(name) {
            var that = this

            this.$http.delete(this.elasticellCfg.indexAPI(name)).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                } else {
                    that.loadIndices()
                    that.$parent.alertSuccess("Delete index success")
                }
            }, response => {
                that.$parent.alertError(response)
            })
        },

        addField() {
            this.newIndex.fields.push({name: 'UNKNOWN', type: 0})
        },

        deleteField(seq) {
            this.newIndex.fields.splice(seq, 1)
        },

        addIndex() {
            var that = this
            var errors = that.validateIndex()
            if (errors.length != 0) {
                that.$parent.alertError(errors.join("\n"))
                return
            }
            this.$http.post(this.elasticellCfg.indicesAPI(), this.newIndex).then(response => {
                if (response.body.code != 0) {
                    that.$parent.alertError(response.body.error)
                } else {
                    that.loadIndices()
                    that.newIndex = {
                        name: '',
                        keyPattern: '',
                        fields: []
                    }
                    that.$parent.alertSuccess("Add index success")
                }
            }, response => {
                that.$parent.alertError(response)                
            })
        },

        validateIndex() {
            var idx = this.newIndex
            var errors = []
            if (!validator.isAlphanumeric(idx.name)) {
                errors.push("Name shall be alphanumeric")
            }
            try {
                var regex = new RegExp(idx.keyPattern)
            } catch(e) {
                errors.push("KeyPattern shall be valid regular expression")
            }
            if (idx.fields.length == 0) {
                errors.push("number of fields shall not be zero")
            }
            for (var i = 0; i < idx.fields.length; i++) {
                var f = idx.fields[i]
                if (!validator.isAlphanumeric(f.name)) {
                    errors.push("Field name shall be alphanumeric")
                }
            }
            return errors
        }
    }
}
</script>
