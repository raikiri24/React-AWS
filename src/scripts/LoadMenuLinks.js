var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  region: "ap-southeast-1",
});

console.log("Writing entries to MenuLinks table.");

var dynamoDB = new AWS.DynamoDB.DocumentClient();
var menuLinksData = JSON.parse(
  fs.readFileSync("../components/data/menu_links.json", "utf-8")
);

menuLinksData.forEach(function (menulinks) {
  var params = {
    TableName: "MenuLinks",
    Item: {
      class: menulinks.class,
      href: menulinks.href,
      text: menulinks.text,
    },
  };

  dynamoDB.put(params, function (err, data) {
    if (err)
      console.log(
        "Unable to load data into table for menulinks",
        menulinks.text,
        ". Error",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", menulinks.text, "to table");
  });
});
