export class Vetor<T> {
  private elementos: T[];
  private capacidade: number;
  
  constructor(capacidadeInicial: number = 10) {
    this.elementos = new Array(capacidadeInicial);
    this.capacidade = capacidadeInicial;
  }

  private verificarCapacidade(): void {
    if (this.elementos.length >= this.capacidade) {
      this.capacidade *= 2;
      const novosElementos = new Array(this.capacidade);
      for (let i = 0; i < this.elementos.length; i++) {
        novosElementos[i] = this.elementos[i];
      }
      this.elementos = novosElementos;
    }
  }

  inserir(indice: number, elemento: T): void {
    if (indice < 0 || indice > this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    
    this.verificarCapacidade();
    
    for (let i = this.elementos.length; i > indice; i--) {
      this.elementos[i] = this.elementos[i - 1];
    }
    this.elementos[indice] = elemento;
  }

  remover(indice: number): T {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    
    const removido = this.elementos[indice];
    for (let i = indice; i < this.elementos.length - 1; i++) {
      this.elementos[i] = this.elementos[i + 1];
    }
    this.elementos.length--;
    return removido;
  }

  buscar(elemento: T): number {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i] === elemento) {
        return i;
      }
    }
    return -1;
  }

  obter(indice: number): T {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    return this.elementos[indice];
  }

  definir(indice: number, elemento: T): void {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    this.elementos[indice] = elemento;
  }

  tamanho(): number {
    return this.elementos.length;
  }

  estaVazio(): boolean {
    return this.elementos.length === 0;
  }

  limpar(): void {
    this.elementos = new Array(this.capacidade);
  }

  ordenar(comparador?: (a: T, b: T) => number): void {
    if (comparador) {
      this.elementos.sort(comparador);
    } else {
      this.elementos.sort();
    }
  }

  inverter(): void {
    let inicio = 0;
    let fim = this.elementos.length - 1;
    
    while (inicio < fim) {
      const temp = this.elementos[inicio];
      this.elementos[inicio] = this.elementos[fim];
      this.elementos[fim] = temp;
      inicio++;
      fim--;
    }
  }

  adicionarNoFinal(elemento: T): void {
    this.verificarCapacidade();
    this.elementos.push(elemento);
  }

  estender(elementos: T[]): void {
    for (const elemento of elementos) {
      this.adicionarNoFinal(elemento);
    }
  }

  removerDoFinal(): T {
    if (this.estaVazio()) {
      throw new Error("Vetor está vazio");
    }
    return this.elementos.pop()!;
  }

  fatiar(inicio: number, fim?: number): Vetor<T> {
    const subArray = this.elementos.slice(inicio, fim);
    const novoVetor = new Vetor<T>(subArray.length);
    novoVetor.elementos = subArray;
    return novoVetor;
  }

  contem(elemento: T): boolean {
    return this.buscar(elemento) !== -1;
  }

  indiceDe(elemento: T): number {
    return this.buscar(elemento);
  }

  paraArray(): T[] {
    return [...this.elementos];
  }
}