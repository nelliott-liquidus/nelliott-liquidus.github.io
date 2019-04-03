# Bannerlink 6 Node Application
![Lando System](https://cdn3.movieweb.com/i/article/vVUlE6JfkZuqdFG7qpLefYSIm4aqhf/738:50/Han-Solo-Movie-Billy-Dee-Williams-Lando-Return.jpg)

## What it does:

Bannerlink 6 is a Node server application that takes a JSON schema for a banner (see [./src/schema.js](https://github.com/liquidus-marketing/bannerlink-v6/blob/master/src/schema.js)), saves it to the Mongo database, and exports a static html/css/js payload.  Schema.js will eventually be replaced by a schema generated from Ad Builder, but for development purposes we can use it to generate our own preset banners to work from.  

The payload is split into 2 html files.  The first includes the global banner functionality (event tracking, state changing, etc.) and a single preview state (usually containing only a coverpage, but can be a state with many components like any other).  The second contains all the rest of the banner components.  EVERYTHING is a [component](https://github.com/liquidus-marketing/bannerlink-v6/blob/master/src/Components/Component.js), including the banner itself.

## Enchiridion:

1. Clone the repository, navigate to your local folder, and run 'npm i' to install external dependencies.
2. Create a .env file in the root for your environment settings.  Here is my .env file for example:
    ~~~~
    # LOCAL DEV
    PORT=2047
    FILESERVER_PORT=2048
    APP_BASE_URL=http://localhost:2048/
    MONGO_URL=mongodb+srv://sa:ySKh6083@cluster0-sj1bg.azure.mongodb.net/test?retryWrites=true
    DB_NAME=bannerlink6
    # EXTERNAL SERVICES
    NAPI_BASE=https://qa-api.cofactordigital.com/retail/
    TRACKING_LIQUIDUS_BASE=https://dazzler.liquidus.net/
    TRACKING_COFACTOR_BASE=http://it3p.shoplocal.com/it.ashx?v3
    # FOR USER AUTHENTICATION
    GOLDLEADER_URL=https://goldleaderdev.liquidus.net/
    GOLDLEADER_CLIENT_ID=h1N86PNX5r2Y
    ~~~~
   Do not commit this .env file!  It's only for your local use.

3. Run 'npm start'
4. App will run with environment configuration specified in .env

### Windows development

In some cases, the http server won't work on Windows boxes.  If this is the case, make a new website in IIS with the website root set to the project root folder and the port set to the FILESERVER_PORT listed in .env.  You will also need to install the [IIS CORS Module](https://www.iis.net/downloads/microsoft/iis-cors-module).

## New Banner Paradigm

Each banner consists of an array of States, each of which containing an array of Components.  Each state has an optional Transition property, which contains instructions for animating that scene both in and out.  States can be set to auto transition into the next state after a variable period of time.  Each component's click action can be configured to go a clickThruURL, go to the next state, or go to the previous state.  This is into any additional interactive functionality included in a component.

The most effective workflow for building/maintaining components is to make presets by editing the schema.  To do this, navigate to the locally running app in the browser, click edit, then save as a preset with a new name.  Now you can access your banner via the Presets page and continue component development.
