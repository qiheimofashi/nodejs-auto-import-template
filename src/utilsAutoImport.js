const { requireContextUtils } = require("./utils/requireContext");

const deepRequire = (obj, _this, parentKey) => {
  _this[parentKey] = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val == "string") {
      const module = require(val);
      if (typeof module == "function") {
        if (!!module.name) {
          _this[parentKey][module.name] = module;
        } else {
          throw Error("auto import is not anonymous function");
        }
      } else {
        for (const [moduleKey, moduleVal] of Object.entries(module)) {
          _this[parentKey][moduleKey] = moduleVal;
        }
      }
    } else {
      deepRequire(obj[key], _this[parentKey], key);
    }
  }
};

module.exports = function (key, filters = []) {
  if (!key) {
    throw Error("key is not undefined");
  }

  const utilsa = requireContextUtils(__dirname + "/" + key, filters);

  deepRequire(utilsa, global, key);
};
