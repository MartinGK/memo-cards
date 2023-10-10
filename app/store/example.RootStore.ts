class ERootStore {
  childStoreOne: EChildStoreOne;
  childStoreTwo: EChildStoreTwo;

  constructor() {
    this.childStoreOne = new EChildStoreOne(this);
    this.childStoreTwo = new EChildStoreTwo(this);

    // call init method on all child classes
    // use a loop if there are to many classes
    this.childStoreOne.init();
    this.childStoreTwo.init();
  }
}

class EChildStoreOne {
  root: ERootStore;
  // storeTwo: ChildStoreTwo; // IDK why this is here

  constructor(root: ERootStore) {
    this.root = root;
    // no work here only assignments
  }

  init() {
    // safe to access other stores
    this.root.childStoreTwo.doSomething();
  }
  
  doSomething() {
    //doing something
  }
}

class EChildStoreTwo {
  root: ERootStore;
  //   storeOne: ChildStoreOne; // IDK why this is here

  constructor(root: ERootStore) {
    this.root = root;
    // move real initialization work to the init method
  }

  init() {
    // safe to access other stores
    this.root.childStoreOne.doSomething();
  }

  doSomething() {
    //doing something
  }
}

function _createChildStoreTwo(root: ERootStore) {
  return {
    root,
    getSomethingFromStoreOne() {
      this.root.childStoreOne.doSomething();
    },
  };
}
