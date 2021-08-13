import { Iterator } from './iterator';

export class IndexIterator implements Iterator
{
    private index: number = 0;
    private collection: any;

    constructor(collection: any) {

        this.collection = collection;
    }

    begin(): any {
        return this.collection[0];
    }
    
    next(): any {
       return this.collection[this.index++]; 
    }

    prev(): any {
        return this.collection[this.index--];
    }

    hasNext(): boolean {
        return this.index < this.collection.length;
    } 

    hasPrev(): boolean {
        return this.index !== 0;
    }

    end(): any {
        return this.collection[this.collection.length-1];
    }

    current(): any {
      return this.collection[this.index];
    }
}