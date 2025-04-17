export const getTaskCountColor = (count: number) => {
  if (count === 0) return 'default';
  if (count <= 3) return 'green';
  if (count <= 7) return 'blue';
  if (count <= 10) return 'orange';
  return 'red';
};
