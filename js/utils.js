export function getARandomNumber(max, min = 0){
  return min !== 0 ? Math.floor(Math.random() * max + (max - min)) : Math.floor(Math.random() * max);
}
