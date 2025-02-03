import { Cliente } from "./Cliente";

export class Pedido {
    private _quantidade: Number;
    private _sabor: String;
    private _tamanho: String;
    private _preco: Number;
    private _comBorda: Boolean;

    constructor(quantidade: Number, sabor: String, tamanho: String, preco: Number){
        this._quantidade = quantidade;
        this._sabor = sabor;
        this._tamanho = tamanho;
        this._preco = preco;

    }

    get quantidade(): Number {
        return this._quantidade;
    }

    set quantidade(value: Number) {
        this._quantidade = value;
    }

    get sabor(): String {
        return this._sabor;
    }

    get tamanho(): String {
        return this._tamanho;
    }

    set tamanho(value: String) {
        this._tamanho = value;
    }

    get preco(): Number {
        return this._preco;
    }

    public presencaBorda(): Boolean {
        return this._comBorda;
    }

    

}