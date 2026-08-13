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
