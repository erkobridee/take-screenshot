# take-screenshot

> phantomjs service to take screenshot from URL (with resize image support)


## Installation Guide

Enter the following commands in the terminal

```bash
$ git clone https://github.com/erkobridee/take-screenshot.git
$ cd take-screenshot
$ npm install
```


### Prerequisites

* Must have [Git](http://git-scm.com/) installed

* Must have [node.js (at least v0.10.0)](http://nodejs.org/) installed with npm (Node Package Manager)

* Must have [PhantomJS](http://phantomjs.org/)

  * custom build to work with web fonts

    * [[GitHub] eugene1g / phantomjs - PhantomJS 2.0 bin](https://github.com/eugene1g/phantomjs/releases/tag/2.0.0-bin) - works with webfonts [ PhantomJS 2.0.0 binaries for OSX and linux (temp, until upstream is patched) ]


## Use Guide

* [PhanthomJS screenshot.js](phantomjs/README.md)

### Web Server

```bash
$ node server
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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

English is the universal language nowadays, so please don't create or comment on issues using another language.


## CHANGELOG

Check [Releases](https://github.com/erkobridee/take-screenshot/releases)


## License

- [MIT](LICENSE)
