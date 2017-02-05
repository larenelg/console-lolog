'use strict'

var fs = require('fs')

module.exports = class Log {
  log() {
    try { throw new Error() }
    catch(e) { 
      let [ fileName, lineNumber ] = this._getFileNameAndLineNumber(e.stack)
      console.log(`${JSON.stringify(arguments)}, ${fileName}:${lineNumber}`)
      return `${JSON.stringify(arguments)}, ${fileName}:${lineNumber}`
    }
  }

  logvar() {
    try { throw new Error() }
    catch(e) { 
      let line = this._getLineOfLog(e.stack)
      let variableNames = (line.match(/\.logvar\((.*?)\)/)[1]) // must match name of this fn
      let isOrAre = arguments.length>1 ? 'are' : 'is'
      console.log(`${variableNames} ${isOrAre} ${JSON.stringify(arguments)}`)
    }
  }

  _getFileNameAndLineNumber(stack /* this specifically needs to be an Error().stack */) {
    let output = stack.toString().split('\n')[2] // get the file that called this function
    // TODO: can do the next few regexs better without /g
    output = output.match(/(?:\/[^\/]*$)/g)[0]
    let fileName = output.match(/(\w+.\w+)(?=\:\d+\:\d+\)$)/g)
    let lineNumber = output.match(/\d+(?=\:\d+\)$)/g)
    return [ fileName, lineNumber ]
  }

  _getLineOfLog(stack /* this specifically needs to be an Error().stack */) {
    let fullPath = this._getFullPath(stack)
    let logFileContents = fs.readFileSync(fullPath, 'utf8')
    let [ fileName, lineNumber ] = this._getFileNameAndLineNumber(stack)
    let line = logFileContents.split('\n')[lineNumber-1]
    return line
  }

  _getFullPath(stack /* this specifically needs to be an Error().stack */) {
    let output = stack.toString().split('\n')[2]
    output = output.match(/\(((.+)(?=\:\d+\:\d+\)$))/g)[0]
    output = output.slice(1)
    return output
  }
}

