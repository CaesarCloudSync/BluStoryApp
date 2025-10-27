export const getFilenameFromUri = (uri: string): string | undefined => {
  try {
    return uri.split('/').pop() ?? undefined;
  } catch {
    return undefined;
  }
};