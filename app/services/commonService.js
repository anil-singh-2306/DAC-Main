
const pool = require('../config/db');

exports.GetId = async (tableName,column,prefix,bufferZeros)=>{

    sql =`
      select max(${column}) as 'col' from client_1001.${tableName}
    `

    const res = await pool.query(sql);
    if(res[0].length>0){
        let maxColumn = res[0][0]["col"];
        let maxVal = parseInt(maxColumn.replace(prefix,'')) +1 ;
        maxVal = maxVal.toString();;
        return prefix+setValue(bufferZeros,maxVal);
    }
    else{
        return prefix+setValue(bufferZeros,"1");
    }

}

function setValue(bufferZeros,value){

    if(bufferZeros.length< value.length)
    return value;
    
    const d = bufferZeros.substring(0,(bufferZeros.length-value.length));
    return d+value;

}