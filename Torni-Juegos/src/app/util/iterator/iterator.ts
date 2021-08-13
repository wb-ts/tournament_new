export interface Iterator
{
    begin(): any;
    prev(): any;
    next(): any;
    end(): any;
    hasNext(): boolean;
    hasPrev(): boolean;
    current(): any;
}