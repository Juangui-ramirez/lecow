export function replacer() {
  const replaceMap: Record<string, string> = {};
  return (text: string) => {
    let newText = text;
    for (const match of text.matchAll(new RegExp(/\{[^}]+\}/, "g"))) {
      let replacement = replaceMap[match[0]];
      if (!replacement) {
        replacement = `${Math.trunc(Math.random() * 10000000)}`;
        replaceMap[match[0]] = replacement;
      }
      newText = newText.replace(`${match}`, replacement);
    }
    return newText;
  };
}
