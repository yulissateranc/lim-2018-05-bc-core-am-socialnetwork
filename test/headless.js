global.window = global;
global.assert = require('chai').assert;
require('../src/model/functions-validation');
require('./functions-valid.spec.js');