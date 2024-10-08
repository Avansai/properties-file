/**
 * Escape a property key.
 *
 * @param unescapedKey - A property key to be escaped.
 * @param escapeUnicode - Escape unicode characters into ISO-8859-1 compatible encoding?
 *
 * @returns The escaped key.
 */
export const escapeKey = (unescapedKey: string, escapeUnicode = false): string => {
  return escapeContent(unescapedKey, true, escapeUnicode)
}

/**
 * Escape property value.
 *
 * @param unescapedValue - Property value to be escaped.
 * @param escapeUnicode - Escape unicode characters into ISO-8859-1 compatible encoding?
 *
 * @returns The escaped value.
 */
export const escapeValue = (unescapedValue: string, escapeUnicode = false): string => {
  return escapeContent(unescapedValue, false, escapeUnicode)
}

/**
 * Escape the content from either key or value of a property.
 *
 * @param unescapedContent - The content to escape.
 * @param escapeSpace - Escape spaces?
 * @param escapeUnicode - Escape unicode characters into ISO-8859-1 compatible encoding?
 *
 * @returns The escaped content.
 */
const escapeContent = (
  unescapedContent: string,
  escapeSpace: boolean,
  escapeUnicode: boolean
): string =>
  unescapedContent.replace(
    new RegExp(`[\\s!#:=\\\\${escapeUnicode ? String.raw`\u0000-\u001F\u007F-\uFFFF` : ''}]`, 'g'),
    (character, position) => {
      switch (character) {
        case ' ': {
          // Spaces.
          return escapeSpace || position === 0 ? String.raw`\ ` : ' '
        }
        case '\\': {
          // Backslash.
          return '\\\\'
        }
        case '\f': {
          // Formfeed.
          return String.raw`\f`
        }
        case '\n': {
          // Newline.
          return String.raw`\n`
        }
        case '\r': {
          // Carriage return.
          return String.raw`\r`
        }
        case '\t': {
          // Tab.
          return String.raw`\t`
        }
        case '=':
        case ':':
        case '#':
        case '!': {
          // =, :, # and !.
          return `\\${character}`
        }
        default: {
          // Any character that is not in the range of ASCII printable characters.
          return `\\u${(character.codePointAt(0) as number).toString(16).padStart(4, '0')}`
        }
      }
    }
  )
