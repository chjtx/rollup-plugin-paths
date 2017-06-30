var path = require('path')

// nodejs的require('path').relative有bug，因此自己写
function getRelativePath (from, to) {
  // 去除相同部分
  var i = 0
  while (from[i] === to[i]) {
    i++
  }
  from = from.substr(i)
  to = to.substr(i)
  // 加上..或.
  var l = from.split(/\/|\\/).length - 1
  var s = ''
  if (l) {
    while (l--) {
      s += '../'
    }
  } else {
    s = './'
  }
  return s + to
}

module.exports = function (options) {
  var rollupOptions
  return {
    name: 'rollup-plugin-paths',
    options: function (o) {
      rollupOptions = o
    },
    resolveId: function (importee, importer) {
      var reg = /^[^@]+@/
      var key
      var updateId = options[importee] || importee

      // 包含目录关键词，例："directory@third.js"
      if (reg.test(updateId)) {
        key = reg.exec(updateId)[0]
        if (options[key]) {
          updateId = updateId.replace(key, options[key])
        } else {
          throw Error('This key `' + key + '` is not defined.')
        }
      }

      if (updateId === importee) {
        return null
      } else {
        // 将合并后的`\`转换为`/`，解决windows下的路径错误
        updateId = path.resolve(path.dirname(rollupOptions.entry), updateId).replace(/\\/g, '/')
        return rollupOptions.is_jtaro_module ? getRelativePath(importer, updateId) : updateId
      }
    }
  }
}
