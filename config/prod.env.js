const useUrl = 'l'
const mock_url = 'http://192.168.4.11:3000'
const url={
  l: 'http://121.41.83.191:10010/api/', //真实
  t: 'http://127.0.0.1:3000',  //测试
  // p: 'http://192.168.4.36:3000'
}
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  J_API: url[useUrl],
  BASE_API: '"https://api-prod"'
}
