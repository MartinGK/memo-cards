import SessionStorage from "../../infrastructure/sessionStorage";

class SessionStorageRepository {
  private static instance: SessionStorageRepository;
  private storage: Storage;

  private constructor(storage: Storage = sessionStorage) {
    this.storage = storage;
  }

  static getInstance(): SessionStorageRepository {
    if (!SessionStorageRepository.instance) {
      SessionStorageRepository.instance = new SessionStorageRepository(
        SessionStorage
      );
    }
    return SessionStorageRepository.instance;
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

// export default new SessionStorageRepository(SessionStorage)
export default SessionStorageRepository
