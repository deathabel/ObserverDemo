let firstRequest = true; 

class Respository {
  private stock: number = 0;

  getStock(): number {
    return this.stock;
  }

  changeStock(command: {
    type: 'input' | 'plus' | 'reduce';
    value: number;
  }): void {
    this.stock = command.value;
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















// ignore
if (firstRequest){
  document.querySelectorAll('.show-2').forEach((node) => {
    node.setAttribute('style', 'display: none');
  });
} else {
  document.querySelectorAll('.show-1').forEach((node) => {
    node.setAttribute('style', 'display: none');
  });
}
