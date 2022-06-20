<br />
<br />
<br />
<p align="center">
  <a href="https://zabo.sparcs.org">
    <img src="src/static/logo/logo.svg" alt="Logo" height="150">
  </a>
  
  <p align="center">
    <img src="https://img.shields.io/badge/version-1.0-informational.svg" />
    <img src="https://img.shields.io/badge/license-MIT-black.svg" />
    <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fsparcs-kaist%2Fzabo-front-reactjs?ref=badge_shield">
	<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsparcs-kaist%2Fzabo-front-reactjs.svg?type=shield" />
    </a>
  </p>
  
  <p align="center">
    ZABO with modern JS, designed and developed by SPARCS
    <br />
    <a href="https://zabo.sparcs.org">Go to ZABO</a>
  </p>
</p>


# About

ZABO helps **KAIST students based** individuals or clubs advertising themselves via web based platform. While this service is open for public, **only approved groups** are able to post images. Please submit your request in order to create a new group via our website. 

This Project is being maintained by [SPARCS KAIST](https://github.com/sparcs-kaist)

We're expecting our users post there recruiting announcements, performance schedules, and any other events advertisments. However, there's no strict restrictions on contents that users upload.

Please contact us to get more detailed information.

If you're looking for backend codes, you can find it in [here](https://github.com/sparcs-kaist/zabo-server-nodejs)

# Previews

![upload](docs/Zabo_Upload_Process.gif)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Running Development Server](#running-development-server)
        - [Using npm](#npm)
        - [Using yarn](#yarn)
    - [Available Scripts](#available-scripts)
        - [Storybook](#storybook)
        - ~~[Generate Component](#generate-component)~~
        - [Post Build](#post-build)
        - [Pre-Commit](#pre-commit)
    - [Get Ready for Production](#get-ready-for-production)
        - [Using npm](#npm)
        - [Using yarn](#yarn)
- [Proxy API Requests](#proxy-api-requests)
- [Authentication](#authentication)
- [Built With](#built-with)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Authors](#authors)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Prerequisites

**You’ll need to have Node 16.15.1 or local development and production machine**. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.
Node.js. That's all you need.

```sh
node -v // v16.15.1
```

## Getting Started

### Running Development Server

#### npm

Run webpack dev server

```sh
npm install // Installing dependencied with node js package manager
npm start // Refer to react-scripts(https://www.npmjs.com/package/react-scripts) to learn more about this.
// Follow the instructions on terminal
```

#### yarn

Run server

```sh
yarn // Installing dependencied with node js package manager
yarn start // Refer to react-scripts(https://www.npmjs.com/package/react-scripts) to learn more about this.
// Follow the instructions on terminal
```

### Available Scripts

#### Storybook

```sh
yarn storybook
```

![cli](docs/storybook_cli.png)
![gui](docs/storybook.png)

#### Generate Component

**Using React hook, this script is no longer used.**

```sh
yarn generate [% component_architecture %] [% component_name %] "[% options %]"
```
* component_architecture :  One of [atoms, molecules, organisms, templates, pages]
* component_name : Captitalized first character is recommended (ex: HomePage)
* options (optional) : Combination of characters (r : react component, s : styled component, y : storybook, c : redux container) or '*' for all.
	Options must be captured inside quotes (" or ').
	Default option is "rsy"

#### Post Build

```sh
yarn postbuild
```

Helper script, making Front-end deployment graceful.

Automatically triggered after build command finishes.

#### Pre-Commit

```sh
yarn precommit
```

Lint and rewrite staged files.

Automatically triggered before commit.

### Get Ready for Production

#### npm

Build static files with webpack

```sh
npm install // Installing dependencied with node js package manager
npm run build  // Refer to react-scripts(https://www.npmjs.com/package/react-scripts) to learn more about this.
server -s deploy // or serve static files located in /deploy with whatever you like!
// I recommend you to set up production server with nginx. Please refer to [Deployment](#deployment) section for more.
```

#### yarn

Build static files with webpack

```sh
yarn // Installing dependencied with node js package manager
yarn build  // Refer to react-scripts(https://www.npmjs.com/package/react-scripts) to learn more about this.
server -s deploy // or serve static files located in /deploy with whatever you like!
// I recommend you to set up production server with nginx. Please refer to [Deployment](#deployment) section for more.
```

## Proxy API Requests

Using http-proxy-middleware, all requests are proxied to localhost:6001 on which our API server is located.

## Authentication

All requests sent from client are intercepted by an axios instance located in [axios.js](src/lib/axios.js).

Axios request interceptor attaches authentication token into request header.

## Built with

* [Atomic Web Design](http://bradfrost.com/blog/post/atomic-web-design/)
* [Create React App](https://create-react-app.dev/) - Easy set up for react project
* [Redux](https://redux.js.org/) - In-memory data structure store.

## Folder Structure
```
zabo-front
├── README.md
├── LICENSE.md
├── deploy
├── public
├── node_modules
├── package.json
├── .gitignore
├── tools
│   ├── generate-component.py
│   └── moveBuildFolder.sh
├── src
│   ├── index.js - Entry point
│   ├── App.js
│   ├── boot.js - Ran before rendering app
│   │
│   ├── components - All React Components
│   │   ├── container
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── templates
│   │   └── pages - Please refer to atomic web design (http://bradfrost.com/blog/post/atomic-web-design/)
│   │
│   ├── lib - Libraries and utility functions
│   ├── hoc - Higher order components (https://reactjs.org/docs/higher-order-components.html)
│   ├── locales - Translation files /en, /kr
│   ├── static - Static files such as images
│   └── store - Redux files
└── index.js  - Entry point
```

## Deployment

First, build static files with webpack regarding to [Get Ready for Production](#get-ready-for-production)
And then follow [zabo-server-nodejs deployment guide-line](https://github.com/sparcs-kaist/zabo-server-nodejs/tree/develop#running-production-server)

## Contributing

Please checkout [CONTRIBUTING.md](CONTRIBUTING.md) for more.


## Authors

* **Cookie** - [Cookie](https://github.com/jungdj)
* **Youns** - [Youns](https://github.com/Choiyounseo)
* **Hubo** - [bhanghj3094](https://github.com/bhanghj3094)
* **Hou** - [Sanghou](https://github.com/Sanghou)
* **Parang** - [pa-rang](https://github.com/pa-rang)
* **Paco** - [pacokwon](https://github.com/pacokwon)
* **Sniperj** - [sni-j](https://github.com/sni-J)
* **LuLu-jun** - [lulu-jun](https://github.com/LuLu-jun)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsparcs-kaist%2Fzabo-front-reactjs.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsparcs-kaist%2Fzabo-front-reactjs?ref=badge_large)

## Acknowledgments

We're renewing following projects.

[Zabo-WEB](https://github.com/sparcs-kaist/zabo-web) and [Zabo-API](https://github.com/sparcs-kaist/zabo-api)
