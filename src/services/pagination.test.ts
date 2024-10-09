import { getPageTotal, paginate } from './pagination';

describe('service: pagination', () => {
  it('extracts page according to the size and number from the list', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const pageSize = 10;

    const firstPage = paginate(list, pageSize, 1);

    expect(firstPage).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const secondPage = paginate(list, pageSize, 2);

    expect(secondPage).toEqual([11, 12, 13, 14, 15]);
  });

  it('calculates total according to the total length of the list and page size', () => {
    expect(getPageTotal(10, 10)).toBe(1);
    expect(getPageTotal(11, 10)).toBe(2);
  });
});
