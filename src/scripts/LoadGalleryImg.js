var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
  region: "ap-southeast-1",
});

console.log("Writing entries to Gallery Images table.");

var dynamoDB = new AWS.DynamoDB.DocumentClient();
var galleryImgData = JSON.parse(
  fs.readFileSync("../components/data/gallery_img.json", "utf-8")
);

galleryImgData.forEach(function (galleryImg) {
  var className = galleryImg.className;
  if (className.trim() == "") className = "no_class";
  var params = {
    TableName: "GalleryImg",
    Item: {
      src: galleryImg.src,
      alt: galleryImg.alt,
      className: className,
    },
  };

  dynamoDB.put(params, function (err, data) {
    if (err)
      console.log(
        "Unable to load data into table for GalleryImg",
        galleryImg.src,
        ". Error",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", galleryImg.src, "to table");
  });
});
