const useUrl = 'p'
// const mock_url = 'http://192.168.4.11:3000'
const mock_url = 'http://47.97.46.201:7300/mock/5d477f3658e3b27a57d8a95b/gzrz/'
const url={
    l: 'http://192.168.4.12:8080/api/', //真实
    t: 'http://127.0.0.1:3000',  //测试
    p: 'http://www.diningspace.cn:8089/'
  }

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  J_API: url[useUrl],
  BASE_API: '"https://api-dev"',
  MOCK_API: mock_url
}
