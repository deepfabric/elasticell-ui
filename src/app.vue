<style scoped>
@import 'styles/bootstrap.min.css';
@import 'styles/metisMenu.min.css';
@import 'styles/dataTables.bootstrap.css';
@import 'styles/dataTables.responsive.css';
@import 'styles/sb-admin-2.min.css';
@import 'styles/font-awesome.min.css';
</style>
<template>
    <div id="wrapper">
        <div class="container">
            <div id="alert" class="login-panel modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">{{alertTitle}}</h4>
                        </div>
                        <div v-if="alertContent" class="modal-body">
                            {{alertContent}}
                        </div>
                        <!-- <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div> -->
                    </div>
                </div>
            </div>
    
            <div id="confirm" class="login-panel modal fade" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="confirmModalLabel">{{alertTitle}}</h4>
                        </div>
                        <div v-if="alertContent" class="modal-body">
                            {{alertContent}}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="cancelConfirm">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="okConfirm">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">Elasticell Dashboard</a>
            </div>
    
            <app-nav :navs="navs"></app-nav>
        </nav>
    
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">{{viewTitle}}</h1>
                </div>
            </div>
    
            <div class="row">
                <div class="col-lg-12">
                    <router-view :elasticellCfg="elasticellCfg"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppNav from './views/nav.vue'

export default {
    components: {
        "app-nav": AppNav
    },

    created() {
        this.elasticellCfg.host = this.$cookie.get(this.elasticellCfg.hostAttr)
        this.elasticellCfg.apiVersion = this.$cookie.get(this.elasticellCfg.apiVersionAttr)
    },

    data() {
        return {
            alertClass: "panel-info",
            alertTitle: "demo",
            alertContent: "demo",

            confirmCancelFn: null,
            confirmOkFn: null,

            viewTitle: "",
            navs: [
                {
                    text: "Index",
                    icon: "fa-home",
                    path: "/"
                },
                {
                    text: "Store",
                    icon: "fa-database",
                    path: "/stores",
                },
                {
                    text: "Cell",
                    icon: "fa-codepen",
                    path: "/cells",
                },
                {
                    text: "Operators",
                    icon: "fa-spinner",
                    path: "/operators",
                },
                {
                    text: "Setting",
                    icon: "fa-gear",
                    path: "/setting",
                }
            ],

            elasticellCfg: {
                hostAttr: "_elasticell_host",
                apiVersionAttr: "_elasticell_api_version",

                host: "",
                apiVersion: "",

                baseAPI() {
                    return "http://" + this.host + "/pd/api/" + this.apiVersion
                },

                summaryAPI() {
                    return this.baseAPI() + "/system"
                },

                operatorsAPI() {
                    return this.baseAPI() + "/operators"
                },

                storesAPI() {
                    return this.baseAPI() + "/stores"
                },

                storeAPI(id) {
                    return this.storesAPI() + "/" + id
                },

                storeCellsAPI(id) {
                    return this.storesAPI() + "/" + id + "/cells"
                },

                cellsAPI() {
                    return this.baseAPI() + "/cells"
                },

                cellAPI(id) {
                    return this.cellsAPI() + "/" + id
                },

                transferLeaderAPI(id) {
                    return this.cellAPI(id) + "/leader"
                },

                operatorAPI(id) {
                    return this.cellAPI(id) + "/operator"
                }
            }
        }
    },

    methods: {
        updateViewTitle(viewTitle) {
            this.viewTitle = viewTitle
        },

        alertError(alertContent) {
            this.alert("alert", "panel-danger", "Failed", alertContent)
        },

        alertSuccess(alertContent) {
            this.alert("alert", "panel-success", "Succeed", alertContent)
        },

        alertConfirm(alertContent, ok, cancel) {
            this.confirmOkFn = ok
            this.confirmCancelFn = cancel
            this.alert("confirm", "", "Confirm", alertContent)
        },

        alert(model, alertClass, alertTitle, alertContent) {
            this.alertClass = alertClass
            this.alertTitle = alertTitle
            this.alertContent = alertContent
            $('#' + model).modal('show')
        },

        cancelConfirm() {
            $('#confirm').modal('hide')
            if (this.confirmCancelFn) {
                this.confirmCancelFn()
            }
        },

        okConfirm() {
            $('#confirm').modal('hide')
            if (this.confirmOkFn) {
                this.confirmOkFn()
            }
        }
    }
}
</script>
