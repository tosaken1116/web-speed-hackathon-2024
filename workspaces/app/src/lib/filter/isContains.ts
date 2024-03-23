// UCA_L1_FLAG はベース文字、UCA_L2_FLAG は濁点・半濁点・アクセントを区別する (sensitivity: accent に相当)

type Params = {
  query: string;
  target: string;
};

function normalizeString(str: string): string {
  const zenkakuKatakana = str.replace(/[\uFF65-\uFF9F]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0xfee0);
  });

  const hiragana = zenkakuKatakana.replace(/[\u30A1-\u30F6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });

  return hiragana;
}

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  const normalizedQuery = normalizeString(query);
  const normalizedTarget = normalizeString(target);

  return normalizedQuery.includes(normalizedTarget);
}
