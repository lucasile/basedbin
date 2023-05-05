const MAX_PASTE_LENGTH = 2000;


export const sanitizePaste = (content: string): string => {

  let sanitized: string = content.trim();

  if (sanitized.length > MAX_PASTE_LENGTH) {
    sanitized = sanitized.substring(0, MAX_PASTE_LENGTH);
  }

  return sanitized;
}

export const validatePaste = (content: string): boolean => {
    // assume we input the sanitized paste already
    return content.length !== 0;
}
