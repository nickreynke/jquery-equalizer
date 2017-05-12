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

    /**
     * Used to identify if equalizable elements were already equalized.
     *
     * @type {boolean}
     */
    var alreadyEqualized = false;

    /**
     * The parent data attribute name is used to identify a parent
     * element which contains child elements.
     *
     * This attribute is required.
     *
     * @type {string}
     */
    const ATTRIBUTE_EQUALIZE_PARENT = 'equalize-parent';

    /**
     * The child data attribute name is used to identify child
     * elements within a parent element.
     *
     * This attribute is required.
     *
     * @type {string}
     */
    const ATTRIBUTE_EQUALIZE_CHILD = 'equalize-child';

    /**
     * Optional data attribute name to tell the equalizer when to start to equalize.
     *
     * @type {string}
     */
    const OPTIONAL_ATTRIBUTE_EQUALIZE_FROM = 'equalize-from';

    /**
     * Optional data attribute name to tell the equalizer when to stop to equalize.
     *
     * @type {string}
     */
    const OPTIONAL_ATTRIBUTE_EQUALIZE_TO = 'equalize-to';

    /**
     * Resets all equalized elements.
     *
     * Necessary to unset all CSS inline-styled heights to get the real height of the highest element.
     */
    function unequalizeAll() {

        // Unequalization unnecessary if already or not equalized
        if (alreadyEqualized === false) {
            return;
        }

        $('[data-' + ATTRIBUTE_EQUALIZE_PARENT + ']').each(function () {

            // Find all child elements with their desired data attribute
            var childElements = $(this).find('[data-' + ATTRIBUTE_EQUALIZE_CHILD + ']');

            // Remove CSS inline-style "height" from all child elements
            childElements.each(function () {
                $(this).css('height', '');
                $(this).css('height', null);
            });
        });

        alreadyEqualized = false;
    }

    /**
     * @todo Change description.
     *
     * Validates a child if it is equalizable depending on its parent element.
     *
     * @param {jQuery} parent
     * @returns {boolean} @todo
     */
    function areChildrenEqualizeable(parent) {

        // If no optional data attributes are present > equalize.
        if (!hasOptionalEqualizeAttributes(parent)) {
            return true;
        }

        var hasDataAttributeEqualizeFrom = hasOptionalDataAttribute(parent, OPTIONAL_ATTRIBUTE_EQUALIZE_FROM);
        var hasDataAttributeEqualizeTo = hasOptionalDataAttribute(parent, OPTIONAL_ATTRIBUTE_EQUALIZE_TO);

        // Both "data-equalize-from" and "data-equalize-to" data attributes set?
        if (hasDataAttributeEqualizeFrom && hasDataAttributeEqualizeTo) {

            // Is window width in range of both data attribute values?
            return screenWidthBiggerThanStartValue(parent) && screenWidthSmallerThanEndValue(parent);
        }

        if (hasDataAttributeEqualizeFrom) {
            return screenWidthBiggerThanStartValue(parent);
        }

        if (hasDataAttributeEqualizeTo) {
            return screenWidthSmallerThanEndValue(parent);
        }

        return false;
    }

    /**
     * Check if there are any data attributes present on the given element.
     *
     * Necessary to save some performance instead of checking each attribute (which is'nt available).
     *
     * @param {jQuery} element
     * @returns {boolean} "true", if an optional data attribute was found. "false", if not.
     */
    function hasOptionalEqualizeAttributes(element) {

        var optionalEqualizeAttributeNames = [
            OPTIONAL_ATTRIBUTE_EQUALIZE_FROM,
            OPTIONAL_ATTRIBUTE_EQUALIZE_TO
        ];

        for (var i = 0; i < optionalEqualizeAttributeNames.length; i++) {

            var optionalEqualizeAttributeName = optionalEqualizeAttributeNames[i];

            if (element.data(optionalEqualizeAttributeName) === undefined) {
                continue;
            }

            return true;
        }

        return false;
    }

    /**
     * Checks if the given data attribute is present for the desired element.
     *
     * @param {jQuery} element
     * @param {string} dataAttributeName
     * @returns {boolean} "true", if the data attribute is present. "false", if not.
     */
    function hasOptionalDataAttribute(element, dataAttributeName) {
        return element.data(dataAttributeName) !== undefined;
    }

    /**
     * @todo Change description.
     *
     * Checks for the existence of the data attribute "equalize-from", takes its value
     * and checks if the current window width is bigger or equal to it.
     *
     * @param {jQuery} element
     * @returns {boolean} "true", if the data attribute was found and if its value is bigger or equal to the current
     * window width. "false", if not.
     */
    function screenWidthBiggerThanStartValue(element) {

        // Convert value to number
        var eqFrom = +element.data(OPTIONAL_ATTRIBUTE_EQUALIZE_FROM);

        // Check if current window width is bigger or equal to the value
        return $(window).width() >= eqFrom;
    }

    /**
     * @todo Change description.
     *
     * Checks for the existence of the data attribute "equalize-to", takes its value
     * and checks if the current window width is smaller or equal to it.
     *
     * @param {jQuery} element
     * @returns {boolean} "true", if the data attribute was found and if its value is smaller or equal to the current
     * window width. "false", if not.
     */
    function screenWidthSmallerThanEndValue(element) {

        // Convert value to number
        var eqTo = +element.data(OPTIONAL_ATTRIBUTE_EQUALIZE_TO);

        // Check if current window width is smaller or equal to the value
        return $(window).width() <= eqTo;
    }

    /**
     * @param {jQuery} children
     * @returns {number} The height of the highest child element.
     */
    function getHeightOfHighestChild(children) {

        var maxHeight = -1;

        children.each(function () {
            var child = $(this);
            // @todo I've read that browsers might calculate the height differently. Check it!
            maxHeight = maxHeight > child.outerHeight() ? maxHeight : child.outerHeight();
        });

        return maxHeight;
    }

    /**
     * @param {jQuery} children
     * @param {number} maxHeight The height of the highest child element.
     */
    function applyHighestHeightToChildren(children, maxHeight) {

        children.each(function () {

            var child = $(this);

            // Apply the highest height to all children
            child.outerHeight(maxHeight);
        });
    }

    /**
     * Equalizes all elements with data attribute "data-equalize-parent" applied on
     * which has children with data attribute "data-equalize-child" applied on.
     */
    function equalizeAll() {

        // Reset to be able to re-set the height value of all child elements
        unequalizeAll();

        $('[data-' + ATTRIBUTE_EQUALIZE_PARENT + ']').each(function () {

            var children = $(this).find('[data-' + ATTRIBUTE_EQUALIZE_CHILD + ']');

            // Check if child elements within this parent element are equalizable.
            if (!areChildrenEqualizeable($(this))) {
                return;
            }

            // Go through all children and get the highest height value
            var maxHeight = getHeightOfHighestChild(children);

            // Go through all children to apply the highest height to them (the actual equalize process)
            applyHighestHeightToChildren(children, maxHeight);
        });

        alreadyEqualized = true;
    }

    // Initially equalize equalizable elements
    equalizeAll();

    // Re-equalize when window is being re-sized
    $(window).resize(function () {
        equalizeAll();
    });

}(jQuery));
