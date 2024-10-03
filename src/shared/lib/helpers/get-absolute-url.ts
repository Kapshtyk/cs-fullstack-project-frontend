export const getAbsoluteUrl = (relativePath: string): string => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${relativePath}`;
};
