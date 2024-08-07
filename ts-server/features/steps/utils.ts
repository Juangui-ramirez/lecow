const chars = "0123456789abcdefghijklmnopqrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function replacer(width: number = 20) {
  const replaceMap: Record<string, string> = {};
  return (text: string) => {
    let newText = text;
    for (const match of text.matchAll(new RegExp(/\{[^}]+\}/, "g"))) {
      let replacement = replaceMap[match[0]];
      if (!replacement) {
        let counter = width - 1;
        replacement = "_";
        while (counter > 0) {
          replacement +=
            chars[Math.trunc(Math.random() * 1000000000) % chars.length];
          counter -= 1;
        }
        replaceMap[match[0]] = replacement;
      }
      newText = newText.replace(`${match}`, replacement);
    }
    return newText;
  };
}
