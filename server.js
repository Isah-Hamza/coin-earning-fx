const PORT = process.env.PORT  || 5000; 
const express = require('express')
const app = express()
const cors  = require('cors');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const User = require('./user');

// mongoose.connect('mongodb://localhost/crypto', () => console.log('connected'), e => console.log(e.message));



app.use(urlencoded({extended:false}));
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.use(cors());

const users = [];
var verifiedUser = null;
var amount = null;
var withdrawal_details = null;
var payment_info = null;
var withdrawal_feedback = null;

app.get('/', (req, res) => { res.redirect('/login') });

app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const new_user = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        country: req.body.country,
        deposited: parseFloat('0.00'),
        profit: parseFloat('0.00'),
        bonus: parseFloat('0.00'),
        ref_bonus: parseFloat('0.00'),
        balance: parseFloat('0.00'),
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
        },
        deposits: [],
        withdrawals : [],


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

    if(!existing) {
        res.send('Invalid username or password')
        return
    }
    else {
        verifiedUser = existing;
        res.redirect('/dashboard');
    }
})

app.get('/dashboard', (req, res) => res.render('dashboard', {user : verifiedUser}))

app.get('/dashboard/deposits', (req, res) => res.render('deposits', {user : verifiedUser}))

app.post('/dashboard/payment', (req, res) => {
    amount = req.body.amount;
    res.redirect('/dashboard/payment');
})

app.get('/dashboard/payment', (req, res) => res.render('payment', {user : verifiedUser, amount: amount}))

app.post('/dashboard/payment/confirm_payment', (req, res) => {
    payment_info = {
        id: Math.floor((Math.random() * 1000) + 1 ),
        amount: Number(amount),
        date: new Date().toString().substr(0,24),
        mode: req.body.mode,
        proof: req.body.payment_proof,
        status: 'pending',
    }
    verifiedUser.deposits.push(payment_info);
    verifiedUser.deposited += payment_info.amount;
    console.log((verifiedUser.deposited) )
    console.log((verifiedUser.balance) )
    res.redirect('/dashboard/deposits');
})

app.get('/dashboard/transaction-history', (req, res) => res.render('transaction-history', { user : verifiedUser }))

app.get('/dashboard/withdrawals', (req, res) => res.render('withdrawal', { user : verifiedUser, withdrawal_feedback }))

app.post('/dashboard/withdrawals', (req, res) => {
    withdrawal_info = {
        id: Math.floor(Math.random() * 1000 + 1),
        amount: req.body.amount,
        mode: req.body.mode,
        date : new Date().toString().substr(0, 24),
        charges: 2/100 * Number(req.body.amount),
        status: 'pending',
    }
    verifiedUser.withdrawals.push(withdrawal_info);
    withdrawal_feedback = 'Your request have been submitted. Your account would be updated in 24hrs time';
    res.redirect('/dashboard/withdrawals');
})


app.listen(PORT, () => { console.log('app listening on port ', PORT) });