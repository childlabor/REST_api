const Router = require('koa-router');
const apitest = require('../controllers/api.js');

const router = new Router({
  prefix: '/api'
});

router
    // api模块
    .post('/test', apitest.api_test)
    .get('/test2', apitest.api_test2);
//  .put('xxx')
//  .delete('xxx')

module.exports = router;