Leak example

1. Leaky server

```shell
npm install
node leaky-server.js
kill -SIGUSR2 (leaky-server.js pid)
```

2. Stable server

```shell
npm install
node stable-server.js
kill -SIGUSR2 (stable-server.js pid)
```

1. open http://c4milo.github.io/node-webkit-agent/26.0.1410.65/inspector.html?host=localhost:9999&page=0
2. take heap snapshot
3. `node client.js 1000`
4. take heap snapshot
5. show differences
