var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");


var app = express();
app.use(bodyParser.json({}));

app.use("/fbcallback", function (req, res, next) {


    console.log("request.body.entry: ", JSON.stringify(req.body.entry));

    var senderId = req.body.entry[0].messaging[0].sender.id;
    var pageId = req.body.entry[0].messaging[0].recipient.id;

    console.log("sender: ", senderId);
    console.log("pageId: ", pageId);

    var url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAICJsb8v2QBAM1ZBNo295Ei7zlLV0PTgQRpsTrD1PX7ZB87SjwhASHJaUXbYpPvtsfU5YWpQHrZAfJjtonOYvJErk5tJ9TY7C2OspBZA0JzotY02Y611icgKicy3epzJQIx5sIOrrH1o9tGhil6tBhbaMntGTeAZBhatXgZAioAZDZD"

    request.post({
        url: url,
        json: {
            "recipient": {
                "id": senderId
            },
            "message": {
                "text": "hello world response from inzi server!"
            }
        }
    }, function (error, response, body) {

        //checking if response was success
        if (!error && response.statusCode == 200) {
            console.log("response: ", response);
            console.log("response: ", response.body);
        } else {
            console.log("err: ", error);
        }
    });
    res.send('ok')
});



app.listen(3000, function () {
    console.log("listening on 3000");
});
