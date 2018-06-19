# c-lightning-express

A rest API built with NodeJS and Express for interacting with your Bitcoin [c-lightning](https://github.com/ElementsProject/lightning) node.

This is the backend for the PayBolts app ([https://paybolts.com/](https://paybolts.com/)) but can be used for remotely interacting with your Bitcoin lightning node through any app you're building.

If you're looking for instructions on setting up your lightning node check out this [Medium article](https://medium.com/@Jayvdb/setting-up-and-transacting-on-the-bitcoin-lightning-network-a9ada42ec305).

## Installation

```
git clone https://github.com/Jasonvdb/c-lightning-express.git

cd c-lightning-express/

npm install
```

## Set config variables

Edit config.js and place your own api key and secret.

You can either generate these yourself or if you're using the PayBolts app you can use it to generate this config.

Make sure lightningPath is the absolute path to where you installed c-lightning.

```javascript
module.exports = {
	apiKey: "MY_API_KEY",
	secret: "MY_SECRET",
	lightningPath: "/root/.lightning"
};

```
