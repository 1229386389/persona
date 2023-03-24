const express = require('express')
const app = express()

const port = process.env.PORT || 5000
console.log(port)
app.use(express.static('./public'))
// 绑定并监听指定主机和端口上的连接。此方法与 Node 的http.Server.listen()相同。
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
