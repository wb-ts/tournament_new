import { Iterator } from './iterator';

export interface Aggregator {
    iterator(): Iterator;
}