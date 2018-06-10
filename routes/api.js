var express = require("express");
var router = express.Router();
var LightningClient = require("lightning-client");

var client = new LightningClient("/root/.lightning", true);

//TODO intercept request
//Check the API key
//Check the signed URL matched the url signed with the secret on the server

router.get("/", function(req, res, next) {
	//TODO list available functions here
	res.send("Available functions coming soon.");
});

router.get("/getinfo", function(req, res, next) {
	client
		.getinfo()
		.then(info => {
			res.json({ status: "success", info });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listpayments", function(req, res, next) {
	client
		.listpayments()
		.then(result => {
			res.json({ status: "success", payments: result.payments });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listpeers", function(req, res, next) {
	client
		.listpeers()
		.then(result => {
			res.json({ status: "success", peers: result.peers });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listfunds", function(req, res, next) {
	client
		.listfunds()
		.then(result => {
			res.json({ status: "success", funds: result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/invoice", function(req, res, next) {
	var satoshis = req.query.satoshis;
	var label = req.query.label;
	var description = req.query.description;

	client
		.invoice(satoshis, label, description, 3600)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/connect", function(req, res, next) {
	var nodeId = req.query.nodeId;
	var ipAddress = req.query.ipAddress;
	var port = req.query.port;

	client
		.connect(
			nodeId,
			ipAddress,
			port
		)
		.then(result => {
			res.json({ status: "success", result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/fundchannel", function(req, res, next) {
	var nodeId = req.query.nodeId;
	var satoshis = req.query.satoshis;

	client
		.fundchannel(nodeId, satoshis)
		.then(result => {
			res.json({ status: "success", result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
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
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/pay", function(req, res, next) {
	//Sometimes scans have this in the string, remove it in case
	var bolt11 = req.query.bolt11.replace("lightning:", "");

	client
		.pay(bolt11)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

module.exports = router;
