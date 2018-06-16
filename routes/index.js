var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", {
		title: "c-lightning-express",
		description: "Lightning network REST API for c-lightning",
		link: "https://github.com/Jasonvdb/c-lightning-express"
	});
});

module.exports = router;
