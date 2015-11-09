dependent-dropdown
==================

[![BOWER version](https://badge-me.herokuapp.com/api/bower/kartik-v/dependent-dropdown.png)](http://badges.enytc.com/for/bower/kartik-v/dependent-dropdown)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/dependent-dropdown/v/stable)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![License](https://poser.pugx.org/kartik-v/dependent-dropdown/license)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/dependent-dropdown/downloads)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/dependent-dropdown/d/monthly)](https://packagist.org/packages/kartik-v/dependent-dropdown)

A multi level dependent dropdown JQuery plugin that allows nested dependencies. The plugin allows you to convert normal
select inputs, whose options are derived based on value selected in another input/or a group of inputs. It works both
with normal select options and select with optgroups as well.

> NOTE: The latest version of the plugin v1.4.3 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/dependent-dropdown/blob/master/CHANGE.md) for details.

## Features

- Apply the plugin on a select element and set dependency to one or more other input / select elements (including
  dependency nesting).
- Automatically convert `select` inputs with class `depdrop` to dependent dropdowns. The plugin supports HTML5 
  data attributes to configure the dependent dropdown options.
- Automatically initialize dependent dropdowns based on preselected values (useful for update scenario).
- Supports both `select` input with basic `options` and select with `optgroups`.
- Automatically lock/disable the dependent dropdown until dependent results are available.
- The plugin uses ajax call to the server to render the list of dependent options.
- Allows a loading indicator to be displayed in dependent select until the results are fetched from the server.
- Configure your own loading progress text to be displayed for each dependent dropdown before the results are fetched from the server.
- Display a placeholder label with an empty value. For `optgroups` automatically disable this option.
- Triggers JQuery events for advanced development. Events currently available are `depdrop.init`, `depdrop.change`,
  `depdrop.beforeChange`,`depdrop.afterChange`, and  `depdrop.error`.
- Size of the entire plugin is less than 4KB (about 3KB for the minified JS and 1KB for the minified CSS).
- Ability to configure HTML attributes of each `option` element via ajax response (for example dynamically disabling some dropdown options or adding styles).

## Demo

View the [plugin documentation](http://plugins.krajee.com/dependent-dropdown) and
[plugin demos](http://plugins.krajee.com/dependent-dropdown/demo) at Krajee JQuery plugins.

## Pre-requisites

1. Latest [JQuery](http://jquery.com/)
2. All select inputs in markup must have a defined `ID` attribute for the plugin to work.
3. Tested to work currently with default HTML select input. It is not tested to work with other JQuery plugins that enhance
   the HTML select input (e.g. Select2, multiselect etc.). However, the plugin exposes events, which can be used in
   such situations.
4. The dependent dropdown is generated using an ajax call and hence requires a web server and web programming language to
   generate this. The plugin passes the dependent id values as an input to the ajax call via POST action. The ajax response
   should be a JSON encoded specified format like below:

   ```
   {output: <dependent-list>, selected: <default-selected-value>}
   ```

  where,

  - `output` is an array of data for the dependent list of the format

  ```
  {id: <option-value>, name: <option-name>}
  ```

  - `selected` is the default selected value after the dependent dropdown is generated.

  If you desire a dependent list  containing `optgroups` then the `output` must be of the format

  ```
  {group-name: {id: <option-value>, name: <option-name>}}
  ```
  
  When no data is available for a specific situation (like an backend error), you can send a custom emptyMsg

  ```
   {emptyMsg: '<your message>'}
  ```

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install dependent-dropdown

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/dependent-dropdown "@dev"

or add:

    "kartik-v/dependent-dropdown": "@dev"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source
[ZIP](https://github.com/kartik-v/dependent-dropdown/zipball/master) or
[TAR ball](https://github.com/kartik-v/dependent-dropdown/tarball/master) and extract the
plugin assets (css and js folders) into your project.

## Usage

**Step 1:** Load the following assets in your header.

```html
<link href="path/to/css/dependent-dropdown.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="path/to/js/dependent-dropdown.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `jquery.min.js` in addition to the `dependent-dropdown.min.css` and
`dependent-dropdown.min.js` for the plugin to work with default settings.

**Step 2:** Setup your select input markup to. Automatically set dependent dropdowns by adding the class `depdrop` and setting data attributes. 
NOTE: All select inputs must have a defined `ID` attribute for the plugin to work.

```html
<select id="parent-1">
   <!-- your select options -->
</select>

<select id="child-1" class="depdrop" depends="['parent-1']" url="/path/to/child_1_list">
   <!-- your select options -->
</select>

<select id="child-2" class="depdrop" depends="['parent-1, 'child-1']" url="/path/to/child_2_list">
   <!-- your select options -->
</select>
```

**Step 2 (Alternative):** You can initialize the plugin via javascript for your dependent dropdowns. For example,

```js
$("#child-1").depdrop({
    depends: ['parent-1'],
    url: '/path/to/child_1_list'
});

$("#child-2").depdrop({
    depends: ['parent-1', 'child-1'],
    url: '/path/to/child_2_list'
});

```

## Documentation

### Plugin Options
The plugin supports these following options:

##### depends
_array_ the list of parent input `ID` attributes on which the current dropdown is dependent on. DO NOT prepend any hash
before the input id.

##### initDepends
_array_ the list of INITIAL nested parent input`ID` attributes on which the current dropdown is dependent on. This is applicable only when`initialize` is set to`true` (for firing the ajax requests on page initialization). Usually you may set it to the topmost parent in the hierarchy while initializing, unless you have complex multiple many to many dependencies. The ajax requests will be fired in sequence based on these dependent ids. DO NOT prepend any hash before the input id. If not set, this will default to`depends`. For example you could use`depends` and`initDepends` in the following manner:

```js
$("#child-1").depdrop({
    depends: ['parent-1'],
    url: '/path/to/child_1_list'
});

$("#child-2").depdrop({
    depends: ['child-1'], // dependent only on child-1
    url: '/path/to/child_1_list'
});

$("#child-3").depdrop({
    depends: ['child-2'], // dependent only on child-2
    initDepends: ['parent-1'], // initial ajax loading will be fired first for parent-1, then child-1, and child-2
    initialize: true,
    url: '/path/to/child_2_list'
});
```

##### params
_array_ the list of additional input `ID` attributes, whose values will be parsed and passed to the ajax call. DO NOT 
prepend  any hash before the input id. When this is setup, the `$_POST` request would contain an array named `depdrop_params`
with the values of these input identifiers. For example in PHP you can retrieve this as:

```php
    if (!empty($_POST['depdrop_params'])) {
        $params = $_POST['depdrop_params'];
        $param1 = $params[0]; // the first parameter value you passed
        $param2 = $params[1]; // the second parameter value you passed
        // and so on
    }
```

> NOTE: In addition to `depdrop_params`, the plugin sends `depdrop_all_params` as an associative array of keys and values. This is sent merged along with the keys and values of `depdrop_parents`. Read more about this in the `url` section below.

##### url
_string_ the ajax url action which will process the dependent list. The server action must return a JSON encoded
specified format like `{output: <dependent-list>, selected: <default-selected-value>}`.
where, the `output` is an array of data for the dependent list of the format `{id: <option-value>, name: <option-name>}`,
and `selected` is the default selected value after the dependent dropdown is generated. If you desire a dependent list
containing optgroups then the `output` must be of the format `{group-name: {id: <option-value>, name: <option-name>}}`.

The plugin passes an array of dependent values as a POST request to the server under a variable name `depdrop_parents`. In addition, the plugin also passes a property `depdrop_all_params` that will be an associative array of keys and values (it merges the values of `depdrop_parents` and `depdrop_params`). The keys are the element identifiers for dependent dropdown parent elements and the element identifiers set via `params` property.
This can be read by the server action to generate a dependent dropdown list. An example for a PHP server action could be:

```php
public function generateChildren() {
    $out = [];
    if (isset($_POST['depdrop_parents'])) {
        $parents = $_POST['depdrop_parents'];
        if ($id != null) {
            $out = getChildList($parents);
            /*
             * the `getChildList` function can query a db and return array of format
             * {id: <val>, name: <desc>}, based on the list of parents passed.
             */
            echo json_encode(['output' => $out, 'selected'=>'']);
            return;
        }
    }
    if (isset($_POST['depdrop_all_params'])) {
        for ($_POST['depdrop_all_params'] as $key => $value) {
            // $key = Element ID 
            // $value = Element Value
        }
    }
    echo json_encode(['output' => '', 'selected'=>'']);
    // note when a null or empty array is returned, the plugin will display `emptyMsg`
    // in the dependent dropdown
}
```

>NOTE: If you return a null value or an empty array from the server, the plugin will display the `emptyMsg` in the
dependent dropdown. The dependent select will always be disabled until the server returns a valid list of values.

##### initialize
_boolean_ This is an important attribute if you want to auto initialize and populate the dropdowns by triggering the ajax calls when
document is loaded. You must set this to `true` only for the last child in the nested dependency list, so that initial preselected values are 
refreshed sequentially in the nested hierarchy. Defaults to `false`. If this property is not `true` for any dependent dropdown, no ajax 
calls will be triggered on document load (i.e. the dropdowns will show the default data set by the html markup set on init).

##### loading
_boolean_ whether to show a loading progress spin indicator and the loading text in the child dropdown element when server is 
processing the ajax response. Defaults to `true`.

##### loadingClass
_string_ the CSS class to attach to the child dropdown element when the server is processing the ajax response. 
Defaults to `kv-loading`.

##### loadingText
_string_ the text to display in the child dropdown element when the server is processing the ajax response. 
Defaults to `Loading ...`.

##### placeholder
_string_ | _boolean_ whether the child select has a default placeholder. This will create an option with an 
empty value within the child select element. For optgroups this will be a disabled option. If you 
set this to `false`, it will not be displayed. Defaults to `Select ...`.

##### emptyMsg
_string_ the message to display when the ajax response returned from the server is null or an empty array. Defaults to
`No data found`.

##### idParam
_string_ the name of the parameter that returns the `id` value for each list option item via json response. Defaults to `id`.

##### nameParam
_string_ the name of the parameter that returns the `name` value for each list option item via json response. Defaults to `name`.

### Plugin Events
The plugin supports these events:

#### depdrop.init
This event is triggered when the dependent dropdown is initialized.

#### depdrop.ready
This event is triggered when the dependent dropdown is initialized with values, after document is loaded and ready.

**Example:**
```js
$('#input-id').on('depdrop.init', function(event) {
    // perform any action
});
```

#### depdrop.change
This event is triggered when a dependent parent input is modified or changed. This event also allows you to access
these parameters:

- `id`: the parent dependent dropdown element id.
- `value`: the parent dependent dropdown value.
- `count`: the count of options generated in the dependent dropdown.
- `initVal`: the initial preselected value in the dependent dropdown. 
   Defaults to `false` if not set.

**Example:**
```js
$('#child-1').on('depdrop.change', function(event, id, value, count) {
    console.log(value);
    console.log(count);
});
```

#### depdrop.beforeChange
This event is triggered when a dependent parent input is modified or changed and before the ajax response is sent
to the server. This event also allows you to access these parameters:

- `id`: the parent dependent dropdown element id.
- `value`: the parent dependent dropdown value.
- `initVal`: the initial preselected value in the dependent dropdown. 
   Defaults to `false` if not set.

**Example:**
```js
$('#child-1').on('depdrop.beforeChange', function(event, id, value) {
    console.log(value);
});
```

#### depdrop.afterChange
This event is triggered when a dependent parent input is modified or changed and after the ajax response is processed
by the server. This event also allows you to access these parameters:

- `id`: the parent dependent dropdown element id.
- `value`: the parent dependent dropdown value.
- `initVal`: the initial preselected value in the dependent dropdown. 
   Defaults to `false` if not set.

**Example:**
```js
$('#child-1').on('depdrop.afterChange', function(event, id, value) {
    console.log(value);
});
```

#### depdrop.error
This event is triggered when a dependent parent input is modified or changed and if an error is faced in 
the ajax response processed by the server. This event also allows you to access these parameters:

- `id`: the parent dependent dropdown element id.
- `value`: the parent dependent dropdown value.
- `initVal`: the initial preselected value in the dependent dropdown. 
   Defaults to `false` if not set.

**Example:**
```js
$('#child-1').on('depdrop.error', function(event, id, value) {
    console.log(value);
});
```

### Plugin Methods
The plugin supports these methods:

#### init
Initialize the dependent dropdown.
```js
$('#input-id').depdrop('init');
```

## License

**dependent-dropdown** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
