/** Observer interface */
interface Observer {
  /** 實作nofity function，提供Observable呼叫 */
  notify(message: any): void;
}
/** Observable interface */
class Observable {
  private observers: Observer[] = [];
  /**  通知所有的觀察者，並提供異動的資料 */
  notifyObservers(message: any): void {
    for (var observer of this.observers)
      new Promise((resolve, reject) => {
        try {
          resolve(observer.notify(message));
        } catch (ex) {
          reject(ex);
        }
      });
  }
  /** 提供Observer訂閱 */
  subscribe(observer: Observer): Subscription {
    return new Subscription(this, this.observers.push(observer) - 1);
  }
  /** 移除Observer訂閱 */
  removeObserver(index: number) {
    this.observers.splice(index, 1);
  }
}
/** Subscription interface */
class Subscription {
  constructor(private observable: Observable, private index: number) {
    this.observable = observable;
    this.index = index;
  }
  /** 提供Observer退訂 */
  unsubscribe(): void {
    this.observable.removeObserver(this.index);
  }
}

class Respository {
  private stock: number = 0;
  stockChanged$ = new Observable();

  getStock(): number {
    return this.stock;
  }

  changeStock(command: {
    type: 'input' | 'plus' | 'reduce';
    value: number;
  }): void {
    this.stock = command.value;
    this.stockChanged$.notifyObservers(command);
  }
}
const repository = new Respository();
// input element
document.getElementById('inputElement').addEventListener('keyup', (event) => {
  if (event.key !== 'Enter') return;
  const value = parseInt((event.target as HTMLInputElement).value) || 0;
  repository.changeStock({ type: 'input', value: value });
});
// plus & reduce button event;
document.querySelectorAll('input[type="button"]').forEach((node) => {
  node.addEventListener('click', (event) => {
    const elementValue = (event.target as HTMLInputElement).value;
    const type = elementValue === '+' ? 'plus' : 'reduce';
    const value = repository.getStock() + (elementValue === '+' ? 1 : -1);
    repository.changeStock({ type, value });
  });
});
// input observer
repository.stockChanged$.subscribe({
  notify: (command) => {
    if (command.type === 'input') return;
    (document.getElementById('inputElement') as HTMLInputElement).value =
      command.value;
  },
});
// result observer
repository.stockChanged$.subscribe({
  notify: (command) => {
    document.getElementById('result').innerHTML = command.value;
  },
});
// log observer
repository.stockChanged$.subscribe({
  notify: (command) => {
    document.querySelector(`[obs-type='${command.type}']`).innerHTML +=
      command.value + '<br>';
  },
});
