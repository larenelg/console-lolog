'use strict'

var fs = require('fs')

module.exports = class Log {
  log() {
    try { throw new Error() }
    catch(e) { 
      var [ fileName, lineNumber ] = this._getFileNameAndLineNumber(e.stack)
      console.log(`${JSON.stringify(arguments)}, ${fileName}:${lineNumber}`)
      return `${JSON.stringify(arguments)}, ${fileName}:${lineNumber}`
    }
  }

  logvar() {
    try { throw new Error() }
    catch(e) { 
      var line = this._getLineOfLog(e.stack)
      var variableNames = (line.match(/\.logvar\((.*?)\)/)[1]) // must match name of this fn
      var isOrAre = arguments.length>1 ? 'are' : 'is'
      console.log(`${variableNames} ${isOrAre} ${JSON.stringify(arguments)}`)
    }
  }

  _getFileNameAndLineNumber(stack /* this specifically needs to be an Error().stack */) {
    var output = stack.toString().split('\n')[2] // get the file that called this function
    // TODO: can do the next few regexs better without /g
    output = output.match(/(?:\/[^\/]*$)/g)[0]
    var fileName = output.match(/(\w+.\w+)(?=\:\d+\:\d+\)$)/g)
    var lineNumber = output.match(/\d+(?=\:\d+\)$)/g)
    return [ fileName, lineNumber ]
  }

  _getLineOfLog(stack /* this specifically needs to be an Error().stack */) {
    var fullPath = this._getFullPath(stack)
    var logFileContents = fs.readFileSync(fullPath, 'utf8')
    var [ fileName, lineNumber ] = this._getFileNameAndLineNumber(stack)
    var line = logFileContents.split('\n')[lineNumber-1]
    return line
  }

  _getFullPath(stack /* this specifically needs to be an Error().stack */) {
    var output = stack.toString().split('\n')[2]
    output = output.match(/\(((.+)(?=\:\d+\:\d+\)$))/g)[0]
    output = output.slice(1)
    return output
  }
}

