const fs = require("fs");
const { resolve } = require("path");
const readDirSync = (dirPath, result = {}, filters = []) => {
  const files = fs.readdirSync(dirPath).filter((i) => {
    const filterUrl = `${dirPath}/${i}`.replaceAll("\\", "/");
    return !filters.some((filterItem) => filterUrl.includes(filterItem));
  });
  files.map((file) => {
    const stat = fs.statSync(resolve(dirPath, file));
    if (stat.isDirectory()) {
      readDirSync(`${dirPath}/${file}`, result, filters);
    } else {
      const url = `${dirPath}/${file}`;
      const urlStartIndex = url.indexOf("/");
      const urlEndIndex = url.length;
      const apiUrl = url.substring(urlStartIndex, urlEndIndex);
      result[apiUrl] = resolve(dirPath, file);
    }
  });
  return result;
};

const requireContext = (dirPath, filters = []) => {
  dirPath = resolve(process.cwd(), dirPath);
  const apis = readDirSync(dirPath, {}, filters);
  for (const [key, val] of Object.entries(apis)) {
    apis[key] = require(val);
  }
  return apis;
};

const readDirSyncUtils = (dirPath, result = {}, filters = []) => {
  const files = fs.readdirSync(dirPath).filter((i) => {
    const filterUrl = `${dirPath}/${i}`.replaceAll("\\", "/");
    return !filters.some((filterItem) => filterUrl.includes(filterItem));
  });
  files.map((file) => {
    const stat = fs.statSync(resolve(dirPath, file));
    if (stat.isDirectory()) {
      result[file] = {};
      readDirSyncUtils(`${dirPath}\\${file}`, result[file], filters);
      if (!Object.keys(result[file]).length) {
        delete result[file];
      }
    } else {
      const url = `${dirPath}/${file}`;
      const urlStartIndex = url.indexOf("/");
      const urlEndIndex = url.length;
      const apiUrl = url.substring(urlStartIndex, urlEndIndex);
      result[apiUrl] = resolve(dirPath, file);
    }
  });
  return result;
};

const requireContextUtils = (dirPath, filters = []) => {
  dirPath = resolve(process.cwd(), dirPath);
  const apis = readDirSyncUtils(dirPath, {}, filters);

  return apis;
};

module.exports = { requireContext, requireContextUtils };
