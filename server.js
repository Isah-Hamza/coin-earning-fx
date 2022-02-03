const PORT = process.env.PORT  || 5000; 
const express = require('express')
const app = express()
const cors  = require('cors');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const User = require('./user');

// mongoose.connect('mongodb://localhost/crypto', () => console.log('connected'), e => console.log(e.message));



app.use(urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());

const users = [];

app.get('/', (req, res) => { res.render('login') });

app.post('/register', async (req, res) => {
    const new_user = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        country: req.body.country,
        deposited: 0.00,
        profit: 0.00,
        bonus: 0.00,
        ref_bonus: 0.00,
        balance: 0.00,
        active_packages: 0,
        total_packgages: 0,
        withdrawal_info : {
            bank:{
                bank_name:'',
                account_name:'',
                account_number:''
            },
            bitcoin:{
                bitcoin_address:''
            },
            etherum:{
                etherum_address:''
            },
            litcoin:{
                litcoin_address:''
            }
        }

    };
    
    // try {
    //     const user = await new User(new_user);
    //     user.save();
    //     console.log(user);
    // } catch (error) {
    //     console.log(error.message);
    // }

    users.push(new_user);
    console.log(users.length)
    res.redirect('/login');
    res.end();
})

app.get('/login', (req, res) => {
    res.render('login');
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