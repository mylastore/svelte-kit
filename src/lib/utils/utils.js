import { variables } from '$lib/utils/variables'

const currencyLocation = variables.currencyLocation

function currency(options) {
  let {value, currency, decimals} = options

  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''

  currency = currency != null ? currency : currencyLocation.symbol
  decimals = decimals != null ? decimals : 0

  let stringify = Math.abs(value).toFixed(decimals)
  let _int = decimals ? stringify.slice(0, -1 - decimals) : stringify
  let i = _int.length % 3
  let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  let _float = decimals ? stringify.slice(-1 - decimals) : ''
  let sign = value < 0 ? '-' : ''
  return sign + currency + ' ' + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}

export {currency}