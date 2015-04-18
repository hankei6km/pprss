# pprss

A [Tiny Tiny RSS](http://tt-rss.org/) client
using [Polymer(0.5)](https://www.polymer-project.org/0.5/).

[![screenshot](https://raw.githubusercontent.com/hankei6km/pprss/master/docs/screenshot1_thumb.png)](https://raw.githubusercontent.com/hankei6km/pprss/master/docs/screenshot1.png)

## Setup

```bash
$ git clone https://github.com/hankei6km/pprss pprss
$ cd pprss
$ npm install && bower install
$ gulp build
```

If default using python3, add `--python` switch (i.e.`--python=/usr/bin/python2`) to `npm install`.

## Demo

* `$ gulp watch:demo`
* Open `http://localhost:4000/` in borwer -> Demo Application.
* Open `http://localhost:4000/index_demo.html` in borwer -> Demo Elements.


## Test

pprss test is using [web-component-tester](https://github.com/Polymer/web-component-tester).
Simply run test runner by `$ wct`.

or 

like a headless testing...

* `$ wct -p --webserver-port 5000` and close browser(do not close `wct` command).
* `$ gulp watch:test` and move browser window into another workspace.
* Test runner is run automatically when edit `test/**/*.html` files.


## Limitation

* pprss does not save login info to permanent storage.

* Error messages haven't include status detail. if you receive `status code = 0`, check `url` , `user / password`  or setting of corss origin in httpd server(i.e. `Header set Access-Control-Allow-Origin` in `httpd.conf`).

