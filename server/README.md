# take-screenshot : Web Server

## Usage

```bash
$ node server
```

* server port (default: 9000)

```bash
$ node server --port=1337
```


#### Proxy Support

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
