import fs from 'fs'

const file = fs.readFileSync('./assets/ship.obj', { encoding: 'utf-8' })

let done = false

const result = file.split('\n').map(line => {
  if (done || line === 'usemtl Wings') {
    done = true
    return line
  }

  return line.split(' ').map((chunk) => {
    const n = parseFloat(chunk)

    switch (chunk) {
      case '-.0': return '-0'
    }
  
    if (Number.isNaN(n)) return chunk

    let result = n.toFixed(2)

    if (result.endsWith('0')) result = result.slice(0, -1)
    if (result.startsWith('0')) result = result.slice(1, result.length)
    if (result.startsWith('-0')) result = `-${result.slice(2, result.length)}`

    switch (result) {
      case '.00': case '.': case '.0': return '0'
      case '1.': case '1.0': return '1'
      case '-1.': case '-1.0': return '-1'
    }
  
    return result === '.' ? '0' : result
  }).join(' ')
}).join('\n')
console.log(result)

fs.writeFileSync('test.obj', result, { encoding: 'utf-8' })