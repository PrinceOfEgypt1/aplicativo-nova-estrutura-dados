// src/components/DataStructures/Vetor/vetor.ts
export class Vetor {
  private elementos: number[];
  private capacidade: number;
  
  constructor(capacidadeInicial: number = 10) {
    this.elementos = new Array(capacidadeInicial);
    this.capacidade = capacidadeInicial;
  }

  private validarNumeroInteiro(valor: number): void {
    if (!Number.isInteger(valor)) {
      throw new Error("Apenas números inteiros são permitidos");
    }
    if (valor < -1000 || valor > 1000) {
      throw new Error("O valor deve estar entre -1000 e 1000");
    }
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

  inserir(indice: number, elemento: number): void {
    if (indice < 0 || indice > this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    
    this.validarNumeroInteiro(elemento);
    this.verificarCapacidade();
    
    for (let i = this.elementos.length; i > indice; i--) {
      this.elementos[i] = this.elementos[i - 1];
    }
    this.elementos[indice] = elemento;
  }

  remover(indice: number): number {
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

  buscar(elemento: number): number {
    this.validarNumeroInteiro(elemento);
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i] === elemento) {
        return i;
      }
    }
    return -1;
  }

  obter(indice: number): number {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    return this.elementos[indice];
  }

  definir(indice: number, elemento: number): void {
    if (indice < 0 || indice >= this.elementos.length) {
      throw new Error("Índice fora dos limites");
    }
    this.validarNumeroInteiro(elemento);
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

  ordenar(): void {
    this.elementos.sort((a, b) => a - b);
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

  adicionarNoFinal(elemento: number): void {
    this.validarNumeroInteiro(elemento);
    this.verificarCapacidade();
    this.elementos.push(elemento);
  }

  estender(elementos: number[]): void {
    for (const elemento of elementos) {
      this.validarNumeroInteiro(elemento);
    }
    for (const elemento of elementos) {
      this.adicionarNoFinal(elemento);
    }
  }

  removerDoFinal(): number {
    if (this.estaVazio()) {
      throw new Error("Vetor está vazio");
    }
    return this.elementos.pop()!;
  }

  fatiar(inicio: number, fim?: number): number[] {
    if (inicio < 0 || inicio >= this.elementos.length) {
      throw new Error("Índice inicial fora dos limites");
    }
    
    const fimEfetivo = fim === undefined ? this.elementos.length : fim;
    if (fimEfetivo < inicio || fimEfetivo > this.elementos.length) {
      throw new Error("Índice final inválido");
    }

    return this.elementos.slice(inicio, fimEfetivo);
  }

  contem(elemento: number): boolean {
    this.validarNumeroInteiro(elemento);
    return this.buscar(elemento) !== -1;
  }

  indiceDe(elemento: number): number {
    this.validarNumeroInteiro(elemento);
    return this.buscar(elemento);
  }

  paraArray(): number[] {
    return [...this.elementos];
  }
}