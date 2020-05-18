var createTableSql = {

    getSimple : function (name, type, len, isNull, isPrimary, primaryKey) {
        console.l
        // 去除空格
        name = name.trim().replace(" ", "");
        type = type.trim().replace(" ", "");

        var sql = ' "' + name + '" ';
        if (type.toUpperCase() === 'String'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR2'.toUpperCase()
            || type.toUpperCase() === 'VARCHAR'.toUpperCase()) {
            sql = sql + ' VARCHAR2';
            if (len) {
                sql = sql + '(' + len + ' BYTE)'
            } else {
                sql = sql + '(255 BYTE)'
            }
        } else if (type.toUpperCase() === 'Integer'.toUpperCase()) {
            sql = sql + ' NUMBER(11) ';
        } else if (type.toUpperCase() === 'Long'.toUpperCase()) {
            sql = sql + ' NUMBER(*) '
        } else if (type.toUpperCase() === 'Date'.toUpperCase()) {
            sql = sql + ' DATE '
        } else {
            console.error("编译出错：type = " + type + ", " + name);
            return null;
        }

        if (isNull) {
            sql = sql + " NULL ";
        } else {
            sql = sql + " NOT NULL ";
        }

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


            console.log(simple);
            var simpleSql = this.getSimple(name, type, len, isNull, isPrimary, primaryKey);
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
        test = test + ' LOGGING \n';
        test = test + ' NOCOMPRESS \n';
        test = test + ' NOCACHE \n';
        test = test + ' ; \n';

        // 设置主键
        if (primaryKey.length > 0) {
            console.log("primaryKey.lent = " + primaryKey.length);
            for (var i = 0; i < primaryKey.length; i++) {
                test = test + ' ALTER TABLE ' + tblName + ' ADD CHECK  (' + primaryKey[i] + ' IS NOT NULL); \n';
                test = test + ' ALTER TABLE ' + tblName + ' ADD  PRIMARY KEY (' + primaryKey[i] + ' ); \n';
            }
        }
        return test.toUpperCase();
    }
} ;

module.exports = createTableSql;

