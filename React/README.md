# LANGER React Version 5.5.1

Version of Langer compatible with React JS `Note: If your project does not use React do not use this version`

We recommend **reading** the **documentation of the normal version first** in order to **understand** things **better**.

**to install this version use**

```html
<script src="https://cdn.jsdelivr.net/gh/DouglasAndres2020/Langer@5.5.2/React/Langer.min.js"></script>
```

the way to initialize is the same as the normal version!
```js
let LANGUAJE = new LANGUAJE5({
    functions: true, //bolean: activate the functions in the json strings
    markdown: true, //bolean: activate the transformation by markdown
    autosave: true //bolean: allows saving and loading the last language selected by the user.
});
```

The way to set the path of the `.json` files remains the same

```js
LANGUAJE.setRoute("json/"); //the folder where the data will be obtained
LANGUAJE.set("EN"); //the data is being obtained in: "json/EN.json"
```

but, the way to create elements now is using `Lang` components! Which will be updated if they are added after `LANGUAGE.set()` without the need to do `LANGUAGE.Update()`

```js
<Lang>key</Lang>
```

## Placeholders `BETA`
the way to use placeholders with react is different, to use them you must add the `place` property to your `lang` component with an object with the placeholders you want

```json
{
    "test":"Welcome, %user%"
}
```
```js
//example
<Lang place={{user:"Example"}}>test</Lang>
```


