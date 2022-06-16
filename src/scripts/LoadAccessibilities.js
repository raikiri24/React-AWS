var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  region: "ap-southeast-1",
});

console.log("Writing entries to Accessibilities table.");

var dynamoDB = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = JSON.parse(
  fs.readFileSync("../components/data/accessibilities.json", "utf-8")
);

accessibilitiesData.forEach(function (accessibility) {
  var params = {
    TableName: "Accessibilities",
    Item: {
      name: accessibility.name,
    },
  };

  dynamoDB.put(params, function (err, data) {
    if (err)
      console.log(
        "Unable to load data into table for accessibility",
        accessibility.name,
        ". Error",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", accessibility.name, "to table");
  });
});
