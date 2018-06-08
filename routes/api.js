var express = require("express");
var router = express.Router();
var LightningClient = require("lightning-client");

var client = new LightningClient("/root/.lightning", true);

/* GET users listing. */
router.get("/", function(req, res, next) {
	//TODO list available functions here
	res.send("Available functions coming soon.");
});

router.get("/info", function(req, res, next) {
	client
		.getinfo()
		.then(info => {
			res.json({ status: "success", info });
		})
		.catch(errorResult => {
			res.json({ status: "error", error: errorResult.error });
		});
});

router.get("/peers", function(req, res, next) {
	client
		.listpeers()
		.then(result => {
			res.json({ status: "success", peers: result.peers });
		})
		.catch(errorResult => {
			res.json({ status: "error", error: errorResult.error });
		});
});

router.get("/invoice", function(req, res, next) {
	var label = req.query.label;
	var description = req.query.description;
	var satoshis = req.query.description;

	client
		.invoice(satoshis, label, description, 3600)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.json({ status: "error", error: errorResult.error });
		});
});

router.get("/decodepay", function(req, res, next) {
	var bolt11 = req.query.bolt11;

	client
		.decodepay(bolt11)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.json({ status: "error", error: errorResult.error });
		});
});

router.get("/pay", function(req, res, next) {
	var bolt11 = req.query.bolt11;

	client
		.pay(bolt11)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.json({ status: "error", error: errorResult.error });
		});
});

module.exports = router;
