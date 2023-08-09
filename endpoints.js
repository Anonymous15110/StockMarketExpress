const express = require('express');
const app = express();
const port = process.env.PORT;

var cors = require('cors');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors());
app.use(jsonParser)
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(port, () => { console.log("Heyyyyy"+port) })

const userdetails = [
    { id: 1, name: "EU 03", password: "stgregorios@eunoia2023", auth: "user" },
    { id: 2, name: "EU 06", password: "cnm@eunoia2023", auth: "user" },
    { id: 3, name: "EU 08", password: "lodhaworldschool@eunoia2023", auth: "user" },
    { id: 4, name: "EU 11", password: "universalhigh@eunoia2023", auth: "user" },
    { id: 5, name: "EU 12", password: "bombayscottish@eunoia2023", auth: "user" },
    { id: 6, name: "Administrator", password: "admin@1234", auth: "admin" },
]

const values = [1138, 2015, 714.50, 1267, 408.65, 431.60, 454.90, 300, 827.05, 965];

let lender, borrower, value;
let lender2, borrower2;
app.post('/loginapi', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user = userdetails.find(o => o.name === username);
    if (user.name === username && user.password === password) {
        let result = { flag: true, message: "", auth: user.auth };
        res.send(JSON.stringify(result));
    }
    else {
        let result = { flag: false, message: "Username or password is incorrect", auth: user.auth };
        res.send(JSON.stringify(result));
    }


})

app.post('/changevalue', (req, res) => {
    console.log(values[req.body.index]);
    values[req.body.index] = req.body.value;
    console.log(values[req.body.index]);
})

app.get('/changevalue', (req, res) => {
    res.send(JSON.stringify(values));
})

app.post('/loanadminapi', (req, res) => {
    lender = req.body.lender;
    borrower = req.body.borrower;
    value = req.body.value;
    console.log("Hello");
})

app.post('/loanuserapi', (req, res) => {
    let flag = req.body.type;

    if (flag === 'lend') {
        lender2 = req.body.user;
        console.log(lender + "\n" + lender2);
        if (lender2 === lender) {
            lender=0;
            res.send(value);
            
        }
    }
    else if (flag === 'borrow') {
        borrower2 = req.body.user;
        console.log(borrower + "\n" + borrower2);
        if (borrower2 === borrower) {
            borrower=0;
            res.send(value);
            
        }
    }
})
const eu3 = {'text':''};
const eu6 = {'text':''};
const eu8 = {'text':''};
const eu11 = {'text':''};
const eu12 = {'text':''};

app.post('/writetofile', (req, res) => {
    switch(req.body.user)
    {
        case 'EU 03':{
            eu3.text += (req.body.message+"<br/>");
            res.send(eu3);
            break;
        }
        case 'EU 06':{
            eu6.text += req.body.message+"<br/>";
            res.send(eu6);
            break;
        }
        case 'EU 08':{
            eu8.text += req.body.message+"<br/>";
            res.send(eu8);
            break;
        }
        case 'EU 11':{
            eu11.text += req.body.message+"<br/>";
            res.send(eu11);
            break;
        }
        case 'EU 12':{
            eu12.text += req.body.message+"<br/>";
            res.send(eu12);
            break;
        }
        default : {
            res.send('whyyy');
        }
    }
})

app.post('/getstuff', (req, res) => {
    console.log(req.body.user);
    switch(req.body.user)
    {
        case 'EU 03':{
            res.send(eu3);
            break;
        }
        case 'EU 06':{
            res.send(eu6);
            break;
        }
        case 'EU 08':{
            res.send(eu8);
            break;
        }
        case 'EU 11':{
            res.send(eu11);
            break;
        }
        case 'EU 12':{
            res.send(eu12);
            break;
        }
    }
})

app.post('/loanwritetofile', (req, res) => {
    if(req.body.type === 'lend')
    {
        const message = 'Loaned '+ value + ' to '+borrower;
        switch(req.body.user)
        {
            case 'EU 03':{
                eu3.text += (message+"<br/>");
                res.send(eu3);
                break;
            }
            case 'EU 06':{
                eu6.text += (message+"<br/>");
                res.send(eu6);
                break;
            }
            case 'EU 08':{
                eu8.text += (message+"<br/>");
                res.send(eu8);
                break;
            }
            case 'EU 11':{
                eu11.text += (message+"<br/>");
                res.send(eu11);
                break;
            }
            case 'EU 12':{
                eu12.text += (message+"<br/>");
                res.send(eu12);
                break;
            }
            default : {
                res.send('whyyy');
            }
        } 
    }
    else if(req.body.type === 'lend')
    {
        const message = 'Borrowed '+ value + ' from '+lender;
        switch(req.body.user)
        {
            case 'EU 03':{
                eu3.text += (message+"<br/>");
                res.send(eu3);
                break;
            }
            case 'EU 06':{
                eu6.text += (message+"<br/>");
                res.send(eu6);
                break;
            }
            case 'EU 08':{
                eu8.text += (message+"<br/>");
                res.send(eu8);
                break;
            }
            case 'EU 11':{
                eu11.text += (message+"<br/>");
                res.send(eu11);
                break;
            }
            case 'EU 12':{
                eu12.text += (message+"<br/>");
                res.send(eu12);
                break;
            }
            default : {
                res.send('whyyy');
            }
        } 
    }
})

module.exports = app;