export const cut = (str) => {
  str = str.split('');

  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'T') {
      return str.slice(0, i).join('');
    }
  }
};
