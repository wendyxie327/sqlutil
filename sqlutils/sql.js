var XLSX = require('xlsx');
var fs = require('fs');
var createTableSql = require('./create_table_sql');
var createVo = require('./create_vo');
var createInsertSql = require('./create_insert_sql');
var createTableMySql = require('./create_table_mysql');


// 读取文件
var buf = fs.readFileSync("D://test.xlsx");
var wb = XLSX.read(buf, {type: 'buffer'});
var content = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
console.log(content);

var primaryKey = new Array();

// var vo = {
//     tbl_payDatail: '序号',
//     __EMPTY: '主键',
//     __EMPTY_1: '字段中文名',
//     __EMPTY_2: '字段英文名',
//     __EMPTY_3: '类型',
//     __EMPTY_4: '最大长度（字节）',
//     __EMPTY_5: '允许空',
//     __EMPTY_6: '备注'
// };
var tblName = "t_sys_org_department_post";

var voArr = new Array();
console.log("-----------------------------" + JSON.stringify(content[0].key));
for (var i = 1 ; i <content.length; i++) {
    var simple = content[i];
    var vo ={
        num:simple.tbl_payDetail,    // '序号',
        isPrimary: simple.__EMPTY,    // '主键',
        chName: simple.__EMPTY_2,    // '字段中文名',
        enName: simple.__EMPTY_1,    // '字段英文名',
        type: simple.__EMPTY_3,    // '类型',
        len: simple.__EMPTY_4,    // '最大长度（字节）',
        isNull: simple.__EMPTY_5,    // '允许空',
        remark: simple.__EMPTY_7    // '备注'
    }
    voArr.push(vo);
}
// 数据库创建语句
var createSql = createTableMySql.getCreateTable(voArr, vo, tblName, primaryKey);
console.warn(" 数据库生成语句：\n " + createSql);
console.log("\n\n\n");
// // vo对象
// console.warn(createVo.getVo(voArr));
// //insert
// createInsertSql.insert(voArr, tblName);

