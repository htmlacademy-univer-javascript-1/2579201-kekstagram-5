export function getARandomNumber(max, min = 0){
  return min !== 0 ? Math.floor(Math.random() * (max - min + 1) + min) : Math.floor(Math.random() * max);
}
