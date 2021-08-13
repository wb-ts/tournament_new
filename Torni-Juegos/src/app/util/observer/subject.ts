import { Observer } from './observer';

/*
*	Subject es una clase abstracta. Deberia ser una
*	interface e implementar los metodos en la clase que lo implemente.
*
*	Esto es para que tu veas como se haria
*/

export interface Subject {
	registerObserver(observer: Observer);
	removeObserver(observer: Observer);
	notify();
}

/*export abstract class Subject {

	//	Pongo un set y asi no hay observadores duplicados
	//	Tampoco se va a iterar, solamente un forEach
	private observers: Set<Observer>;

	constructor() {
		this.observers = new Set<Observer>();
	}

	registerObserver(observer: Observer) {
		this.observers.add(observer);
	}

	removeObserver(observer: Observer) {
		this.observers.delete(observer);
	}

	notify() {
		this.observers.forEach(function (value, index, set) {
			value.update();
		});
	}
}*/