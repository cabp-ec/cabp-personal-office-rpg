import type {
  ClickableObjectPropertiesInterface
} from '../interfaces/gameAssets/ClickableObjectPropertiesInterface.ts';

/**
 * Get a map trigger by key "dialogue key"
 *
 * @param needle - The key to find an item for
 * @param items - The array of property items to scan
 * @returns The matched PropertyItem object, or undefined if no match is found
 */
export function filterByDialogueKey<T = ClickableObjectPropertiesInterface>(
  needle: string,
  items: ClickableObjectPropertiesInterface[]
): T | undefined {
  return items.reduce<ClickableObjectPropertiesInterface | undefined>((accumulator, currentItem) => {
    if (currentItem.name === needle) {
      return currentItem;
    }

    return accumulator;
  }, undefined) as T;
}

export function downloadVcf() {
  const link = document.createElement('a');
  link.href = '/CarlosBucheli.vcf';
  link.download = 'CarlosBucheli.vcf';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadResume() {
  const link = document.createElement('a');
  link.href = '/CarlosBucheli_Resume_EN.pdf';
  link.download = 'CarlosBucheli_Resume_EN.pdf';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
