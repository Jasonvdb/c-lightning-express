var express = require("express");
var router = express.Router();
var LightningClient = require("lightning-client");
var crypto = require("crypto");

var config = require("../config");

var apiKey = config.apiKey;
var secret = config.secret;
var lightningPath = config.lightningPath;

//Check required environment variables are set
var envErrors = [];
if (!apiKey) {
	envErrors.push("Please set API_KEY");
}

if (!secret) {
	envErrors.push("Please set SECRET");
}

if (!lightningPath) {
	envErrors.push(
		"Please set LIGHTNING_PATH (Directory of where c-lighting was installed)"
	);
}

if (envErrors.length > 0) {
	console.error("Please set required environment variables:");
	for (let index = 0; index < envErrors.length; index++) {
		console.error(envErrors[index]);
	}
	process.exit(1);
}

var client = new LightningClient(lightningPath, true);

function authenticateRequest(req, res, next) {
	var requestApiKey = req.query.apiKey;
	if (!requestApiKey) {
		console.error("Missing API key");
		res.status(400).json({
			status: "error",
			error: "Missing API key in request."
		});
		return;
	}

	if (apiKey !== requestApiKey) {
		console.error("Invalid API key");
		res.status(400).json({
			status: "error",
			error: "Invalid API key in request."
		});
		return;
	}

	var urlPath = "/api" + req.url;
	var apisign = req.headers.apisign;

	const checkSignature = crypto
		.createHmac("sha256", secret)
		.update(urlPath)
		.digest("hex");

	if (checkSignature !== apisign) {
		console.error("Invalid signature");
		res.status(400).json({
			status: "error",
			error: "Request signature invalid. Check secret."
		});
		return;
	}

	//Request is valid
	next();
}

router.get("/", function(req, res, next) {
	client
		.getinfo()
		.then(info => {
			res.render("api", {
				info
			});
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/docs", authenticateRequest, function(req, res, next) {
	res.json({
		status: "success",
		documentation: "https://github.com/Jasonvdb/c-lightning-express"
	});
});

router.get("/getinfo", authenticateRequest, function(req, res, next) {
	client
		.getinfo()
		.then(info => {
			res.json({ status: "success", info });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listpayments", authenticateRequest, function(req, res, next) {
	client
		.listpayments()
		.then(result => {
			res.json({ status: "success", payments: result.payments });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listpeers", authenticateRequest, function(req, res, next) {
	client
		.listpeers()
		.then(result => {
			res.json({ status: "success", peers: result.peers });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/listfunds", authenticateRequest, function(req, res, next) {
	client
		.listfunds()
		.then(result => {
			res.json({ status: "success", funds: result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/invoice", authenticateRequest, function(req, res, next) {
	var satoshis = req.query.satoshis;
	var label = req.query.label;
	var description = req.query.description;

	//satoshis to msatoshis
	client
		.invoice(satoshis * 1000, label, description, 3600)
		.then(invoice => {
			res.json({ status: "success", invoice });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/connect", authenticateRequest, function(req, res, next) {
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

router.get("/fundchannel", authenticateRequest, function(req, res, next) {
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

router.get("/decodepay", authenticateRequest, function(req, res, next) {
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

router.get("/pay", authenticateRequest, function(req, res, next) {
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

router.get("/listinvoices", authenticateRequest, function(req, res, next) {
	var label = req.query.label ? req.query.label : undefined;

	client
		.listinvoices(label)
		.then(result => {
			res.json({ status: "success", result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

router.get("/delexpiredinvoice", authenticateRequest, function(req, res, next) {
	client
		.delexpiredinvoice()
		.then(result => {
			res.json({ status: "success", result });
		})
		.catch(errorResult => {
			res.status(400).json({ status: "error", error: errorResult.error });
		});
});

module.exports = router;
