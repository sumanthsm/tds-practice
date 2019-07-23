const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const json2csv = require('json2csv').parse;
var csvjson = require('csvjson');
var fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function convertProjectDataToJson(){
    let csvData = [];
    var options = {
        delimiter: ',', // optional
        quote: '"' // optional
    };
    var file_data = fs.readFileSync('./data/projectdata.csv', { encoding: 'utf8' });
    csvData = csvjson.toObject(file_data, options);
    return csvData;
}

app.get('/api/projectdata', (req, res) => {
    const data = convertProjectDataToJson();
    res.json(data);
});

app.get('/api/projectdata:id', (req, res) => {
    console.log(req.params, "params");
    
    let result = [];
    let appData = convertProjectDataToJson();
    for (let i = 0; i < appData.length; i++) {
        let appName = appData[i]['appName'].toLowerCase();
        let appAbrv = appData[i]['appAbrv'].toLowerCase();
        let searchTerm = req.params.name;
        if (appName.indexOf(searchTerm.toLowerCase()) > -1 || appAbrv.indexOf(searchTerm.toLowerCase()) > -1) {
            result.push(appData[i]);
        }
    }
    res.json(result);
});

app.get('/api/getappdata:id', (req, res) => {
    console.log(req.params, "params");
    
    let result = {};
    let appData = convertProjectDataToJson();
    for (let i = 0; i < appData.length; i++) {
        let appId = appData[i]['appId'];
        if (appId == req.params.id) {
            result = appData[i];
        }
    }
    res.json(result);
});

app.post('/api/shortcutsdata', (req, res) => {
    const fields = ['appId', 'appAbrv', 'appName', 'appDesc', 'appUrl', 'appContactEmail'];
    const opts = { fields };

    let appData = convertProjectDataToJson();
    let shortcutsData = convertShortcutsDataToJson();
    const appId = req.body.appId;
    let flag = false;
    if(shortcutsData){
        flag = false;
    }else{
        for(let i = 0; i < shortcutsData.length; i++){
            if(shortcutsData[i].appId === appId){
                flag = true;
            }
        }   
    }

    if (flag) {
        res.json({ 'status': 'fail', 'msg': 'Data already exists' });
    } else {
        for (let i = 0; i < appData.length; i++) {
            if (appData[i].appId === appId) {
                shortcutsData.push(appData[i]);
            }
        }

        fs.writeFile("./data/shortcutsdata.csv", json2csv(shortcutsData, opts), function (err) {
            if (err) {
                throw err;
            }
        });
        res.json({ 'status': 'success', 'msg': 'Data added successfully' });
    }
});

app.post('/api/deleteshortcut', (req, res) => {
    const fields = ['appId', 'appAbrv', 'appName', 'appDesc', 'appUrl', 'appContactEmail'];
    const opts = { fields };
    let shortcutsData = convertShortcutsDataToJson();
    const appId = req.body.appId;
    console.log(appId, "appId");
    
    const result = shortcutsData.filter((shortcut) => shortcut.appId !== appId);
    // for(let i = 0; i < shortcutsData.length; i++){
    //     if(shortcutsData[i].appId === appId){
    //         flag = true;
    //     }
    // }
    console.log(result, "result");
    
    fs.writeFile("./data/shortcutsdata.csv", json2csv(result, opts), function (err) {
        if (err) {
            throw err;
        }
    });
    res.json({'status': 'success', 'msg' : 'Shortcut deleted successfully'});
});

app.post('/api/deleteapp', (req, res) => {
    const fields = ['appId', 'appAbrv', 'appName', 'appDesc', 'appUrl', 'appContactEmail'];
    const opts = { fields };
    let appData = convertProjectDataToJson();
    const appId = req.body.appId;
    const result = appData.filter((app) => app.appId !== appId);
    console.log(result, "result");
    
    fs.writeFile("./data/appdata.csv", json2csv(result, opts), function (err) {
        if (err) {
            throw err;
        }
    });
    res.json({'status': 'success', 'msg' : 'App deleted successfully'});
});

app.post('/api/createapp', (req, res) => {
    const fields = ['appId', 'appAbrv', 'appName', 'appDesc', 'appUrl', 'appContactEmail'];
    const opts = { fields };
    let flag = 0;
    let appData = convertProjectDataToJson();
    const newAppData = req.body.data;
    
    for(let i=0;i<appData.length;i++){
        if(appData[i]['appId'] === newAppData['appId']){
            console.log('if new app data');
            flag = 1;
            break;
        }
    }

    if(flag === 0){
        console.log("flag true");
        appData.push(newAppData);
        fs.writeFile("./data/appdata.csv", json2csv(appData, opts), function (err) {
            if (err) {
                throw err;
            }
        });
        res.json({'status': 'success'});
    }else{
        console.log("flag false");
        res.json({'status': 'fail'});
    }
});


app.post('/api/editapp', (req, res) => {
    const fields = ['appId', 'appAbrv', 'appName', 'appDesc', 'appUrl', 'appContactEmail'];
    const opts = { fields };
    let appData = convertProjectDataToJson();
    const newAppData = req.body.data;
    console.log(appData, "appdata");
    console.log(newAppData, "newappdata");
    
    for(let i=0;i<appData.length;i++){
        if(appData[i]['appId'] === newAppData['appId']){
            appData[i]['appId'] = newAppData['appId'];
            appData[i]['appAbrv'] = newAppData['appAbrv'];
            appData[i]['appName'] = newAppData['appName'];
            appData[i]['appDesc'] = newAppData['appDesc'];
            appData[i]['appUrl'] = newAppData['appUrl'];
            appData[i]['appContactEmail'] = newAppData['appContactEmail'];
            console.log(i, "inside if");
            break;
        }
    }
    

    fs.writeFile("./data/appdata.csv", json2csv(appData, opts), function (err) {
        if (err) {
            throw err;
        }
    });
    res.json({'status': 'success'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));