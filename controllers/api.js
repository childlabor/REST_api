// 不同与mvc,REST模式不直接渲染ctx.render()模板页，而是返回ctx.rest()一个对象(json数据)
const APIError = require('../rest').APIError;

const AipOcrClient = require("baidu-aip-sdk").ocr;
const APP_ID_OCR = "14735340";
const API_KEY_OCR = "qNdsG2iirwCStgqxGdW0tVoS";
const SECRET_KEY_OCR = "8iaUCDn3ZmCgCwlwXbdDLbLkz653BGUo";
const clientOcr = new AipOcrClient(APP_ID_OCR, API_KEY_OCR, SECRET_KEY_OCR);

var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
const APP_ID_IMG = "14776159";
const API_KEY_IMG = "hIue0MBbFggd1CCTwxCv0QT0";
const SECRET_KEY_IMG = "TsDECWo4NkCTNrZjDexA1gGGk5HvfVgE";
const clientImg = new AipImageClassifyClient(APP_ID_IMG, API_KEY_IMG, SECRET_KEY_IMG);
// const fs = require('fs');
// const image = fs.readFileSync("./statics/images/aaa.jpg").toString("base64");

class ApiTest {
		async api_test2(ctx, next) {
			let data={
				id: '123',
				name: 'childlabor'
			}
			ctx.rest(data);
		}
		
		async api_test(ctx, next) {
			let data = ctx.request.query; // 获取url?后的参数
			// 自定义响应条件
			if( data.id == '2'){
				ctx.rest(data);
			} else {
				throw new APIError('10001', `id不能为${data.id}`);
			}
		}

		async ocr_test(ctx, next) {
			let imageBase64 = ctx.request.body.imageBase64;
			let BDreturnData = {};
			await clientOcr.accurateBasic(imageBase64, {probability: true}).then(function(result) {
				console.log(JSON.stringify(result));
				BDreturnData = result;
			}).catch(function(err) {
				// 如果发生网络错误
				console.log(err);
			})
			await	ctx.rest(BDreturnData);				 
		}

		async plantDetect(ctx, next) {
			let options = {};
			options["baike_num"] = "2";
			let imageBase64 = ctx.request.body.imageBase64;
			// 异步调用百度sdk解析图片 并返回解析值
			let BDreturnData = {};
			await clientImg.plantDetect(imageBase64, options).then(function(result) {
				console.log(JSON.stringify(result));
				BDreturnData = result;
			}).catch(function(err) {
				// 如果发生网络错误
				console.log(err);
			})
			await	ctx.rest(BDreturnData);		 
		}

		// async getBingIma(ctx, next) {
				 
		// }

}

module.exports = new ApiTest();
