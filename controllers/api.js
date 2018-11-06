// 不同与mvc,REST模式不直接渲染ctx.render()模板页，而是返回ctx.rest()一个对象(json数据)

const APIError = require('../rest').APIError;

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

}

module.exports = new ApiTest();
