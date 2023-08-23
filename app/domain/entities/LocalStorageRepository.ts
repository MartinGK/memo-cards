import LocalStorage from "@/app/infrastructure/LocalStorage";

export default class LocalStorageRepository {
  private static instance: LocalStorageRepository;
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  static getInstance(): LocalStorageRepository {
    if (!LocalStorageRepository.instance) {
      LocalStorageRepository.instance = new LocalStorageRepository(LocalStorage);
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
