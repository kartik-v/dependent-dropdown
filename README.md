dependent-dropdown
==================

[![BOWER version](https://badge-me.herokuapp.com/api/bower/kartik-v/dependent-dropdown.png)](http://badges.enytc.com/for/bower/kartik-v/dependent-dropdown)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/dependent-dropdown/v/stable)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![License](https://poser.pugx.org/kartik-v/dependent-dropdown/license)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/dependent-dropdown/downloads)](https://packagist.org/packages/kartik-v/dependent-dropdown)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/dependent-dropdown/d/monthly)](https://packagist.org/packages/kartik-v/dependent-dropdown)

A multi level dependent dropdown JQuery plugin that allows nested dependencies. The plugin allows you to convert normal select inputs, whose options are derived based on value selected in another input/or a group of inputs. It works both with normal select options and select with optgroups as well.

> NOTE: The latest version of the plugin v1.4.8 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/dependent-dropdown/blob/master/CHANGE.md) for details.

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
- Triggers JQuery events for advanced development. Events currently available are `depdrop:init`, `depdrop:change`,
  `depdrop:beforeChange`,`depdrop:afterChange`, and  `depdrop:error`.
- Ability to configure HTML attributes of each `option` element via ajax response (for example dynamically disabling some dropdown options or adding styles).

## Documentation and Demo

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
<!-- optionally if you need translation for your language then include locale file as mentioned below -->
<script src="path/to/js/locales/<lang>.js"></script>
```

If you noticed, you need to load the `jquery.min.js` in addition to the `dependent-dropdown.min.css` and `dependent-dropdown.min.js` for the plugin to work with default settings. The locale file `js/locales/<lang>.js` can be optionally included for translating for your language if needed.

**Step 2:** Setup your select input markup to. Automatically set dependent dropdowns by adding the class `depdrop` and setting data attributes. 
NOTE: All select inputs must have a defined `ID` attribute for the plugin to work.

```html
<select id="parent-1">
   <!-- your select options -->
</select>

<select id="child-1" class="depdrop" data-depends="['parent-1']" data-url="/path/to/child_1_list">
   <!-- your select options -->
</select>

<select id="child-2" class="depdrop" data-depends="['parent-1', 'child-1']" data-url="/path/to/child_2_list">
   <!-- your select options -->
</select>
```
Due to array data being used for the data-depends attribute, you may need to escape the data like so:

```html
<select id="child-1" class="depdrop" data-depends="[&quot;parent-1&quot;]" data-url="/path/to/child_1_list">
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

## License

**dependent-dropdown** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
