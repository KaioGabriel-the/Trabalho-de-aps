export class Cliente{
    private _nome: String;
    private _endereco: String;
    private _numero: String;
    private _bairro: String;

    constructor(nome: String, endereco: String, numero: String, bairro: String){
        this._nome = nome;
        this._endereco = endereco;
        this._numero = numero;
        this._bairro = bairro;
    }


    get nome(): String {
        return this._nome;
    }


    get endereco(): String {
        return this._endereco;
    }

    set endereco(value: String) {
        this._endereco = value;
    }

    get numero(): String {
        return this._numero;
    }

    set numero(value: String) {
        this._numero = value;
    }

    get bairro(): String {
        return this._bairro;
    }

    set bairro(value: String) {
        this._bairro = value;
    }

    
}