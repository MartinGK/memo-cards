import LocalStorageRepository from "../domain/entities/localStorageRepository";
import StorageRepository from "../domain/entities/storageRepository";

export default class LocalStorageUseCase {
  private localStorageRepository: StorageRepository;

  constructor() {
    this.localStorageRepository = StorageRepository.getInstance(
      LocalStorageRepository.getInstance()
    );
  }

  readItem(key: string): string | null {
    return this.localStorageRepository.getItem(key);
  }

  writeItem(key: string, value: string): void {
    console.log;
    this.localStorageRepository.setItem(key, value);
  }

  deleteItem(key: string): void {
    this.localStorageRepository.removeItem(key);
  }
}
