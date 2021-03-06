# Langer
Langer is a library to facilitate the creation of pages in various languages.

Documentation and DEMO at: https://langerjs.000webhostapp.com/

Langer uses json files to have your page in one language or another.

To install this library you must first link the js file in your `head` tag
```html
<script src="https://cdn.jsdelivr.net/gh/SagiriIkeda/LangerJS@6.3/src/Langer.min.js"></script>
```
you must use this syntax so that the content of your **.json** file can be returned
```html
<lang>key</lang>
```

now to start using langer you must first instantiate the `LANGUAJE6` class in a variable with the settings you want.
```js
let LANGUAJE = new LANGUAJE6({
    functions: true, //bolean: activate the functions in the json strings
    markdown: true, //bolean: activate the transformation by markdown
    autosave: true, //bolean: allows saving and loading the last language selected by the user.
    defaultText:"(undefined)" //string: Text that will be used in case a key is not found in the selected language.
});
```
your file structure where your languages are located look something like this
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
then you must indicate a folder where your languages will be found, for this use
```js
//example
LANGUAJE.setRoute("json/");
```
Now, to set the language of the page, you must indicate the **.json** file that will be used
```js
//example
LANGUAJE.set("EN"); //the data is being obtained in: "json/EN.json"
```
Good! If no error occurred, your label should look like this
```html
<!-- before -->
<lang>key</lang>
<!-- after use LANGUAJE.set() -->
<lang>¡Hellow world!</lang>
```
And every time you use `LANGUAJE.set(filename)` the elements will be updated to the new language!  

if instead of passing a string you pass an object as a parameter to `LANGUAJE.set()`, it will not look for a file but use the passed object as a language  

`example`
```js
LANGUAJE.set({
    key: "Hellow World without using a file!",
    settings: "Settings"
}); 
``` 
`result`
```html
<!-- before -->
<lang>key</lang>
<!-- after use LANGUAJE.set() -->
<lang>Hellow world without using a file!</lang>
```

## Functions

the functions serve to abbreviate or return something in string of the json obtained
`example`
<br>
```json
{
    "key": "this is an example using functions mat(4 + 5)"
}
```

```html
<!-- before -->
<lang>key</lang>
<!-- after use LANGUAJE.set() -->
<lang>this is an example using functions 9</lang>
```
``


### Defaults Functions

```js
lang(key) //return some language key
var(var) //return a variable content from your js code
```

`Note: It should be noted that the mat function was removed in version 6.0`

### create your own functions
to create your own functions you should use `LANGUAJE.setFunction(functions)`
```js
//example
LANGUAJE.setFunction(
    function hello(value) {
        return "¡Hellow World!" + value; //functions must necessarily return something.
    },
    function tree(value) {
        return "Forest"
    }
);
```
`NOTE: for your functions to be executed they must be defined before using LANGUAJE.set()`

### Disable Functions
if your element has the `noFunctions` attribute the functions will not be executed on it
```html
<!-- before -->
<lang noFunctions>key</lang>
<!-- after use LANGUAJE.set() -->
<lang noFunctions>this is an example using functions mat(4 + 5)</lang>
```

## Auto save last lenguage
If at the time of instantiating the `LANGUAJE5` class you set its `autosave` parameters to true, the last used language will be saved and at the time of reloading the page it will automatically be loaded.
```js
 let LANGUAJE = new LANGUAJE6({
     autosave: true //bolean: allows saving and loading the last language selected by the user.
 });
```
## PlaceHolders
Placeholders are used to display something that is not static, such as the name of a User

the syntax of the placeholders is the following for the .json:

```json
{
    "test": "Hello, %user%"
}
```
In order for the `%user%` placeholder to be **replaced** with the **content** you want, you must add an **attribute** with the same name as the **placeholder** to your `lang` element.

```html
<!-- Before use LANGUAJE.set() -->
<lang user="Example">test</lang>

<!-- After use LANGUAJE.set() -->
<lang user="Example">Hello, Example</lang>
```
`NOTE: 
for the placeholder to change, you must make sure that when you change the attribute it is before doing LANGUAGE.set()`

## Events `NEW`
Events are functions that will be executed when set a language

To set events, an object with the events to be executed must be added as a second parameter to a `LANGUAGE.set()`

```js
// Example Code
LANGUAJE.set("EN",{
    load() {
        //load will be executed once the file has been downloaded and is a valid JSON.
        console.log("loaded event")
    },
    error(code) {
        //error will be executed if an error occurs when importing the file, the error identifier is passed as a parameter

        //code: "404" means the file was not found

        //code: "InvalidJSON" means the file is not a valid JSON file
        console.log(code,"error event")
    },
});
```

## Langer Functions 
| function | action |
|---|---|
| `LANGUAJE.setRoute(rout)` | `parameter string` set folder where the json files will be obtained |
| `LANGUAJE.set(filename or object, object)` | `String parameter` Sets the file where the language will be retrieved from `Obj parameter` Sets the Language using the object passed to it `parameter 2 Obj` sets the events to run. |
| `LANGUAJE.Update()` | which allows updating the content of elements that were added after `LANGUAJE.set(filename)` |

## Important Note
`lang` elements are only to show the content of your data, if you want to style it or apply some class to it, it is recommended that you enclose it inside another element or a `div`.
```html
<!-- example -->
<div class="myclass"><lang>key</lang></div>
```

**`Thank you for reading! sorry for the mistakes in this documentation`  :sweat_smile:**
