/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(2);
var puzzles = __webpack_require__(4);
var solve_1 = __webpack_require__(5);
var SPOT_DIMENSION = 40;
function drawBoard(wrapper, currentGame, currentSolve) {
    wrapper.style.width = currentGame.width * SPOT_DIMENSION + "px";
    var activeIndex = solve.active || (solve.row !== undefined && solve.column !== undefined &&
        game.findIndex(solve.row, solve.column));
    var related = solve.related;
    for (var row = 0; row < currentGame.height; row++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("clear");
        rowDiv.classList.add("row");
        rowDiv.style.width = currentGame.width * SPOT_DIMENSION + "px";
        for (var column = 0; column < currentGame.width; column++) {
            var index = game.findIndex(row, column);
            var square = document.createElement("div");
            square.classList.add("square");
            square.style.lineHeight = SPOT_DIMENSION - 2 + "px";
            if (activeIndex === index) {
                square.classList.add("active");
                square.style.lineHeight = SPOT_DIMENSION - 10 + "px";
            }
            else if (related && related.indexOf(index) !== -1) {
                square.classList.add("related");
                square.style.lineHeight = SPOT_DIMENSION - 10 + "px";
            }
            var spot = game.findSpot(row, column);
            if (spot.filled === true) {
                square.classList.add("filled");
            }
            else if (spot.filled === false) {
                square.classList.add("unfilled");
            }
            rowDiv.appendChild(square);
            var value = currentGame.get(row, column);
            square.innerText = value !== undefined ? value + "" : "";
            square.style.width = SPOT_DIMENSION + "px";
            square.style.height = SPOT_DIMENSION + "px";
        }
        wrapper.appendChild(rowDiv);
    }
}
var defaultPuzzle = puzzles.ultraEasy1;
var puzzleName = (window.location.search
    && window.location.search.split("p=")
    && window.location.search.split("p=")[1]
    && window.location.search.split("p=")[1].split("&")[0]);
var puzzle = document.getElementById("puzzle");
var start = document.getElementById("start");
var step = document.getElementById("step");
var game = new game_1.Game(puzzles[puzzleName] || defaultPuzzle);
var solve = new solve_1.Solve(game);
var boardWrapper = document.createElement("div");
boardWrapper.classList.add("wrapper");
drawBoard(boardWrapper, game, solve);
puzzle.innerHTML = "";
puzzle.appendChild(boardWrapper);
var interval;
start.addEventListener("click", function () {
    function makeStep() {
        solve.takeStep();
        step.innerText = solve.desc;
        var wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        drawBoard(wrapper, game, solve);
        puzzle.innerHTML = "";
        puzzle.appendChild(wrapper);
        if (game.done()) {
            clearInterval(interval);
            console.log(JSON.stringify(game.spots.map(function (spot) {
                return spot.filled;
            })));
        }
    }
    if (interval) {
        clearInterval(interval);
        interval = null;
        return;
    }
    else {
        makeStep();
        interval = setInterval(makeStep, 100);
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spot_1 = __webpack_require__(3);
var Game = /** @class */ (function () {
    function Game(config) {
        this.height = config.height;
        this.width = config.width;
        this.spots = [];
        for (var i = 0; i < this.height * this.width; i++) {
            this.spots.push(new spot_1.Spot(config.values[i]));
        }
    }
    Game.prototype.findIndex = function (row, column) {
        return row * this.width + column;
    };
    Game.prototype.findSpot = function (row, column) {
        return this.spots[this.findIndex(row, column)];
    };
    Game.prototype.get = function (row, column) {
        return this.findSpot(row, column).value;
    };
    Game.prototype.getAssociatedIndexes = function (row, column) {
        var ids = [];
        if (row > 0 && column > 0) {
            ids.push(this.findIndex(row - 1, column - 1));
        }
        if (row > 0) {
            ids.push(this.findIndex(row - 1, column));
        }
        if (row > 0 && column + 1 < this.width) {
            ids.push(this.findIndex(row - 1, column + 1));
        }
        if (column > 0) {
            ids.push(this.findIndex(row, column - 1));
        }
        ids.push(this.findIndex(row, column));
        if (column + 1 < this.width) {
            ids.push(this.findIndex(row, column + 1));
        }
        if (row + 1 < this.height && column > 0) {
            ids.push(this.findIndex(row + 1, column - 1));
        }
        if (row + 1 < this.height) {
            ids.push(this.findIndex(row + 1, column));
        }
        if (row + 1 < this.height && column + 1 < this.width) {
            ids.push(this.findIndex(row + 1, column + 1));
        }
        return ids;
    };
    Game.prototype.getAssociatedUnknownIndexes = function (row, column) {
        var _this = this;
        return this.getAssociatedIndexes(row, column).filter(function (index) {
            return _this.spots[index].filled === undefined;
        });
    };
    Game.prototype.associated = function (row, column) {
        var _this = this;
        var ids = this.getAssociatedIndexes(row, column);
        return ids.map(function (id) {
            return _this.spots[id];
        });
    };
    Game.prototype.currentState = function (spots) {
        var result = {
            filled: 0,
            unfilled: 0,
            unknown: 0,
        };
        spots.forEach(function (spot) {
            if (spot.filled === true) {
                result.filled++;
            }
            else if (spot.filled === false) {
                result.unfilled++;
            }
            else {
                result.unknown++;
            }
        });
        return result;
    };
    Game.prototype.associatedState = function (row, column) {
        return this.currentState(this.associated(row, column));
    };
    Game.prototype.getUnknown = function () {
        return this.spots.filter(function (spot) {
            return spot.filled === undefined;
        });
    };
    Game.prototype.done = function () {
        return !this.getUnknown().length;
    };
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Spot = /** @class */ (function () {
    function Spot(value) {
        this.value = value;
    }
    Spot.prototype.fill = function () {
        this.filled = true;
    };
    Spot.prototype.unfill = function () {
        this.filled = false;
    };
    return Spot;
}());
exports.Spot = Spot;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var u = undefined;
exports.ultraEasy1 = {
    height: 5,
    values: [
        u, 5, 4, u, u,
        u, u, u, u, 3,
        u, 5, 6, u, 5,
        0, 2, 5, u, 5,
        u, u, u, u, u,
    ],
    width: 5,
};
exports.veryEasy1 = {
    height: 15,
    values: [
        0, u, u, u, u, u, 5, 6, u, u,
        u, 2, u, 3, u, u, u, 8, 9, u,
        u, u, 3, u, 2, 2, u, 7, 8, 6,
        0, u, u, 3, 2, u, 3, 4, u, 5,
        u, 1, 2, u, u, 3, u, u, u, 3,
        u, u, u, 5, 5, 5, u, u, u, u,
        3, u, 3, 4, u, 4, 3, 4, 3, u,
        4, u, 6, u, u, u, 6, u, u, u,
        u, u, 5, 6, u, 5, 4, u, u, 1,
        u, u, 6, 7, u, u, 5, u, u, u,
        0, u, u, u, 5, 4, u, u, 0, u,
        u, 0, u, 3, 4, u, u, u, u, u,
        u, 0, u, u, 3, 3, 0, u, u, u,
        u, u, u, u, 5, u, u, u, 0, u,
        0, 1, u, u, u, 4, u, u, u, u,
    ],
    width: 10,
};
exports.veryEasy2 = {
    height: 15,
    values: [
        u, 4, u, u, 0, 0, u, u, 4, u,
        4, u, u, u, 3, 3, u, u, u, 4,
        u, u, 4, 5, 3, u, 5, 4, u, 3,
        3, u, 3, u, u, 3, u, u, u, u,
        2, u, 3, 3, u, 2, 3, 4, 4, u,
        u, u, 4, 3, 4, 3, 4, u, 5, u,
        u, 2, u, u, u, 4, u, 4, u, u,
        1, 2, u, u, u, 4, u, 3, u, u,
        u, u, 2, 5, u, u, 2, u, u, 4,
        u, u, u, 4, 4, 4, u, 4, u, u,
        5, u, u, u, 6, u, u, 4, 4, u,
        5, u, 6, 6, 6, 5, 5, u, u, u,
        4, u, 6, 6, 6, 6, 5, u, u, u,
        u, u, u, u, u, 3, u, u, 4, u,
        2, u, 2, 1, 0, u, u, 4, u, u,
    ],
    width: 10,
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var steps;
(function (steps) {
    steps["checkIfFillAll"] = "checkIfFillAll";
    steps["checkIfUnFillAll"] = "checkIfUnfillAll";
})(steps || (steps = {}));
var checkAllPhases;
(function (checkAllPhases) {
    checkAllPhases[checkAllPhases["findAssociatedState"] = 0] = "findAssociatedState";
    checkAllPhases[checkAllPhases["findValues"] = 1] = "findValues";
    checkAllPhases[checkAllPhases["editGame"] = 2] = "editGame";
})(checkAllPhases || (checkAllPhases = {}));
var STEPS = [steps.checkIfFillAll, steps.checkIfUnFillAll];
var Solve = /** @class */ (function () {
    function Solve(game) {
        this.game = game;
        this.phase = 0;
        this.desc = "";
        this.data = {};
        this.init(game);
    }
    Solve.prototype.init = function (game) {
        this.coordinates = [];
        for (var row = 0; row < game.height; row++) {
            for (var column = 0; column < game.width; column++) {
                if (game.get(row, column) !== undefined && game.getAssociatedUnknownIndexes(row, column).length) {
                    this.coordinates.push([row, column]);
                }
            }
        }
        this.steps = STEPS.slice();
    };
    Solve.prototype.takeStep = function () {
        this.desc = "";
        var step = this.steps[0];
        if (step === steps.checkIfFillAll) {
            this.fillAllStep();
        }
        else if (step === steps.checkIfUnFillAll) {
            this.unfillAllStep();
        }
    };
    Solve.prototype.nextStep = function () {
        this.phase = 0;
        this.data = {};
        delete this.active;
        this.related = [];
        this.fill = [];
        this.unfill = [];
        this.steps.shift();
        if (!this.steps.length) {
            delete this.row;
            delete this.column;
            this.steps = STEPS.slice();
            // just loop for now.
            if (!this.coordinates.length) {
                this.init(this.game);
            }
        }
    };
    Solve.prototype.fillCells = function () {
        var _this = this;
        this.fill.forEach(function (index) {
            _this.game.spots[index].filled = true;
        });
    };
    Solve.prototype.unfillCells = function () {
        var _this = this;
        this.unfill.forEach(function (index) {
            _this.game.spots[index].filled = false;
        });
    };
    /**********************************************************
     * Fill All
     **********************************************************/
    Solve.prototype.fillAllStep = function () {
        this.desc = "Fill all step: ";
        if (this.phase === checkAllPhases.findAssociatedState) {
            _a = this.coordinates.shift(), this.row = _a[0], this.column = _a[1];
            this.findAssociatedFillState();
        }
        else if (this.phase === checkAllPhases.findValues) {
            this.checkAllFill();
        }
        else {
            this.desc += "Filled cells " + this.fill.join(", ") + ".";
            this.fillCells();
            this.nextStep();
        }
        var _a;
    };
    Solve.prototype.findAssociatedFillState = function (checkAllFill) {
        var _this = this;
        if (checkAllFill === void 0) { checkAllFill = true; }
        this.data.associatedState = this.game.associatedState(this.row, this.column);
        this.active = this.game.findIndex(this.row, this.column);
        this.related = this.game.getAssociatedIndexes(this.row, this.column).filter(function (id) { return id !== _this.active; });
        if (checkAllFill && this.data.associatedState.filled === this.game.get(this.row, this.column)) {
            this.desc += "Skipping cell " + this.row + ", " + this.column + ". " +
                "Already filled.";
            this.nextStep();
        }
        else if (!this.data.associatedState.unknown) {
            this.desc += "Skipping cell " + this.row + ", " + this.column + ". " +
                "No Unknown cells.";
            this.nextStep();
        }
        else {
            this.desc += "For cell " + this.row + ", " + this.column + "." +
                (" There are " + this.data.associatedState.filled + " filled cells, ") +
                (this.data.associatedState.unfilled + " unfilled cells, ") +
                ("and " + this.data.associatedState.unknown + " unknown cells.");
            this.phase++;
        }
    };
    Solve.prototype.checkAllFill = function () {
        var state = this.data.associatedState;
        var filled = state.filled;
        var totalAvailable = state.unknown + state.filled;
        var value = this.game.get(this.row, this.column);
        if (totalAvailable === value) {
            this.desc += "For cell " + this.row + ", " + this.column + ". " +
                ("The number of filled + unknown cells(" + totalAvailable + ")") +
                (" equals the value(" + value + ")") +
                ", so we can fill all unknown cells.";
            this.fill = this.game.getAssociatedUnknownIndexes(this.row, this.column);
            this.phase++;
        }
        else {
            this.desc += "For cell " + this.row + ", " + this.column + ". " +
                ("The number of filled + unknown cells(" + totalAvailable + ")") +
                (" is not equal to the value(" + value + ").");
            this.nextStep();
        }
    };
    /**********************************************************
     * Unfill All
     **********************************************************/
    Solve.prototype.unfillAllStep = function () {
        this.desc = "Unfill all step: ";
        if (this.phase === checkAllPhases.findAssociatedState) {
            this.findAssociatedFillState(false);
        }
        else if (this.phase === checkAllPhases.findValues) {
            this.checkAllUnfill();
        }
        else {
            this.desc += "Unfilled cells " + this.unfill.join(", ") + ".";
            this.unfillCells();
            this.nextStep();
        }
    };
    Solve.prototype.checkAllUnfill = function () {
        var state = this.data.associatedState;
        var filled = state.filled;
        var value = this.game.get(this.row, this.column);
        if (filled === value) {
            this.desc += "For cell " + this.row + ", " + this.column + ". " +
                "All cells filled. Unfilling unknown cells.";
            this.unfill = this.game.getAssociatedUnknownIndexes(this.row, this.column);
            this.phase++;
        }
        else {
            this.desc += "For cell " + this.row + ", " + this.column + ". " +
                ("The number of filled cells(" + filled + ")") +
                (" is not equal to the value(" + value + ").");
            this.nextStep();
        }
    };
    return Solve;
}());
exports.Solve = Solve;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "body {\n  text-align: center; }\n\n.clear:after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.square {\n  border: 1px solid black;\n  float: left;\n  box-sizing: border-box;\n  text-align: center;\n  font-size: 30px; }\n\n.wrapper {\n  border: 4px solid black;\n  margin: 50px auto; }\n\n.active {\n  border: 5px solid #1a0315; }\n\n.related {\n  border: 5px solid #6e3667; }\n\n.unfilled {\n  background: #535353; }\n\n.filled {\n  background: #88d317; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);