const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const app = express();
const Router = express.Router();
const MongoClient = require('mongodb').MongoClient;


app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://0.0.0.0:27017/User")
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const WalletAddressSchema = new mongoose.Schema({
    walletAddress: String,
    loanType: Number,
    amount: Number
})

const Wallet = mongoose.model('WalletAddress', WalletAddressSchema);

app.post("/wallet", async (req, res) => {
    let data = new Wallet(req.body);
    console.log('data: ', data);
    let walletAdd = await data.save();
    console.log('walletAdd: ', walletAdd);
    res.send(walletAdd);
})




app.get('/getWallet', async (req, res) => {
    let wallet = req.body.walletAddress;
    console.log('wallet: ', wallet);
    try {
        const documents = await Wallet.findOne({ walletAddress: wallet });
        res.json(documents);
        // console.log(documents)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/getWalletAddress', async (req, res) => {
    try {
        const documents = await Wallet.find({});
        res.json(documents);
        // console.log(documents)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/getDelete/:walletAddress', async (req, res) => {
    let documentIdToDelete = req.params.walletAddress;
    console.log('wallet: ', documentIdToDelete);
    try {
        const deletedDocument = await Wallet.deleteMany({ walletAddress: documentIdToDelete });
        res.json(deletedDocument);
        // console.log(documents)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(4001, () => {
    console.log("app start on 4001");
});




