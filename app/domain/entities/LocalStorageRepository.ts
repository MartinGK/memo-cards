'use client'
import LocalStorage from "../../infrastructure/localStorage";

class LocalStorageRepository {
  private static instance: LocalStorageRepository;
  private storage: Storage;

  private constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  static getInstance(): LocalStorageRepository {
    if (!LocalStorageRepository.instance) {
      LocalStorageRepository.instance = new LocalStorageRepository(
        LocalStorage
      );
    }
    return LocalStorageRepository.instance;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}

// export default new LocalStorageRepository(LocalStorage)
export default LocalStorageRepository
