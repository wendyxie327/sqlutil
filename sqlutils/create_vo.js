var createVo = {
    getSimpleVo: function (name, type, desc, remark) {
        // 去除空格
        name = name.trim().replace(" ", "");
        type = type.trim().replace(" ", "");

        var con = new Array("private");
        if (type.toUpperCase() === 'String'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR2'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR'.toUpperCase()) {
            con.push("String ");
        } else if (type.toUpperCase() === 'Integer'.toUpperCase()) {
            con.push("Integer ");
        } else if (type.toUpperCase() === 'Long'.toUpperCase()) {
            con.push("Long ");
        } else if (type.toUpperCase() === 'Date'.toUpperCase()) {
            con.push("Date ");
        } else {
            console.error("编译出错：type = " + type);
            return null;
        }

        con.push(name);
        con.push("; // ");
        // con.push(desc.replace("\n", ""));
        con.push(" ");
        // if (remark){
        //     con.push(remark.replace("\n", ""));
        // }
        con.push(remark);

        return con.join(" ");
    },

    getVo: function (conJson) {
        var voContent = new Array();
        for (var i = 0; i < conJson.length; i++) {
            var simple = conJson[i];
            voContent.push(this.getSimpleVo(simple.enName, simple.type, simple.chName, simple.remark));
        }
        return voContent.join("\n");
    }
};

module.exports = createVo;
