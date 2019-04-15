// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../js/main.js":[function(require,module,exports) {
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Variables
var player1StackSize = document.querySelector('#player1StackSize');
player1StackSize.innerHTML = "0";
var player1InPlay = document.querySelector('#player1InPlay');
var player1Rank = document.querySelector('#player1Rank');
var player1Suit = document.querySelector('#player1Suit');
var player2StackSize = document.querySelector('#player2StackSize');
player2StackSize.innerHTML = "0";
var player2InPlay = document.querySelector('#player2InPlay');
var player2Rank = document.querySelector('#player2Rank');
var player2Suit = document.querySelector('#player2Suit');
var startGameButton = document.querySelector('#startGameButton');
startGameButton.addEventListener('click', startGame);
var warButton = document.querySelector('#warButton');
warButton.style.display = "none";
warButton.addEventListener('click', makeWar);
var suitImg1 = document.createElement('img');
player1InPlay.append(suitImg1);
suitImg1.style.display = "none";
var suitImg2 = document.createElement('img');
player2InPlay.append(suitImg2);
suitImg2.style.display = "none";
player1Rank.innerHTML = " ";
player1Suit.innerHTML = " ";
player2Rank.innerHTML = " ";
player2Suit.innerHTML = " "; //Classes

var Card = function Card(suit, rank, score) {
  _classCallCheck(this, Card);

  this.suit = suit;
  this.rank = rank;
  this.score = score;
};

var Deck =
/*#__PURE__*/
function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.quant = 52;
    this.deck = [];
    this.suits = ["hearts", "diamonds", "clubs", "spades"];
    this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    this.scores = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  }

  _createClass(Deck, [{
    key: "shuffle",
    value: function shuffle() {
      this.deck = [];

      for (var _i = 0; _i < 4; _i++) {
        for (var j = 0; j < 13; j++) {
          this.deck.push(new Card(this.suits[_i], this.ranks[j], this.scores[j]));
        }
      }

      var currentIndex = this.deck.length,
          tempValue,
          randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = tempValue;
      }

      return this.deck;
    }
  }, {
    key: "draw",
    value: function draw() {
      console.log("".concat(this.deck[0].rank, " of ").concat(this.deck[0].suit));
      var drawnCard = this.deck[0];
      this.deck.shift(); // if (this.deck.length === 0) {
      //   this.shuffle()
      // }

      return drawnCard;
    }
  }]);

  return Deck;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(name, rankText, suitText) {
    _classCallCheck(this, Player);

    this.name = name;
    this.stack = [];
    this.inPlay = [];
    this.rankText = rankText;
    this.suitText = suitText;
  }

  _createClass(Player, [{
    key: "takeHalf",
    value: function takeHalf(obj) {
      for (i = 0; i < 26; i++) {
        this.stack.push(obj.draw());
      }

      console.log(this.stack);
    }
  }, {
    key: "play",
    value: function play(evt) {
      evt.preventDefault();
      this.inPlay.push(this.stack.shift());
      console.log(this.inPlay[0]);
      this.rankText.innerHTML = this.inPlay[0].rank;
      this.suitText.innerHTML = this.inPlay[0].suit; //This is the last of several attempts to get the suit images to display on the card - still not working at this point - think it has something to do with parcel

      if (this.name === 'player1') {
        suitImg1.setAttribute('src', "../img/".concat(this.inPlay[0].suit, ".png"));
      } else {
        suitImg2.setAttribute('src', "../img/".concat(this.inPlay[0].suit, ".png"));
      }

      player1StackSize.innerHTML = "".concat(player1.stack.length);
      player2StackSize.innerHTML = "".concat(player2.stack.length);
      console.log("".concat(this.name, " played the ").concat(this.inPlay[0].rank, " of ").concat(this.inPlay[0].suit));
    }
  }]);

  return Player;
}(); //Functions


function makeWar(evt) {
  player1.play(evt);
  player2.play(evt);

  if (player1.inPlay[0].score > player2.inPlay[0].score) {
    player1.stack.push(player1.inPlay.shift());
    player1.stack.push(player2.inPlay.shift());
    console.log('player1 wins this battle');
  } else if (player1.inPlay[0].score < player2.inPlay[0].score) {
    player2.stack.push(player1.inPlay.shift());
    player2.stack.push(player2.inPlay.shift());
    console.log('player2 wins this battle');
  } else if (player1.inPlay[0].score === player2.inPlay[0].score) {
    console.log("there was a tie");
    player1.stack.push(player1.inPlay.shift());
    player2.stack.push(player2.inPlay.shift()); // tiebreaker(evt)
  } else {
    console.log('something is broken');
  }

  player1StackSize.innerHTML = "".concat(player1.stack.length);
  player2StackSize.innerHTML = "".concat(player2.stack.length);

  if (player1.stack.length === 0) {
    console.log("Player 2 wins!");
    alert("Player 2 wins!");
  } else if (player2.stack.length === 0) {
    console.log("Player 1 wins!");
    alert("Player 1 wins!");
  }
} //Started to attempt a tiebreaker but didn't quite get it working
// function tiebreaker(evt) {
//   for (i = 0; i < 3; i ++) {
//     player1.play(evt)
//     player2.play(evt)
//   }
//   while (player1.inPlay.length > 0) {
//     if (player1.inPlay[0].score > player2.inPlay[0].score) {
//       for (i = 0; i < player1.inPlay.length; i++) {
//         player1.stack.push(player1.inPlay.shift())
//         player1.stack.push(player2.inPlay.shift())
//       }
//       console.log('player1 won the tiebreaker')
//     } else if (player1.inPlay[0].score < player2.inPlay[0].score) {
//       for (i = 0; i < player1.inPlay.length; i++) {
//         player2.stack.push(player1.inPlay.shift())
//         player2.stack.push(player2.inPlay.shift())
//       }
//       console.log('player2 won the tiebreaker')
//     } else if (player1.inPlay[0].score === player2.inPlay[0].score) {
//       console.log("there was another tie - let's start over")
//       tiebreaker()
//     } else {
//       console.log('something is broken')
//     }
//   }
// }


function startGame(evt) {
  evt.preventDefault();
  player1Rank.innerHTML = " ";
  player1Suit.innerHTML = " ";
  player2Rank.innerHTML = " ";
  player2Suit.innerHTML = " ";
  startGameButton.textContent = 'Reset';
  player1.stack = [];
  player2.stack = [];
  onlyDeck.shuffle();
  player1.takeHalf(onlyDeck);
  player2.takeHalf(onlyDeck);
  player1StackSize.innerHTML = "".concat(player1.stack.length);
  player2StackSize.innerHTML = "".concat(player2.stack.length);
  warButton.style.display = "block";
} //Instances of classes


var onlyDeck = new Deck();
var player1 = new Player("player1", player1Rank, player1Suit);
console.log(player1);
var player2 = new Player("player2", player2Rank, player2Suit);
console.log(player2); //Commands to initialize game - now in a button
// startGame();
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61708" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/main.js"], null)
//# sourceMappingURL=/main.8f75cf09.js.map