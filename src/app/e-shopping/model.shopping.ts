// export class ShoppingItem {

//   constructor(public id:string,public title:string, public price:string, public category:string, public imageUrl: string, public sizeAvailable:string[],public sale:boolean) {}
// }

export interface ShoppingItem {
id:string;
title:string;
price:string;
category:string;
imageUrl: string;
sizeAvailable:string[];
sale:boolean;
}
