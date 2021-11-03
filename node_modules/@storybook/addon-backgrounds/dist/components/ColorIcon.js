"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("@storybook/theming");
exports.ColorIcon = theming_1.styled.span(function (_a) {
    var background = _a.background;
    return ({
        borderRadius: '1rem',
        display: 'block',
        height: '1rem',
        width: '1rem',
        background: background,
    });
}, function (_a) {
    var theme = _a.theme;
    return ({
        boxShadow: theme.appBorderColor + " 0 0 0 1px inset",
    });
});
