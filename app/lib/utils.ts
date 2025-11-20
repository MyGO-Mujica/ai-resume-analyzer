/**
 * 格式化文件大小为可读的字符串
 * 
 * 将字节数转换为合适的单位（Bytes/KB/MB/GB/TB），并保留两位小数
 * 
 * @param bytes - 文件大小（字节）
 * @returns 格式化后的大小字符串
 * 
 * @example
 * formatSize(0)          // "0 Bytes"
 * formatSize(1024)       // "1 KB"
 * formatSize(1536)       // "1.5 KB"
 * formatSize(1048576)    // "1 MB"
 * formatSize(5242880)    // "5 MB"
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // 通过计算对数来确定合适的单位
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // 格式化为保留 2 位小数并四舍五入
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 生成唯一标识符 (UUID)
 * 
 * 使用浏览器原生的 crypto.randomUUID() API 生成符合 RFC 4122 标准的 UUID v4
 * 
 * @returns 格式为 "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" 的 UUID 字符串
 * 
 * @example
 * generateUUID()  // "550e8400-e29b-41d4-a716-446655440000"
 * generateUUID()  // "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
 */
export const generateUUID = () => crypto.randomUUID();