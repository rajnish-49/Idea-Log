export function random(len: number) {
  const options =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * options.length);
    result += options[randomIndex];
  }

  return result;
}
