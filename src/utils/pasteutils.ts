export const sanitizePaste = (content: string): string => {
    return content.trim();
}

export const validatePaste = (content: string): boolean => {
    // assume we input the sanitized paste already
    return content.length !== 0;
}