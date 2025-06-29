/**
 * YubinBango is a library for handling Japanese postal codes.
 * Core is the main class for processing postal codes and returning address data.
 * Yubibango is included via a script tag in the head of the document.
 */
export declare const YubinBango: {
  Core: new (
    value: string,
    callback: (address: {
      k: string; // Prefecture (都道府県)
      region: string; // Region (地区)
      l: string; // Locality (市区町村)
      m: string; // Street (町域)
      o: string; // Organization (組織)
    }) => void,
  ) => void;
};

export const isArrayValuesSame = (pivot: string[], target: string[]) => {
  const set1 = new Set(pivot);
  const set2 = new Set(target);
  return (
    pivot.every((item) => set2.has(item)) &&
    target.every((item) => set1.has(item))
  );
};

export const getAddressByPostcode = (postcode: string) => {
  let formattedAddress = "";

  if (!YubinBango) {
    return "";
  }

  new YubinBango.Core(postcode, (address) => {
    const { region, l, m, o } = address;
    formattedAddress = `${region}${l}${m}${o}`;
  });

  return formattedAddress;
};
