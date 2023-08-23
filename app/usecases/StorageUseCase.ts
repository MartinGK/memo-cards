import LocalStorageRepository from "../domain/entities/LocalStorageRepository";

export default class StorageUseCase {
  private localStorageRepository: LocalStorageRepository;

  constructor() {
    this.localStorageRepository = LocalStorageRepository.getInstance();
  }

  readItem(key: string): string | null {
    return this.localStorageRepository.getItem(key);
  }

  writeItem(key: string, value: string): void {
    this.localStorageRepository.setItem(key, value);
  }

  deleteItem(key: string): void {
    this.localStorageRepository.removeItem(key);
  }
}
