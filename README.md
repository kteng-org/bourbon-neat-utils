[Check the demo website for examples](https://neat-utils.kteng.org)

# Bourbon Neat Utils

> An extension for [Bourbon Neat](https://neat.bourbon.io)


## Installation
Make sure you have installed [bourbon-neat](https://github.com/thoughtbot/neat).

```bash
$ npm install bourbon-neat-utils --save
```

Import the package into your Sass file.
```scss
@import "neat-utils";
```


### Usage
See all the examples on the [demo website](https://neat-utils.kteng.org/#container).

```scss
.block {
  @include container;
}
.block__element {
  // use one mxin for all the breakpoints
  @include columns(8 8 12 12);
}
```


### Settings

The breakpoints are already defined in the *$grids-default* variable, but of course you can overwrite them.
Create a Sass file like settings/grid.scss.

> **Grid breakpoints**<br>
You can overwrite these settings.

```scss
$grid-mobile:    (columns: 8,  gutter: 16px, media: 320px,  max-width: 100%,   color: orange);
$grid-portrait:  (columns: 8,  gutter: 20px, media: 560px,  max-width: 100%,   color: lime);
$grid-landscape: (columns: 12, gutter: 30px, media: 1024px, max-width: 100%,   color: tomato);
$grid-desktop:   (columns: 12, gutter: 30px, media: 1280px, max-width: 1280px, color: plum);

// don't forget to set the new breakpoints
$grids-default: ( mobile: $grid-mobile, portrait: $grid-portrait, landscape: $grid-landscape, desktop: $grid-desktop);
```

> **Multiple grid sets**


```scss
// Use the basic breakpoints and overwrite params: color, columns, gutter, media and max-width.
$grids-special: (
  mobile: map-merge($grid-mobile, (columns: 4, gutter: 20px)),
  portrait: map-merge($grid-portrait, (columns: 4)),
  landscape: map-merge($grid-landscape, (columns: 10, color: olive)),
  desktop: map-merge($grid-desktop, (columns: 10, max-width: 100%))
);

// Now you can use the $grids-default (default set) and your $grids-special-breakpoints set.
.block {
  @include container($grids: $grids-special);
}
.block__element {
  @include columns(2 2 3 3, $grids: $grids-special);
}
```

> **Container alignment**<br>
*options: left, right and center as default*

```scss
$container-alignment: left;
```


### Setup Hotkeys

Put this piece of code into your javascript file.

```js
import { initializeNeatHotkeys } from 'bourbon-neat-utils';

// Enable this parameter if you want to keep your toggle before refreshing the page.
// It will place a cookie 'visualize-grid' and toggles a "visualize-grid" class on your HTML tag.
const rememberHotkeys = true;

// You can get this value from the environment.
const production = false;

// You don't want to use this function in your production environment.
if (!production) {
  initializeNeatHotkeys(rememberHotkeys);
}
```

keys | action
--|--
<kbd>ctrl + l</kbd> | toggle columns