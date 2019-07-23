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

app.post('/api/updatestatus', (req, res) => {
    const fields = ['id', 'name', 'dataSource', 'type', 'status', 'comment'];
    const opts = { fields };
    let projectData = convertProjectDataToJson();
    const data = req.body.data;
    const id = req.body.data.id;
    const status = req.body.data.status;
    const comment = req.body.data.comment;
    console.log(data, "data");
    
    for(let i=0;i<projectData.length;i++){
        if(projectData[i]['id'] == id){
            projectData[i]['status'] = status;
            projectData[i]['comment'] = comment;
            break;
        }
    }
    fs.writeFile("./data/projectdata.csv", json2csv(projectData, opts), function (err) {
        if (err) {
            throw err;
        }
    });
    res.json({'status': 'success'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));