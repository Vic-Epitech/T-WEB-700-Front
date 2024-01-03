export default function reduceText(text) {
    if (text) {
      let r = text.split('');

      if (r.length < 400) {
        return text;
      } else {
        let t = r.splice(0, 400);
        return t.join('') + ' ...';
      }
    }
}

export function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const corisXUserToken =  'coris-x-token';
export const corisXUserDatas =  'coris-x-data';

export const baseUrl = 'https://countofmoney.giize.com/'
// export const baseUrl = 'https://t-web-api.cyclic.app/'
// export const baseUrl = 'https://api-t-web.onrender.com/'
