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
var account_details_feedback = null;
var requestedUser = null;

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

app.get('/dashboard', (req, res) => res.render('dashboarddark', {user : verifiedUser}))

app.get('/dashboard/deposit', (req, res) => res.render('deposit', {user : verifiedUser}))

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
    res.redirect('/dashboard/deposit');
})

app.get('/dashboard/transaction-history', (req, res) => res.render('transactionhistorydark', { user : verifiedUser }))

app.get('/dashboard/withdrawal', (req, res) => res.render('withdrawaldark', { user : verifiedUser, withdrawal_feedback }))

app.post('/dashboard/withdrawal', (req, res) => {
    withdrawal_info = {
        id: Math.floor(Math.random() * 1000 + 1),
        amount: req.body.amount,
        mode: req.body.payment_mode,
        date : new Date().toString().substr(0, 24),
        charges: 2/100 * Number(req.body.amount),
        status: 'pending',
    }
    verifiedUser.withdrawals.push(withdrawal_info);
    withdrawal_feedback = 'Your acount must be verified before you can make withdrawal';
    res.redirect('/dashboard/withdrawal');
})

app.get('/dashboard/account-details', (req, res) => res.render('withdrawalinfodark', { user : verifiedUser , account_details_feedback}));

app.post('/dashboard/account-details', (req, res) => {
    verifiedUser.withdrawal_info.bank.bank_name = req.body.bank_name;
    verifiedUser.withdrawal_info.bank.account_name = req.body.account_name;
    verifiedUser.withdrawal_info.bank.account_number = req.body.account_number;
    verifiedUser.withdrawal_info.bitcoin.bitcoin_address = req.body.btc_address;
    verifiedUser.withdrawal_info.etherum.etherum_address = req.body.eth_address;
    verifiedUser.withdrawal_info.litcoin.litcoin_address = req.body.ltc_address;
    account_details_feedback = 'Your details have been saved successfully!';
    res.redirect('/dashboard/account-details');

});

app.get('/admin-dashboard', (req, res) => {
    res.render('admin-dashboard', { requestedUser })
});

app.get('/dashboard/notification', (req, res) => {
    res.render('notificationdark', { user: verifiedUser })
});

app.get('/dashboard/support', (req, res) => {
    res.render('supportdark', { user: verifiedUser })
});

app.get('/dashboard/plrecord', (req, res) => {
    res.render('plrecorddark', { user: verifiedUser })
});

app.get('/dashboard/verifyaccount', (req, res) => {
    res.render('verifyaccountdark', { user: verifiedUser })
});

app.get('/dashboard/subtrade', (req, res) => {
    res.render('subdark.ejs', { user: verifiedUser });
});

app.get('/admin-dashboard/:cancel', (req, res) => {
    requestedUser = null;
    res.render('admin-dashboard', { requestedUser })

});


app.post('/admin-dashboard', (req, res) => {
    const user_email = req.body.email;
    const user = users.find( user => user.email === user_email );
    if(!user) return res.send('No such user in the database');
    requestedUser = user;
    res.redirect('/admin-dashboard');
});

app.post('/update-user', (req, res) => {
    res.json(req.body)
    console.log(req.body);
    const updatedUser = req.body;
    
})


app.listen(PORT, () => { console.log('app listening on port ', PORT) });

