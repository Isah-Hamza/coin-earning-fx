const PORT = process.env.PORT  || 5000; 
const express = require('express')
const app = express()
const cors  = require('cors');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const User = require('./user');
const nodemailer = require('nodemailer');
require('dotenv').config();

// mongoose.connect('mongodb://localhost/crypto', () => console.log('connected'), e => console.log(e.message));

app.use(urlencoded({extended:false}));
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.use(cors());

const test = {
    email: 'test@test.com', fullname:'test test', password: ''
}

const sendEmail = () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }
      });
    
      let mailOptions = {
        from: process.env.MAIL_PASSWORD,
        to: verifiedUser.email,
        subject: 'Nodemailer Project',
        text: 'This is to verify that your account had been successfully created'
      };
      console.log(process.env.MAIL_USERNAME)
    
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully...");
        }
      });
}


const users = [test];
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

    function UserConstructor () {
        this.fullname = req.body.fullname;
        this.email= req.body.email,
        this.phone_number= req.body.phone_number,
        this.password= req.body.password,
        this.confirm_password= req.body.confirm_password,
        this.country= req.body.country,
        this.deposited= parseFloat('0.00'),
        this.profit= parseFloat('0.00'),
        this. bonus= parseFloat('0.00'),
        this.ref_bonus= parseFloat('0.00'),
        this.balance = this.deposited + this.profit + this.bonus + this.ref_bonus;
        this.active_packages= 0,
        this.total_packgages= 0,
        this.withdrawal_info = {
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
        this.deposits = [],
        this.withdrawals  = []
    }

    const new_user = new UserConstructor();
    
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
    res.render('login', { message: null, user : null });
})

app.post('/login', (req, res) => {
    console.log(req.body)
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(user.email);
    const existing = users.find(existingUser => user.email == existingUser.email && user.password == existingUser.password);
    
    if(!existing) {
        res.render('login', { message: 'Email or password mismatched', user: req.body })
        return
    }
    else {
        verifiedUser = existing;
        sendEmail();
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
    verifiedUser.balance += payment_info.amount;
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

app.get('/dashboard/account-details', (req, res) => res.render('withdrawalinfodark', { user : verifiedUser , account_details_feedback: null}));

app.post('/dashboard/account-details', (req, res) => {
    verifiedUser.withdrawal_info.bank.bank_name = req.body.bank_name;
    verifiedUser.withdrawal_info.bank.account_name = req.body.account_name;
    verifiedUser.withdrawal_info.bank.account_number = req.body.account_number;
    verifiedUser.withdrawal_info.bitcoin.bitcoin_address = req.body.btc_address;
    verifiedUser.withdrawal_info.etherum.etherum_address = req.body.eth_address;
    verifiedUser.withdrawal_info.litcoin.litcoin_address = req.body.ltc_address;
    account_details_feedback = 'Your details have been saved successfully!';
    res.render('withdrawalinfodark' , { user: verifiedUser, account_details_feedback});

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

app.get('/dashboard/accountsettings', (req, res) => {
    res.render('accountsettingsdark', { user: verifiedUser, message : null });
});

app.post('/dashboard/accountsettings', (req, res) => {

    const update = {
        fullname : req.body.name,
        dob : req.body.dob,
        phone_number : req.body.phone,
        address : req.body.address,
    }

    verifiedUser = { ...verifiedUser , ...update }
    console.log(verifiedUser)
    res.render('accountsettingsdark.ejs', { user: verifiedUser, message: "Profile information updated successfully" });  

});

app.get('/dashboard/investmentplans', (req, res) => {
    res.render('investmentplansdark', { user: verifiedUser });
});

app.get('/dashboard/mypackage', (req, res) => {
    res.render('mypackageblack', { user: verifiedUser });
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
    const updatedUser = req.body;
    verifiedUser = updatedUser;
    console.log(verifiedUser)
    res.json(updatedUser)
})

app.get('/*', (req, res) => {
    res.render('404');
})

app.listen(PORT, () => { console.log('app listening on port ', PORT) });

