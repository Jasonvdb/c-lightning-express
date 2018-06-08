var express = require("express");
var router = express.Router();
var LightningClient = require("lightning-client");

var client = new LightningClient("/root/.lightning", true);

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

router.get("/info", function(req, res, next) {
	client
		.getinfo()
		.then(info => {
			client
				.listpeers()
				.then(peers => {
					res.json({ status: "success", info, peers: peers.peers });
				})
				.catch(error => {
					res.json({ status: "error", error });
				});
		})
		.catch(error => {
			res.json({ result: "error", error });
		});
});

router.get("/invoice", function(req, res, next) {
	var label = req.query.label;
	var description = req.query.description;

	client
		.invoice(1000, label, description, 3600)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(error => {
			res.json({ result: "error", error });
		});
});

router.get("/pay", function(req, res, next) {
	res.json({ result: "success" });
});

module.exports = router;
