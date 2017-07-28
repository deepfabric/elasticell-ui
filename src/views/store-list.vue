<style scoped>
.ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}
</style>
<template>
    <Table :row-class-name="rowClassName" :columns="columns" :data="stores">
    </Table>
</template>
<script>
export default {
    created() {
        var app = this.$parent.$parent.$parent

        app.updateBreadcrumb([{
            text: "Index",
            path: "/"
        }], "Store List")

        app.updateNav(["store"], "store-list")
    },

    data() {
        return {
            columns: [
                {
                    title: "IP",
                    key: "ip",
                    // fixed: 'left',
                    // width: 150
                },
                {
                    title: "Cell Count",
                    key: "cellCount",
                },
                {
                    title: "Leader Count",
                    key: "leaderCount",
                },
                {
                    title: "Total storage(GB)",
                    key: "totalStorage",
                },
                {
                    title: "Available storage(GB)",
                    key: "availableStorage",
                },
                {
                    title: "Status",
                    key: "status",
                }
            ],

            stores: [
                {
                    ip: "192.168.100.100",
                    cellCount: 10,
                    leaderCount: 3,
                    totalStorage: 100,
                    availableStorage: 12.299,
                    status: "Down",
                },
                {
                    ip: "192.168.1.2",
                    cellCount: 10,
                    leaderCount: 3,
                    totalStorage: 100,
                    availableStorage: 85.299,
                    status: "Tombstone",
                },
                {
                    ip: "192.168.1.3",
                    cellCount: 10,
                    leaderCount: 4,
                    totalStorage: 100,
                    availableStorage: 85,
                    status: "UP",
                }
            ]
        }
    },

    methods: {
        rowClassName(row, index) {
            if (index === 1) {
                return 'demo-table-info-row';
            } else if (index === 3) {
                return 'demo-table-error-row';
            }
            return '';
        }
    }
}
</script>
