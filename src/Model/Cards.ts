export class Card {
    public name: string;
    public value:string;
    public icon:string;
    public color:string
    public namevalue:string
    constructor(name:string,value:string,icon:string,color:string,namevalue:string){
        this.name = name;
        this.value = value;
        this.icon = icon;
        this.color=color;
        this.namevalue=namevalue;
    }
  }