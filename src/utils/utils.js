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