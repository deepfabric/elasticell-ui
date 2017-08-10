let util = {}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 
        "d+": this.getDate(),                    
        "h+": this.getHours(),                   
        "m+": this.getMinutes(),                 
        "s+": this.getSeconds(),                 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()            
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

util.storeState = function (value) {
    if (value == 0) {
        return "UP"
    } else if (value == 1) {
        return "DOWN"
    } else if (value == 2) {
        return "TOMBSTONE"
    } else {
        return "UNKNOWN"
    }
}

util.gb = function (value) {
    return parseInt(value / 1024 / 1024 / 1024 * 100) / 100.0
}

util.date = function (value) {
    return 0 == value ? "" : new Date(value * 1000).format("yyyy-MM-dd hh:mm:ss");
}

util.range = function (value) {
    return value ? formatBytes(value) : "unbound"
}

function formatBytes(value) {
    return string2bytes(value).join(' ')
}

function string2bytes(value) {
    var bytes = [];

    for (var i = 0; i < value.length; ++i) {
        var code = value.charCodeAt(i);
        bytes = bytes.concat([code & 0xff, code / 256 >>> 0]);
    }

    return bytes
}

export default util