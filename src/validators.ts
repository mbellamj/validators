import { ContainIterable } from "./types";

export function removeUndefinedProps(value: any) {
  if (typeof value === "undefined") return;
  Object.keys(value).forEach((key) => {
    if (typeof value[key] === "object") {
      removeUndefinedProps(value[key]);
      if (!Object.keys(value[key]).length) delete value[key];
    } else if (!value[key]) delete value[key];
  });
}

/**
 * This methods take an array,
 * @param array reference array
 * @returns a boolean; true if it contains elements or false either
 */
export function hasElements(array?: any[]): boolean {
  return (array?.length ?? 0) > 0;
}

/**
 * This methods take a value,
 * @param value reference value
 * @returns a boolean; true if it exists/defined or false either
 */
export function exists(value: any) {
  return value !== undefined && value !== null;
}

/**
 * This methods take a value,
 * @param value reference value
 * @returns a boolean; true if it contains elements or false either
 */
export function contains(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (
    Object.prototype.toString.apply(value) === "[object Array]" ||
    Object.prototype.toString.apply(value) === "[object String]"
  )
    return (value.length ?? 0) > 0;
  if (Object.prototype.toString.apply(value) === "[object Map]")
    return (value.size ?? 0) > 0;
  if (Object.prototype.toString.apply(value) === "[object Object]")
    return (Object.keys(value).length ?? 0) > 0;
  return false;
}

export function equals(value1: any, value2: any) {
  return JSON.stringify(value1) === JSON.stringify(value2);
}

export function equalsMap(map1: Map<string, any>, map2: Map<string, any>) {
  let testVal;
  if (map1.size !== map2.size) return false;
  for (const [key, val] of map1) {
    testVal = map2.get(key);
    if (equals(testVal, val) || (testVal === undefined && !map2.has(key)))
      return false;
  }
  return true;
}

export function removeEmptyKeys(map: Map<string, any>) {
  map.forEach((value, key) => {
    if (value === undefined || (Array.isArray(value) && !hasElements(value)))
      map.delete(key);
  });
}

export function toContainEqual(received: ContainIterable, expected: unknown) {
  if (expected === undefined) return false;
  const index = Array.from(received).findIndex((item) =>
    equals(item, expected)
  );
  return index !== -1;
}

export function filterObject(
  value: any,
  fields: any[],
  subFields: any[] = []
): Record<string, unknown> {
  const filteredObject: Record<string, unknown> = {};

  for (const field of fields) {
    if (typeof field === "object") filterObject(field, subFields);
    filteredObject[field] = value[field];
  }

  return filteredObject;
}

export function removeObject(
  value: any,
  passFields: string[]
): Record<string, unknown> {
  if (typeof value === "undefined") return {};

  const removedObject: Record<string, unknown> = {};

  for (const field of passFields) {
    removedObject[field] = value[field];
  }

  return removedObject;
}
