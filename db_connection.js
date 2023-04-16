const mssql = require('mssql/msnodesqlv8');
const sqlConfig = {
  server: 'ABC\\SQLEXPRESS',
  database: 'node_crud_api',
  user:'root',
  password:'',
  options: {
    trustServerCertificate: true,
    trustedConnection:true   //mandatory
  }
}

const pool1= new mssql.ConnectionPool(sqlConfig);
const poolconnection=pool1.connect()
.then((pool) =>{
    console.log(`Connected to mssql!`)
    return pool;
})
.catch(err =>{
    console.log('connection failed',err);
})

module.exports={pool1,poolconnection,mssql}