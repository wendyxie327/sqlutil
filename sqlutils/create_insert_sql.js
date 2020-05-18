var createInsertSql = {

    insert : function (arr, tblName) {
        var insertSq= new Array();
        insertSq.push("insert into");
        insertSq.push(tblName);
        insertSq.push("(");

        for (var i = 0; i < arr.length; i++) {
            insertSq.push(arr[i].enName);
            if (i !== arr.length - 1) {
                insertSq.push(",")
            }
        }

        insertSq.push(" ) values (");

        for (var i = 0; i < arr.length; i++) {
            insertSq.push("#{");
            insertSq.push(arr[i].enName);
            insertSq.push("}");
            if (i !== arr.length - 1) {
                insertSq.push(",")
            }
        }

        insertSq.push(" )");
        console.log(insertSq.join(" "));
        return insertSq.join(" ");
    }
};

module.exports = createInsertSql;