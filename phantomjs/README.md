# take-screenshot : PhantomJS - ScreenShot

* [PhantomJS Screen Capture](http://phantomjs.org/screen-capture.html)

  * to work with web fonts

    > use PhantomJS version 2.0.0
    >
    > custom build:
    > 
    > * [[GitHub] eugene1g / phantomjs - PhantomJS 2.0 bin](https://github.com/eugene1g/phantomjs/releases/tag/2.0.0-bin) - works with webfonts [ PhantomJS 2.0.0 binaries for OSX and linux (temp, until upstream is patched) ]

## Usage

```
Usage: phantomjs screenshot.js <command> [options]

Commands:
  source    URL or html file path
  dest      [path/]filename, if not defined will output base64 (PNG)

Options:
  --screenshot  page width x height x top ( default: 1024x768x0 )
  --resize  to width x height ( default: 250x200 )
    * do not resize image if not defined
  --delay   wait miliseconds before take screenshot ( default: 300 )
  --debug
    * if defined will print debug messages

Exemple:
  phantomjs phantomjs/screenshot.js http://page.html
  phantomjs phantomjs/screenshot.js http://page.html screenshot/output.png
  phantomjs phantomjs/screenshot.js http://page.html screenshot/output.png --resize
```

* proxy params

```
--proxy=ip_host:port --proxy-auth=user:pass
```


## commands examples

### from file

```bash
$ phantomjs screenshot.js ../from_file/html/basic.html thumbnail/basic.png

$ phantomjs screenshot.js ../from_file/html/basic.html

$ phantomjs screenshot.js ../from_file/html/bootstrap_example.html thumbnail/bootstrap_example.png

$ phantomjs screenshot.js ../from_file/html/bootstrap_example.html
```

### from url

```bash
$ phantomjs screenshot.js http://github.com/erkobridee thumbnail/github_erkobridee.png --delay=1000

$ phantomjs screenshot.js http://github.com/erkobridee thumbnail/github_erkobridee.png

$ phantomjs screenshot.js http://github.com/erkobridee

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js http://github.com/erkobridee thumbnail/github_erkobridee.png --delay=1000

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js http://github.com/erkobridee thumbnail/github_erkobridee.png

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js http://github.com/erkobridee
```

--

```bash
$ phantomjs screenshot.js https://material.angularjs.org/#/demo/material.components.button thumbnail/button.png 1024x700 300x250 --delay=2000

$ phantomjs screenshot.js https://material.angularjs.org/#/demo/material.components.button thumbnail/button.png --screenshot 1024x700 --resize 300x250

$ phantomjs screenshot.js https://material.angularjs.org/#/demo/material.components.button --screenshot 1024x700 --resize 300x250

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js https://material.angularjs.org/#/demo/material.components.button thumbnail/button.png --screenshot 1024x700 --resize 300x250 --delay=2000

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js https://material.angularjs.org/#/demo/material.components.button thumbnail/button.png --screenshot 1024x700 --resize 300x250

$ phantomjs --proxy=ip_host:port --proxy-auth=user:pass screenshot.js https://material.angularjs.org/#/demo/material.components.button --screenshot 1024x700 --resize 300x250
```

## Links

* [[GitHub] ariya / phantomjs / examples / waitfor.js](https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js)

* [[GitHub] ariya / phantomjs - ISSUE 11890](https://github.com/ariya/phantomjs/issues/11890) - Page.Content not working if contains img src="base64" /

* [PhantomJS - API](http://phantomjs.org/api/)

  * [Web Page Module](http://phantomjs.org/api/webpage/)

    * [open](http://phantomjs.org/api/webpage/method/open.html)

    * [content](http://phantomjs.org/api/webpage/property/content.html)

    * [viewportSize](http://phantomjs.org/api/webpage/property/viewport-size.html)

    * [clipRect](http://phantomjs.org/api/webpage/property/clip-rect.html)

    * [render](http://phantomjs.org/api/webpage/method/render.html)

    * [renderBase64](http://phantomjs.org/api/webpage/method/render-base64.html)

