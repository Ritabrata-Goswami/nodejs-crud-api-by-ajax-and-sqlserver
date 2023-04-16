var sqlConn = require('../db_connection');


var showForm = (req,res)=>{
    res.render('form');
}

var insertData = (req,res)=>{
    var name = req.body.enterName;
    var gender = req.body.enterGender;
    var country = req.body.enterCountry;
    var manu = req.body.enterManu;
    var userPhoto = req.file.filename;

    console.log('-----------Show Value-----------');
    console.log(name);
    console.log(gender);
    console.log(country);
    console.log(manu);
    console.log(userPhoto);
    console.log('--------------------------------');

    const request = sqlConn.pool1.request();
    var insertQuery = `EXEC insert_ajax @name='${name}', @gender='${gender}', @country='${country}', @manu='${manu}', @photo='${userPhoto}'`;
    request.query(insertQuery, (error,result)=>{
        if(error){
            console.log('Error in data insertion!');
            return res.json({'error':error});
        }
        else
        {
            console.log('Data inserted successfully!');
            // result returns {"recordsets":[],"output":{},"rowsAffected":[1]}
            res.end(JSON.stringify({'success':'Data inserted successfully!'}));
        }
    });
}

var showDashboard = (req,res)=>{
    const request = sqlConn.pool1.request();
    var fetchQuery = 'EXEC fetch_ajax_data';
    request.query(fetchQuery,(error,result)=>{
        if(error) throw error;
        console.log(result);
        var sendResult = result.recordset;
        res.render('display', {display:sendResult});
    });
}

var truncateTable = (req,res)=>{
    const request = sqlConn.pool1.request();
    var truncateQuery = 'EXEC truncate_query';
    request.query(truncateQuery,(err,result)=>{
        if(err) throw err;
        res.end(JSON.stringify({'success':'All data cleared successfully!'}));
    });
}

var deleteData = (req,res)=>{
    var id = req.body.deleteId;
    const request = sqlConn.pool1.request();
    var deleteQuery = `EXEC delete_query @del_id='${id}'`;
    request.query(deleteQuery,(err,result)=>{
        if(err) throw err;
        res.end(JSON.stringify({'success':'Data deleted successfully!'}));
    });
}

var requestEdit = (req,res) =>{
    var id = req.body.editId;
    const request = sqlConn.pool1.request();
    var editRequestQuery = `EXEC edit_request_query @edit_id='${id}'`;
    request.query(editRequestQuery,(err,result)=>{
        if(err) throw err;
        console.log(result);
        var sendResult = result.recordset;
        res.end(JSON.stringify(sendResult));
    });
}

var updateDataWithoutFile = (req,res)=>{
    var name = req.body.enterName;
    var gender = req.body.enterGender;
    var country = req.body.enterCountry;
    var manu = req.body.enterManu;
    var userPhoto = req.body.filename;
    var id = req.body.editId;

    console.log('-----------Show Value-----------');
    console.log(id);
    console.log(name);
    console.log(gender);
    console.log(country);
    console.log(manu);
    console.log(userPhoto);
    console.log('--------------------------------');

    const request = sqlConn.pool1.request();
    var insertQuery = `EXEC update_ajax @edit_id = '${id}', @name='${name}', @gender='${gender}', @country='${country}', @manu='${manu}', @photo='${userPhoto}'`;
    request.query(insertQuery, (error,result)=>{
        if(error){
            console.log('Error in data updatetion!');
            return res.json({'error':error});
        }
        else
        {
            console.log(result);
            console.log('Data updated successfully!');
            var showUpdatedData = `EXEC edit_request_query @edit_id='${id}'`;
            request.query(showUpdatedData,(err,result_show)=>{
                if(err) throw err;
                var sendResult = result_show.recordset;
                res.end(JSON.stringify({'success':'Data updated successfully!','updatedResult':sendResult}));
            });
        }
    });
}

var updateDataWithFile = (req,res)=>{
    var name = req.body.enterName;
    var gender = req.body.enterGender;
    var country = req.body.enterCountry;
    var manu = req.body.enterManu;
    var userPhoto = req.file.filename;
    var id = req.body.editId;

    console.log('-----------Show Value-----------');
    console.log(id);
    console.log(name);
    console.log(gender);
    console.log(country);
    console.log(manu);
    console.log(userPhoto);
    console.log('--------------------------------');

    const request = sqlConn.pool1.request();
    var insertQuery = `EXEC update_ajax @edit_id = '${id}', @name='${name}', @gender='${gender}', @country='${country}', @manu='${manu}', @photo='${userPhoto}'`;
    request.query(insertQuery, (error,result)=>{
        if(error){
            console.log('Error in data updatetion!');
            return res.json({'error':error});
        }
        else
        {
            console.log(result);
            console.log('Data updated successfully!');
            var showUpdatedData = `EXEC edit_request_query @edit_id='${id}'`;
            request.query(showUpdatedData,(err,result_show)=>{
                if(err) throw err;
                var sendResult = result_show.recordset;
                res.end(JSON.stringify({'success':'Data updated successfully!','updatedResult':sendResult}));
            });
        }
    });
}



module.exports = {
    showForm,
    insertData,
    showDashboard,
    truncateTable,
    deleteData,
    requestEdit,
    updateDataWithoutFile,
    updateDataWithFile
}