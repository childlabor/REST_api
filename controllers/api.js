// 不同与mvc,REST模式不直接渲染ctx.render()模板页，而是返回ctx.rest()一个对象(json数据)
const Koa = require('koa');

const APIError = require('../rest').APIError;

const AipOcrClient = require("baidu-aip-sdk").ocr;
const APP_ID = "14735340";
const API_KEY = "qNdsG2iirwCStgqxGdW0tVoS";
const SECRET_KEY = "8iaUCDn3ZmCgCwlwXbdDLbLkz653BGUo";
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
// const fs = require('fs');
// const image = fs.readFileSync("./statics/images/aaa.jpg").toString("base64");

class ApiTest {
		async api_test2(ctx, next) {
			// dosomthing...

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

		async orc_test(ctx, next) {

			let imageBase64 = ctx.request.body.imageBase64;
			// 异步请求百度接口解析图片 并返回解析值
			let BDreturnData = {};
		
			await client.generalBasic(imageBase64).then(function(result) {
				console.log(JSON.stringify(result));
				BDreturnData = result;
			}).catch(function(err) {
				// 如果发生网络错误
				console.log(err);
			})
			
			await	ctx.rest(BDreturnData);
					 
		}

}

module.exports = new ApiTest();
