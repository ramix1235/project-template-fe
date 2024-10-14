export const paginate = <T>(data: T[], pageSize: number, pageNumber: number) => {
  const from = (pageNumber - 1) * pageSize;
  const to = from + pageSize;

  return data.slice(from, to);
};

export const getPageTotal = (total: number, size: number) => {
  return Math.ceil(total / size) || 1;
};
