export function getUserNameFallback(name: string): string {
  // eslint-disable-next-line prefer-regex-literals
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

  const initials = [...name.matchAll(rgx)] || []

  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase()
}
