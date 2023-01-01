export type Aggregate<T = unknown> = T;

export function aggregate<T>(key: string, data: Aggregate<T>[], field: string) {
  const map = new Map<string, Aggregate<T>>();
  data.forEach((element: any) => {
    const exists: any = map.get(element[key]);
    if (!exists) {
      map.set(element[key], element);
    } else {
      const aggregatedField = [...exists[field], ...element[field]];
      map.set(exists[key], {
        ...exists,
        [field]: aggregatedField,
      });
    }
  });
  return map;
}
