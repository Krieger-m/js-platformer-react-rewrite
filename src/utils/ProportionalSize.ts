export const proportionalSize = (size:number) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}
