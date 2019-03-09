Change Log: `dependent-dropdown`
================================

## version 1.4.9

**Date:** 09-Mar-2019

- (enh #72): Correct validation for undefined groups idParam.
- (enh #72): Add Hungarian Translations.
- (enh #70): Add Portugese Translations.
- Update README for NPM install and updates to copyright year.

## version 1.4.8

**Date:** 01-Aug-2017

- (enh #69): Better `toString` parsing.

## version 1.4.7

**Date:** 25-Jul-2017

- Empty select input element more correctly in `renderSelect`.
- (bug #68): Remove obsolete init with `parseDisabled`.

## version 1.4.6

**Date:** 25-Jul-2017

- Enhance following events  to return ajax parameters for better exception handling.
  - `depdrop:beforeChange`
  - `depdrop:change`
  - `depdrop:error`
- (enh #67, #66): Add new method `getAjaxResults` to return the last output ajax data.
- (enh #65, #47): Enhancements for multi select dependency.
- (enh #64, #51): New property `skipDep` to allow skipping ajax dependency firing when value is empty or set to `loadingText`.
- (enh #54): Validate `disabled` initial attribute if set.
- (enh #44): Parse selected value variable type more correctly.

## version 1.4.5

**Date:** 11-Jul-2017

- Add package for npm.
- Add composer branch alias for latest dev-master release.
- Add github contribution templates. 
- (enh #63): Collate all locales files within `js/locales` folder.
- (enh #62): Modify event names to begin with `depdrop:`.
- (enh #60): Add Portuguese translations.
- (enh #49): Add Polish translations.
- (enh #46): Documentation fixes.
- (enh #43): Allow multiselect dependency and initializing selected values as an array.
- (enh #38): Add Italian translations.

## version 1.4.4

**Date:** 16-Dec-2015

- (enh #36): Enhance ability to configure HTML attributes for each option.
- (enh #35): AMD and Node Common JS Support.
- (enh #34): Make all parameter names configurable.
- (enh #33): Add language and localization support.
- (enh #32): Add property `emptyMsg`.
- (enh #29): Ability to configure and extend ajax settings

## version 1.4.3

**Date:** 14-Jul-2015

- (enh #28): Ability to configure HTML attributes for each option element via ajax.
- (enh #27): Better validation for value selected.

## version 1.4.2

**Date:** 18-Jun-2015

- (enh #24): Enhancement for Select2 plugin.
- (enh #23): New property `initDepends` to set all dependent parents in the chain.

## version 1.4.1

**Date:** 22-May-2015

- (enh #22): Fixes for JQuery v2.1.4 & Select2.
- (bug kartik-v/yii2-widget-depdrop#10): Fix process dependency params.
- (enh #20): Ability to configure `id` and `name` param names in json response.
- (enh #19): New `depdrop_all_params` that will be sent as an associative array (keys & values) to the server ajax action.

## version 1.4.0

**Date:** 01-Feb-2015

- (enh #16): Enhance Select2 dropdowns to show loading indicator.
- (enh #15): Implement reusable constructor for extending plugin if needed.
- (enh #14): Code cleanup and restructure for various JS lint changes (using JSHint Code cleanup library).
- (enh #10): Enhance ability to use checkbox or radio as the first dependent parent.
- Set composer minimum stability to stable.
- Updated trigger of afterChange event

## version 1.3.0

**Date:** 08-Nov-2014

- Updated CHANGE log to reflect user friendly date time formats.
- Set release to stable in composer.json.

## version 1.2.0

**Date:** 02-Jul-2014

- Enh #8: Ability to pass additional form input data within each ajax call.

## version 1.1.0

**Date:** 05-May-2014

- Added support for plugin to work with other plugins like Select2.
- Added loadingClass property to configure the loading indicator CSS.
- Updated placeholder to accept boolean value (false) to disable it.

## version 1.0.0

**Date:** 30-Apr-2014

Initial release.
