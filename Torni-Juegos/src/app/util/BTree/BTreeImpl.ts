export class BTreeImpl<T> {

	elto: T;

	left: BTreeImpl<T>;
	right: BTreeImpl<T>;
	root: BTreeImpl<T>;
	parent: BTreeImpl<T>;

	constructor()
	{
		this.elto = null;
		this.root = this;
		this.parent = null;
	}

	setRoot(e: T) {
		
		this.elto = e;
	}

	setLeftSubTree(e: T) {

		this.left = new BTreeImpl<T>();
		this.left.parent = this;
		this.left.root = this.root;
		this.left.elto = e;
	}

	setRightSubTree(e: T) {

		this.right = new BTreeImpl<T>();
		this.right.parent = this;
		this.right.root = this.root;
		this.right.elto = e;
	}

	getRoot() {

		return this.root;
	}

	getParent(): BTreeImpl<T> {
		
		return this.parent;
	}

	get getElement(): T {
		return this.elto;
	}

	get getLeftSubTree(): BTreeImpl<T> {
		return this.left;
	}

	get getRightSubTree(): BTreeImpl<T> {
		return this.right;
	}

	get EmptyTree(): boolean {
		return this.elto == null;
	}
}