/**
 * @license MIT License
 *
 * Copyright (c) 2017 Nicklas Reincke <contact@reynke.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

/**
 * @author Nicklas Reincke <contact@reynke.com>
 */
(function ($) {

    var allEqualized = false,
        parentAttributeName = 'data-equalize-parent',
        childAttributeName = 'data-equalize-child';

    /**
     * Resets all equalized elements.
     */
    var unequalizeAll = function () {

        // Unequalization unnecessary if already or not equalized
        if (allEqualized === false) {
            return;
        }

        $('[' + parentAttributeName + ']').each(function () {

            var childElements = $(this).find('[' + childAttributeName + ']');

            // Remove CSS inline-style "height" from all child elements
            childElements.each(function () {
                $(this).css('height', '');
                $(this).css('height', null);
            });
        });

        allEqualized = false;
    };

    /**
     * Validates the selected child if it is equalizeable.
     *
     * @param {jQuery} child
     * @returns {boolean} "true", if the data "equalize-up" couldn't be found or the current
     * window width is bigger than or equal to the value the data is holding. "false", if not.
     */
    var isEqualizeable = function (child) {

        if (child.data('equalize-up') === undefined) {
            return true;
        }

        var equalizeUp = +child.data('equalize-up'); // "+" converts to a number

        return $(window).width() >= equalizeUp;
    };

    /**
     * Equalizes all elements with data "data-equalize-parent" applied on
     * which has children with data "data-equalize-child" applied on.
     */
    var equalizeAll = function () {

        // Reset to be able to re-set the height value of the child elements
        unequalizeAll();

        $('[' + parentAttributeName + ']').each(function () {

            var maxHeight = -1;
            var children = $(this).find('[' + childAttributeName + ']');

            // Go through all children and get the highest height value
            children.each(function () {

                var child = $(this);

                if (!isEqualizeable(child)) {
                    return;
                }

                maxHeight = maxHeight > child.outerHeight() ? maxHeight : child.outerHeight();
            });

            // Go through all children to apply the highest height to them
            children.each(function () {

                var child = $(this);

                if (!isEqualizeable(child)) {
                    return;
                }

                // Apply the highest height to all children
                child.outerHeight(maxHeight);
            });

        });

        allEqualized = true;
    };

    // Initially equalize equalizable elements
    equalizeAll();

    // Re-equalize when window is being re-sized
    $(window).resize(function () {
        equalizeAll();
    });

}(jQuery));
