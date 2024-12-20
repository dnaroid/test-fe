type Params = { return?: string }
export const url = (url: string, params: Partial<Params | object> = {}): string => {
  if (!url) { return "" }
  let [_url, _params] = url.split("?")
  const paramsObj = new URLSearchParams(_params?.replace(/\?/g, "&") ?? "")
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (paramsObj.has(key)) { paramsObj.set(key, value) } else { paramsObj.append(key, value) }
    } else {
      paramsObj.has(key) && paramsObj.delete(key)
    }
  })
  if (!paramsObj.toString().length) { return _url }
  return `${_url}?${new URLSearchParams(paramsObj).toString()}`
}
