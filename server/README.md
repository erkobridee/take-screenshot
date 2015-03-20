# take-screenshot : Web Server

## Usage

```bash
$ node server
```

* server port (default: 9000)

```bash
$ node server --port=1337
```


### Proxy Support

```bash
$ node server --proxy
```

> load proxy config from environment variables
>
> * PROXY_SERVER = ip_host:port
>
> * PROXY_AUTH = username:password
>

or

```bash
$ node server --proxy=ip_host:port --proxy-auth=username:password
```

## Links

* [[GitHub] bcoe / yargs](https://github.com/bcoe/yargs) - yargs the modern, pirate-themed successor to optimist

* [[GitHub] hapijs / hapi](https://github.com/hapijs/hapi) - Server Framework for Node.js

* [[GitHub] hapijs / joi](https://github.com/hapijs/joi) - Object schema validation

* [[GitHub] hapijs / lout](https://github.com/hapijs/lout) - API documentation generator

* [[GitHub] ivanakimov / hashids.node.js](https://github.com/ivanakimov/hashids.node.js) - A small Node.js class to generate YouTube-like hashids from one or many numbers. Use hashids when you do not want to expose your database ids to the user

* [[GitHub] arturadib / shelljs](https://github.com/arturadib/shelljs) - Portable Unix shell commands for Node.js
