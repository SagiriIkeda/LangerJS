# Langer DISCORD BOTS

## Install

To install this version as at the moment we do not have an `npm` you must download the following file, and preferably place it where your `index.js` is located

```js
https://cdn.jsdelivr.net/gh/SagiriIkeda/LangerJS@6.3/Discord/Langer.js
```
previous knowledge about classes, objects and arrays is recommended

it is recommended to first read the documentation of the `normal` version in order to better **understand**

## Import 

always remember to import the library in all files that need to use it.

```js
const LANGUAJE6 = require("./Langer.js")
```

## Idioms

Langer uses `.json` files as languages, you must create a folder where you contain your languages

```
├── your_languaje_folder
    ├── ES.json
    ├── EN.json
    ├── FR.json
    ├── KO.json
    ...
```

Example of some of your json files

```json
{
    "key": "¡Hellow world!",
    "settings": "Settings",
    "example": "this is an example using functions mat(4 + 5)"
}
```

## Initialization

To initialize the `LANGUAJE6.Create()` method is used, passing it the desired configurations, it is recommended to initialize in the `index.js`

```js
const LANGUAJE6 = require("./Langer.js")

// await is not required but it is recommended to place it.
let LANGUAJE = await LANGUAJE6.Create({
    functions: true,
    defaultText: "(undefined)",
    rout: "json/",
    languages: ["ES","EN"]
});
```

Unlike the normal version, in this one you must provide the `path` where your files are located at the time of initialization, you must also pass all the languages to be used by your bot as an `array`

| Property | Description | DEFAULT |
|---|---|---|
| `functions` | `Boolean` Activate or deactivate the functions in the json. | true |
| `defaultText` | `String` Text that will be used in case a key is not found in the selected language. | "(undefined)" |
| `rout` | `String` Text containing the path where your `.json` languages are located. | "" |
| `languages` | `Array` where all the languages that your bot will use will be passed in the form of a string. | [] |

### USE

Assuming that you are in a command handler, to start using your languages you must create an instance of a `LANGUAJECONTROLLER` passing it the desired language as a parameter, this instance using it as a function passing it a key will return the value of the language.

```js
//Example Code
const Discord = require("discord.js")
const LANGUAJE6 = require("./Langer.js")


module.exports = {
    name:"example",
    description:"",
    execute: (client,message,args) => {
        // Create an instance of a LANGUAGECONTROLLER by passing it the language to use.
        let keyParser = LANGUAJE6.Controller("ES");


        // Use the previously created instance as a function to return the content of its key.
        message.reply( keyParser("key") )

    }
}

```

## JSON Functions 

The functions are used to return something in the json obtained Example

```json
{
    "key": "This is an example using functions mat(4 + 5)"
}
```

```js
const LANGUAJE6 = require("./Langer.js");

let KeyParser = LANGUAJE6.Controller("EN");

console.log( KeyParser("key") );

//Keyparser will return "This is an example using functions 9"

```

`Note: It should be noted that the mat function was removed in version 6.0`

#### Default Functions 

```js
lang(key) //Returns the content of a language key.
```

#### Create your own Functions

To create your own functions you must use the method `LANGUAJE6.setFunction` passing the functions you want as parameters

```js
const LANGUAJE6 = require("./Langer.js");

//example
LANGUAJE6.setFunction(
    function hellow(value) {
        return "¡Hellow World!" + value; //Functions MUST return something.
    },
    function tree(value) {
        return "Forest"
    }
);
```

#### Disable Functions

To disable the functions in some `KeyParser` you should only pass it as the 2nd or 3rd parameter `true`

```js
const LANGUAJE6 = require("./Langer.js");

let keyParser = LANGUAJE6.Controller("ES");

// example of disabling functions
console.log( KeyParser("key",{},true) )

// Or if your KeyParser doesn't have any placeholders you can just put true as the second parameter to disable the functions.
console.log( KeyParser("key",true) )

```

## Placeholders

`Placeholders` can be used to display something that is not static, like a username

Placeholds are used differently in this version.

The syntax of the placeholders in the json is the following:

```json
{
    "test": "Hellow, %user%"
}
```

To use the placeholders in this version, you must pass as a second parameter an object with the placeholders you want to your `KeyParser`

```js
const LANGUAJE6 = require("./Langer.js");

let KeyParser = LANGUAJE6.Controller("ES");

console.log( KeyParser("test", { user: "Example" } ) )
// KeyParser will return "Hellow, Example"
```

## Utilities

utilities are functions that can be useful to you, such as to check if a language exists in the list of languages passed in the configurations

```js
const LANGUAJE6 = require("./Langer.js");

LANGUAJE6.has("es");

LANGUAJE6.findHas("es");

LANGUAJE6.languagesArray();
```

| function | Description |
|---|---|
| `LANGUAJE6.has` | parameter `String` Checks if a language exists `(regardless of its case)` returns true if it exists and false if it doesn't |
| `LANGUAJE6.findHas` | parameter `String` Checks if a language exists `(regardless of its case)` returns the exact name of the language if it exists and undefined if it doesn't |
| `LANGUAJE6.languagesArray` | returns an array of all existing loaded languages. |
