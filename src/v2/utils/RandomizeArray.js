export const RandomizeArray = (arr) => {
  return [...arr].sort(() => 0.5 - Math.random())
}
