const getApi = (url, type = "url") => {
  const endIndex = url.indexOf(".");
  const jsIndex = url.indexOf(".js");
  const getApiMaps = {
    url() {
      const paramIdLeftIndex = url.indexOf("[");
      const paramIdRightIndex = url.indexOf("]");

      const rUrl = url.substring(0, endIndex);
      if (paramIdLeftIndex == -1) {
        return rUrl;
      } else {
        const paramKey = url.substring(paramIdLeftIndex + 1, paramIdRightIndex);
        return rUrl.replace(`[${paramKey}]`, `:${paramKey}`);
      }
    },
    method() {
      const unMethod = url.substring(endIndex, jsIndex);
      if (!!unMethod) {
        return unMethod.replace(".", "");
      } else {
        return "get";
      }
    },
  };
  try {
    return getApiMaps[type]();
  } catch (error) {
    throw Error("type not define:x-" + type);
  }
};

const autoImport = (apiObj, target, _this) => {
  for (const [key, val] of Object.entries(apiObj)) {
    const apiUrl = getApi(key, "url");
    const method = getApi(key, "method");

    if (typeof val == "function") {
      const utilAutoFn = val.bind(_this);
      target[method](apiUrl, utilAutoFn);
    } else if (!!val?.length) {
      const utilAutoFn = val.pop().bind(_this);
      const callbackArrays = [...val, utilAutoFn];

      target[method](apiUrl, ...callbackArrays);
    }
  }
};

module.exports = { autoImport };
