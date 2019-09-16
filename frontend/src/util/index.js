export const thousandSeparator = (num, separator) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const truncateDecimals = (num, places) => {
  const ext = Math.pow(10, places)
  return Math.trunc(num * ext) / ext
}

export const parsePercentage = (num, places) => {
  const exp = Math.pow(10, places)
  return Math.trunc(num * 100 * exp) / exp
}

export const truncateWord = (word, places) => {
  return word.substr(0, places)
}
