import LocalStorageRepository from "./localStorageRepository";
import SessionStorageRepository from "./sessionStorageRepository";

type StorageTypes = LocalStorageRepository | SessionStorageRepository;

class StorageRepository {
  private static instance: StorageRepository;
  private storage: StorageTypes;

  constructor(storage: StorageTypes) {
    this.storage = storage;
  }

  static getInstance(storage: StorageTypes): StorageRepository {
    if (!StorageRepository.instance) {
      StorageRepository.instance = new StorageRepository(
        storage
      );
    }
    return StorageRepository.instance;
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

export default StorageRepository
