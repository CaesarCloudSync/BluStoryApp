export const  getRandomId = (min=2, max=1000000)  => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}