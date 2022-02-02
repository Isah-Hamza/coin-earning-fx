const PORT = process.env.PORT  || 5000; 
const express = require('express')
const app = express()
const cors  = require('cors');
const { urlencoded } = require('express');

app.use(urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());

const users = [];

app.get('/', (req, res) => { res.render('login') });

app.post('/register', (req, res) => {
    const new_user = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        country: req.body.country,

    };

    users.push(new_user);
    console.log(users.length)
    res.end();
})

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(user.email);
    const existing = users.find(existingUser => user.email == existingUser.email && user.password == existingUser.password);

    if(!existing) return
    else {
        
        res.render('dashboard', {user : existing});
        console.log('user exists', existing);
    }
})

app.listen(PORT, () => { console.log('app listening on port ', PORT) });