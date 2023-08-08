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

app.listen(port, () => { console.log("Heyyyyy") })

const userdetails = [
    { id: 1, name: "EU 3", password: "stgregorios@eunoia2023", auth: "user" },
    { id: 2, name: "EU 6", password: "cnm@eunoia2023", auth: "user" },
    { id: 3, name: "EU 7", password: "singhaniaschool@eunoia2023", auth: "user" },
    { id: 3, name: "EU 8", password: "lodhaworldschool@eunoia2023", auth: "user" },
    { id: 4, name: "Administrator", password: "admin@1234", auth: "admin" },
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

const fs = require('fs');

app.post('/writetofile', (req, res) => {
    const content = req.body.content;
    console.log("CHeck");
})

app.post('/loanuserapi', (req, res) => {
    let flag = req.body.type;

    if (flag === 'lend') {
        lender2 = req.body.user;
        console.log(lender + "\n" + lender2);
        if (lender2 === lender) {
            res.send(value);
        }
    }
    else if (flag === 'borrow') {
        borrower2 = req.body.user;
        console.log(borrower + "\n" + borrower2);
        if (borrower2 === borrower) {
            res.send(value);
        }
    }


})

module.exports = app;