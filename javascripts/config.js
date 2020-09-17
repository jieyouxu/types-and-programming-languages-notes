window.MathJax = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true,
    },
    options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex"
    },
    loader: {
        load: [
            '[tex]/bussproofs',
            '[tex]/physics'
        ]
    },
    tex: {
        packages: {
            '[+]': [
                'bussproofs',
                'physics'
            ]
        }
    }
};
