import type { NamedEntityInterface } from '../interfaces/NamedEntityInterface.ts';


// Union type for global currency codes
export type CurrencyCodeType =
  | 'USD' // US Dollar
  | 'CAD' // Canadian Dollar
  | 'MXN' // Mexican Peso
  | 'BRL' // Brazilian Real
  | 'ARS' // Argentine Peso
  | 'COP' // Colombian Peso
  | 'EUR' // Euro
  | 'GBP' // British Pound Sterling
  | 'CHF' // Swiss Franc
  | 'SEK' // Swedish Krona
  | 'NOK' // Norwegian Krone
  | 'PLN' // Polish Zloty
  | 'JPY' // Japanese Yen
  | 'CNY' // Chinese Yuan / Renminbi
  | 'AUD' // Australian Dollar
  | 'INR' // Indian Rupee
  | 'KRW' // South Korean Won
  | 'SGD' // Singapore Dollar
  | 'NZD' // New Zealand Dollar
  | 'HKD' // Hong Kong Dollar
  | 'ZAR' // South African Rand
  | 'SAR' // Saudi Riyal
  | 'AED' // United Arab Emirates Dirham
  | 'ILS' // Israeli New Shekel
  | 'EGP' // Egyptian Pound
  | 'NGN'; // Nigerian Naira

// Union type for digital data measurement units (largest to smallest)
export type DataMeasurementUnitType =
  | 'QB'  // Quettabyte
  | 'RB'  // Ronnabyte
  | 'YB'  // Yottabyte
  | 'ZB'  // Zettabyte
  | 'EB'  // Exabyte
  | 'PB'  // Petabyte
  | 'TB'  // Terabyte
  | 'GB'  // Gigabyte
  | 'MB'  // Megabyte
  | 'KB'  // Kilobyte
  | 'B'   // Byte
  | 'b';  // Bit

export type TimeUnitType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export type GenericUnits =
  | '%'
  | 'pts'; // Points

export interface MeasurableUnitInterface extends NamedEntityInterface{
  symbol: CurrencyCodeType | TimeUnitType | DataMeasurementUnitType | GenericUnits | null;
}
