# Chrome Extension Starter

A starter kit for Chrome Extensions.

## Setup

### Rebranding

Copy this project into a new folder and modify the following:

* `package.json` - name, description, repository, homepage, bugs, author
* `src/manifest.json` - name
* `src/img/*` - Change these to your branding

### Developing

1. `npm install`
2. Run `npm start`
3. Load the extension on Chrome following:
  1. Access `chrome://extensions/`
  2. Check `Developer mode`
  3. Click on `Load unpacked extension`
  4. Select the `build` folder.
  5. Extension will auto reload anytime webpack finishing compiling.
4. Rejoice!

### Change the Port

`npm start` starts a [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to auto reload code as it is saved.

You can run the server on another port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm start
```

or on Windows cmd:

```
$ set PORT=6002 npm start
```

**Note:** The [content scripts](https://developer.chrome.com/extensions/content_scripts) are excluded from hot reloading because they cannot connect to the local dev server since they run on different domains.

### Scripts

* `prebuild`: creates the `/builds` directory
* `build`: uses [webpack](https://webpack.js.org/) to create the extension in `/build`
* `postbuild`: zips the build into `/builds`
* `start`: runs the dev server for hot reloading extension
* `format`:  uses prettier to reformat the code
* `lint`: runs eslint on the code
* `lint-fix`: fixes any minor issues that eslint knows how to fix
* `postversion`: executes the build after an increase in the npm version

### Hooks

Githooks are managed using [husky](https://github.com/typicode/husky) and are located in `package.json`

* `pre-commit` - runs [pretty-quick](https://github.com/azz/pretty-quick) which runs [prettier](https://prettier.io/), an opinionated js formatter to help keep the code consistent
* `pre-push` - runs [eslint](https://eslint.org/) which has some additional validation of formatting and best practices to help keep the code clean.

## Packing

To create the compiled extension for distribution run:

```
$ npm run build
```
A new zip named `$npm_package_name-$npm_version.zip` will be created in `/builds`. This zip is ready to be submitted to the Chrome Web Store. Take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more information about publishing.

## What is going on where?

* **/src**
  * **/background**
    * **/index.js** - Runs the background processes and can be inspected from the [chrome://extensions/](chrome://extensions/) page
    * **/*.js** - Each background script should generally have 1 set of functionality. For example `open_options_page.js` opens the options page on extension update or installation.
  * **/content-script**
    * **/index.js** - Runs code on the current tab.
    * **/*.js** - Each content-script should generally have 1 set of functionality. For example `console_notify.js` just logs information to the console on each page.
  * **/img/*** - This is a home for any images shared by the *manifest.json*, *background*, *content-scripts*, *popup*, and *options*.
  * **/util/*.js** - This is a home for any utility scripts you may build that need to be shared across *background*, *content-scripts*, *popup*, and *options*.
  * **/view**
    * **components/*.js** - This is a home for the React components used by *popup* and *options* pages.
    * **popup/*.[html|js|scss]** - Runs when you click on the extension icon, and be inspected by right clicking on the popup.
    * **options/*.[html|js|scss]** - Displays when you right click on the extension icon and select *Options*.
  * **manifest.json** - Configuration information for the extension.  [Manifest Format](https://developer.chrome.com/apps/manifest)
* **/utils** - helpers scripts for configuring builds
* **/webpack** - Webpack configurations


## Included Packages

This starter includes some default packages that always seem to be useful.

* [axios](https://github.com/axios/axios) - Promised based HTTP Client
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/) and [React-Bootstrap](https://react-bootstrap.github.io) - Once react-bootstrap fully supports bootstrap 4 we will migrate to that as the default.
* [chrome-extension-async](https://github.com/KeithHenry/chromeExtensionAsync#readme) - Promised based wrapper for built in chrome functions (normally callback style). You can mix and match between the normal and promise.
* [jquery](https://jquery.com/) - Often used in content-scripts to manipulate the DOM of the current tab.
* [Lodash](https://lodash.com) - useful utilities for common js problems.
* [Moment.js](https://momentjs.com/) - date and time validation, parsing and manipulation.
* [React](https://reactjs.org/) - Latest framework that fits our needs.

## Special Thanks

Thanks to [Chrome Extension Webpack Boilerplate w/React](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/tree/react)!

---

# Built by Apsis

[![apsis](https://s3-us-west-2.amazonaws.com/apsiscdn/apsis.png)](https://www.apsis.io)

`chrome_extension_starter` was built by Apsis Labs. We love sharing what we build! Check out our [other libraries on Github](https://github.com/apsislabs), and if you like our work you can [hire us](https://www.apsis.io/work-with-us/) to build your vision.
