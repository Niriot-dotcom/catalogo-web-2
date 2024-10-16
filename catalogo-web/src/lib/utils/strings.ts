export const textToDivId = (text: string) => {
  // let newText = text.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase();
  let newText = text.replaceAll(" ", "-").toLowerCase();
  return newText;
};

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export function deleteSubArray(totalItems: [], item: []) {
  const itemString = JSON.stringify(item);

  return totalItems.filter((subArray) => {
    return JSON.stringify(subArray) !== itemString;
  });
}

export function productTypeToSectionId(productType: string) {
  return productType
    .replaceAll(" ", "-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
