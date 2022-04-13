import {watchComplier} from './@watch';

export function rawComplier(
  this: any,
  content: string,
  fileName: string,
): string {
  content = `module.exports = \`${content}\``;
  return watchComplier.call(this, content, fileName);
}
