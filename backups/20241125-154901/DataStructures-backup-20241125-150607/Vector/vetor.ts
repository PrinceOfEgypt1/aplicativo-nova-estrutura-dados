export class Vetor<T> {
  private elementos: T[];
  private capacidade: number;

  constructor(capacidadeInicial: number = 10) {
    this.elementos = new Array(capacidadeInicial);
    this.capacidade = capacidadeInicial;
  }

  inserir(indice: number, elemento: T): void {
    if (indice < 0 || indice > this.elementos.length) {
      throw new Error("Indice fora dos limites");
    }
    
    for (let i = this.elementos.length; i > indice; i--) {
      this.elementos[i] = this.elementos[i - 1];
    }
    this.elementos[indice] = elemento;
  }

  remover(indice: number): T {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Indice fora dos limites");
    }
    
    const removido = this.elementos[indice];
    for (let i = indice; i < this.elementos.length - 1; i++) {
      this.elementos[i] = this.elementos[i + 1];
    }
    this.elementos.length--;
    return removido;
  }

  obter(indice: number): T {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Indice fora dos limites");
    }
    return this.elementos[indice];
  }

  definir(indice: number, elemento: T): void {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Indice fora dos limites");
    }
    this.elementos[indice] = elemento;
  }

  adicionarNoFinal(elemento: T): void {
    this.elementos.push(elemento);
  }

  removerDoFinal(): T {
    if (this.estaVazio()) {
      throw new Error("Vetor esta vazio");
    }
    return this.elementos.pop()!;
  }

  limpar(): void {
    this.elementos = new Array(this.capacidade);
  }

  tamanho(): number {
    return this.elementos.length;
  }

  estaVazio(): boolean {
    return this.elementos.length === 0;
  }

  paraArray(): T[] {
    return [...this.elementos];
  }
}
