let chai = require('chai')
let expect = chai.expect

let sinon = require('sinon')
let sinonChai = require('sinon-chai')

chai.use(sinonChai)

let LOLOG = require('../lib/lolog.js')

describe('Console log wrapper', () => {
  beforeEach(() => {
    sinon.spy(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
  })

  it('should log variable with filename and line no', () => {
    let lolog = new LOLOG()

    let someVar = 42
    let anotherVar = 'lolcat'
    lolog.log(someVar, anotherVar) // NOTE THIS LINE NUMBER!

    expect(console.log).to.be.calledWith('{"0":42,"1":"lolcat"}, consoleLogWrapperTest.js:25')
  })

  it('should log the variable name and value', () => {
    let lolog = new LOLOG()

    let someVar = 42
    lolog.logvar(someVar)

    expect(console.log).to.be.calledWith('someVar is {"0":42}')
  })

  it('should log multiple variables names and values', () => {
    let lolog = new LOLOG()

    let someVar = 42
    let anotherVar = { 'oh no': 'not again' }
    lolog.logvar(someVar, anotherVar)

    expect(console.log).to.be.calledWith('someVar, anotherVar are {"0":42,"1":{"oh no":"not again"}}')
  })
})

