# jQuery Equalizer

![](https://img.shields.io/badge/license-MIT-green.svg)
![](https://img.shields.io/badge/jQuery-%5E3.2.1-blue.svg)

A simple equalizer built on top of jQuery.

# Features

* Equalizes heights of `data-equalize-child` elements within `data-equalize-parent` elements
  * Looks for the highest height of the child elements and sets it for all child elements

# Usage

Place a data attribute called `data-equalize-parent` on a parent container which then contains
child elements, which should be equalized, with a `data-equalize-child` data attribute.

Note that child elements are not forced to be placed directly after the parent container.

## Basic example

```html
<div class="parent" data-equalize-parent>
    <div class="child" data-equalize-child></div>
    <div class="child" data-equalize-child></div>
    <div class="child" data-equalize-child></div>
</div>
```

# Demonstration

I have created an extra `demo.html` file to demonstrate the behavior of this
equalizer. Just open it in your browser and you're ready to go.

# TODOs

* Add functionality to nest equalizers.
* Avoid possible problems when viewing with different browsers in different versions

# License

MIT License

Copyright (c) 2017 Nicklas Reincke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
