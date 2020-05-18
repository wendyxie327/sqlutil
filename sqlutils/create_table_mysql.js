var createTableMySql = {

    getSimple : function (name, type, len, isNull, isPrimary, primaryKey, remark, chName) {
        // 去除空格
        name = name.trim().replace(" ", "");
        type = type.trim().replace(" ", "");
        chName = chName.trim().replace(" ", "");


        var sql = ' `' + name + '` ';
        if (type.toUpperCase() === 'String'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR2'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR'.toUpperCase() || type.toUpperCase() === 'CHAR'.toUpperCase()) {
            sql = sql + ' VARCHAR';
            if (len) {
                sql = sql + '(' + len + ')'
            } else {
                sql = sql + '(255)'
            }
        } else if (type.toUpperCase() === 'Integer'.toUpperCase() || type.toUpperCase() === 'int'.toUpperCase()
        || type.toUpperCase() === 'NUMBER'.toUpperCase()) {
            sql = sql + ' int(11) ';
        } else if (type.toUpperCase() === 'Long'.toUpperCase()
        ||type.toUpperCase() === 'bigint'.toUpperCase() ) {
            sql = sql + ' bigint '
        } else if (type.toUpperCase() === 'tinyint'.toUpperCase()) {
            sql = sql + ' tinyint(2) '
        } else if (type.toUpperCase() === 'decimal'.toUpperCase()) {
            sql = sql + ' tinyint(2) '
        } else if (type.toUpperCase() === 'Date'.toUpperCase() || type.toUpperCase() === 'DateTime'.toUpperCase() || type.toUpperCase() === 'time'.toUpperCase()
        || type.toUpperCase() === 'TIMESTAMP'.toUpperCase()) {
            sql = sql + ' datetime '
        } else {
            console.error("编译出错：type = " + type + ", " + name);
            return null;
        }

        if (isNull) {
            sql = sql + " DEFAULT NULL ";
        } else {
            sql = sql + " NOT NULL ";
        }

        sql = sql + " COMMENT '" + chName ;
        if (remark){
            remark = remark.replace(/\r\n/g, " ");
            sql = sql +"     " + remark
        }
        sql = sql + "'";
        if (isPrimary) {
            primaryKey.push(name);
        }
        console.log("单个字段：" + sql);
        return sql.toUpperCase();

    },

    getCreateTable: function (conJson, vo, tblName, primaryKey) {
        var test = "CREATE TABLE " + tblName + " ( \n";

        // 解析各字段
        for (var i = 0; i < conJson.length; i++) {
            var simple = conJson[i];
            var sql = null;
            console.log(simple);
            // 主键
            var isPrimary = false;
            if (simple.isPrimary === '√') {
                isPrimary = true;
            }
            // 英文名称
            var name = simple.enName;
            // 类型
            var type = simple.type;
            // 长度
            var len = simple.len;
            // 是否允许空
            var isNull = false;
            if (simple.isNull === '√') {
                isNull = true;
            }
            var remark = simple.remark;
            var chName = simple.chName;

            console.log(simple);
            var simpleSql = this.getSimple(name, type, len, isNull, isPrimary, primaryKey, remark, chName);
            if (simpleSql != null) {
                test = test + simpleSql;
                if (i != conJson.length - 1) {
                    test = test + " , \n"
                } else {
                    test = test + " \n"
                }
            } else {
                console.log("错误行 ： " + simpleSql);
            }


        }

        test = test + ') \n';
        test = test + ' ; \n';
        var primaryKeyStr = '';
        // 设置主键
        if (primaryKey.length > 0) {
            console.log("primaryKey.length = " + primaryKey.length);
            for (var i = 0; i < primaryKey.length; i++) {
                primaryKeyStr =primaryKeyStr + primaryKey[i] ;
                if (i < primaryKey.length-1) {
                    primaryKeyStr =  primaryKeyStr + ', ';
                }

            }
            // test = test + ' ALTER TABLE ' + tblName + ' ADD CHECK  (' + primaryKeyStr + ' IS NOT NULL); \n';
            test = test + ' ALTER TABLE ' + tblName + ' ADD  PRIMARY KEY (' + primaryKeyStr + ' ); \n';
        }
        return test.toLowerCase();
    }
} ;

module.exports = createTableMySql;

