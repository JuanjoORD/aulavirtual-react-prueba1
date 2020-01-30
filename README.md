[![linux build](https://api.travis-ci.org/iroy2000/react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/iroy2000/react-redux-boilerplate)
[![Dependency Status][david_img]][david_site]
[![Join the chat at https://gitter.im/iroy2000-react-redux-boilerplate/Lobby](https://badges.gitter.im/iroy2000-react-redux-boilerplate/Lobby.svg)](https://gitter.im/iroy2000-react-redux-boilerplate/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### TL;DR

Before you dive into anything, see for yourself how easy you can setup a full workflow framework for your `development` and `deployment` for your real world project.

Step 1: Clone this repo
```
git clone https://github.com/CianCoders/react-redux-starter.git
cd react-redux-starter
```

Step 2: Create a virtualenv with python3 (BASE PYTHON 3.6)
- **IMPORTANT!** Before creating the virtual env, 
make sure the Python 3 version is 3.6 or higher.


```
mkvirtualenv starter --python=/usr/bin/python3
or 
mkvirtualenv starter --python=/usr/bin/python3.x
```

Step 3: Install the backend requirements

```
pip install -r requirements.txt
```

Step 4: Run the migrations

```
./manage.py migrate
```

Step 5: Start the backend

```
./manage.py runserver
```

Step 6: Start the frontend

```
cd frontend
npm i
npm start
```

And Done, as easy as 123!!


### Preface

React Redux Boilerplate is a full fledged __PRODUCTION READY__ workflow boilerplate for building complex React / Redux application.

### Features / Benefits

Features

* Django 2.1.2
* Django REST Framework 3.8.2
* React 16
* Redux
* ES6 / ES7
* ImmutableJS
* PreCSS ( supports SASS-like markup in your CSS )
* PostCSS ( it support CSS modules, and we recommended B.E.M style )
* Webpack 3
* Reselect
* Lazy Loading component supports
* Type Checking with Babel Type Check ( Flow syntax )
* ESLint for syntax check
* Jest and Enzyme for Unit testing
* Bootstrap 4
* Fontawesome

Workflow

* Development
  * Hot Module Reload during development
  * Built-in lightweight config system
  * Built-in fancy cli dashboard for reporting run time compile status
  * Built-in support for multiple device concurrent debugging
* Build / Production
  * Production bundle analyzing capability
  * CSS / HTML / JS minification / Image optimization when built
  * JS code duplication removal during built ( tree shaking capability )
* Deployment
  * Built-in git commit hook, helpful for CI/CD process
  * Built-in process to deploy files directly to S3 ( optional )
* Productivity
  * Highly configurable build and workflow system ( webpack )
  * Minimal setup time and allow you to invest into things that matters
  * Everything automatic, you just care about development, nothing else \o/ Yeah ?!

If you are interested, please read the `package.json` for all installed modules and plugins.

## Table of Contents

Basic
1. [Installation](#installation)
1. [Initialize your project](#initialize-your-project)
1. [Suggested Workflow](#suggested-workflow)
1. [Folder Structure](#folder-structure)
1. [Production Readiness](#production-readiness)
1. [Configuration](#configuration)
1. [Installing Dependencies](#installing-dependencies)


# Basic

## Installation


### Prerequisite

You need to have Node.js installed.

[Instruction for installing NodeJS in Mac](http://lmgtfy.com/?q=install+nodejs+mac)

[Instruction for installing NodeJS in Window](http://lmgtfy.com/?q=install+nodejs+window)

### Post Installation

If you would like to have Redux debug capabilities, you can download this Chrome extension [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

![Redux DevTool](https://www.dropbox.com/s/wni425e3d4xiy85/redux-devtool.png?raw=1)


## Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

**That's it!**


### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 30 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:8080/`

If you see the landing page, it means you have set up everything successfully.


### List of NPM Commands


```sh
$ npm run dev       # build and watch, but javascript not minified
$ npm run build     # build a minified production version
$ npm run lint      # linting using ESLint
$ npm run test      # run test using Jest
$ npm run clean     # it runs before each build, so you don't need to
```


## Suggested Workflow


After you check out the repo, I will usually do the following :

0. Go to your project root in your host machine  ( e.g. your Mac )
1. Run `npm run dev` in your terminal ( wait until the dashboard show complete status )
2. Go to your browser and go to `localhost:8080`
3. Make code changes
4. If there are compilation errors, you will see it in the terminal dashboard
5. Watch your code changes reflect on browser without refreshing
6. Repeat your development steps

That's very easy, isn't it?

## Folder Structure

The entry point of your application is `src/js/routes`, it's basically a mapping between your `views` to a `route`.

All your javascript code lives in folder `src/js`

```
  -- src/
    -- js/
      -- common/
        -- components/   --> all share components here
      -- redux/
        -- modules/      --> all redux code
      -- utility/        --> all non JSX utility
    -- style/            --> all global styles, layout, config
    -- assets/           --> all static assets ( image, fonts ... etc )
      -- template/       --> you probably won't touch this unless you want to create new template

```

* For `config/` and `bin/` folder, it is covered at [Configuration](#configuration) section

* For `__tests__/` folder, it is covered at [Writing Unit Test](#writing-unit-test) section

**NOTE: When you import resources, please make sure you have the right path**


## Production Readiness

React Redux Boilerplate supports production preview, which means that you can run the production build job and see how it looks like in production.

1. Run `npm run build` and wait until it is done
2. Go to the project `docroot`, you will see a `index.html`  (template is customizable, please read `Developing Template` section)
3. Open that `index.html` in your browser, and that is the build version that just got generated

That's very easy, isn't it?

### Difference between `npm run dev` v.s. `npm run build`

`npn run dev` is best to do JS / CSS only changes, and it comes with live reload functionality

`npm run build` is for testing what happen if your frontend assets are optimized ( production level code )


## Configuration
React Redux Boilerplate has two configuration strategies, one is for normal configuration, the other one is for sensitive information that you don't want others to know.

### Configuring application

If you look at folder `config`, there are four files

`default.json` - all default configuration
`development.json` - when you run `npm run dev`, it will pull configuration from that file
`release.json` - when you run `npm run build:release`, it will use this configuration
`production.json` - when you run `npm run build`, it will use this configuration

We are using [node-config](https://github.com/lorenwest/node-config), they have a pretty easy to understand documentation.


And in your config file ( json config file ), whatever you put inside the `app`, it will be injected into the client application and you can access to your `app` config data by using `__CONFIG__` variables.

Let's say you have a config like the following

```
{
  "app": {
    "apiURL": "http://foo.bar/"
  }
}

```

In your React application, you can access this variables

```
__CONFIG__.apiURL

```

__Note:__ If you want to add new npm target ( e.g. `npm run build:stage` ), you need to do the following :-

1. Add a `stage.json` file inside `config` folder
2. Add `npm run build:stage`  ( or similar ) at `package.json` scripts section
3. Add actual command mapping at `bin/commands.js`

### Configuring secret key/value pair

There are times you may want to put in `secret information` you don't want to check into the source code.  In this boilerplate, you just need to create a file called `.env` in your `PROJECT_ROOT`, and you can put your secret over there ( we have put that into `.gitignore` just in case ). For example, in order to use the feature to deploy to S3, you need to provide the following information.

```
AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY
AWS_BUCKET=YOUR_AWS_BUCKET
AWS_CDN_URL=YOUR_AWS_CDN_URL

```

And your in node application or webpack config, those key/value pair will inject into `process.env` ( e.g. `process.env.AWS_ACCESS_KEY` ).

__Note__: Using `.env` file is optional, it meant to keep secret and inject information into environment variables, if you are using Jenkin or alike type of tools, you can inject environment variables there.

However, with `.env`, you can create a ready to use list of environment variables for your different environment.  You can even have another service to generate the `.env` file before building the project, but in terms of how to achieve that, it is out of scope of this documentation.

__Just remember__, `.env` file suppose to keep your secret, and prevent your from saving sensitive secret into source code repository \0/ !! `DO NOT` check in `.env` into your source repo !!

We are using [dotenv](https://github.com/motdotla/dotenv) for the `.env` feature, they have pretty good documentation.

## Installing Dependencies

We are using `npm` in this project, so if you would like to install a dependencies, for example, D3, you can do something like the following :-

`npm i --save d3`


## License ?!
Not really
