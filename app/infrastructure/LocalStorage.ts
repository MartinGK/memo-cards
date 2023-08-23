'use client'
class LocalStorage {
  get length() {
    return localStorage.length;
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  static key(index: number): string | null {
    return localStorage.key(index);
  }
}

export default LocalStorage;
