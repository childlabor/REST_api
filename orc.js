var AipOcrClient = require("baidu-aip-sdk").ocr;
var APP_ID = "14735340";
var API_KEY = "qNdsG2iirwCStgqxGdW0tVoS";
var SECRET_KEY = "8iaUCDn3ZmCgCwlwXbdDLbLkz653BGUo";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

const fs = require('fs');
var image = fs.readFileSync(__dirname  + "/statics/images/ccc.jpg").toString("base64");

// class orcApi {
//   async orctest(ctx, next) { 
//     client.generalBasic(image).then(function(result) {
//       console.log(JSON.stringify(result));
//     }).catch(function(err) {
//       // 如果发生网络错误
//       console.log(err);
//     });
//   }
// }

module.exports = {
	
  // REST API前缀，默认为/api/:
  orctest: (image) => {	 
      return async (ctx, next) => {
        client.generalBasic(image).then(function(result) {
          console.log(JSON.stringify(result));
        }).catch(function(err) {
          // 如果发生网络错误
          console.log(err);
        });
      }
  }
}
// module.exports = new orcApi();