class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null; 
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.right !== node && this.left !== node) {
			throw new Error();
		} else if (this.right === node){ 
			this.right = null;
		} else if (this.left === node) {
			this.left = null;
		}
		node.parent = null; 
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			if (this.left) this.left.parent = this.parent;
			if (this.right) this.right.parent = this.parent;

			if (this.parent.parent) {
				if (this.parent.parent.left === this.parent) {
					this.parent.parent.left = this;
				}
				if (this.parent.parent.right === this.parent) {
					this.parent.parent.right = this;
				}
			}

			if (this.parent.left === this) {
				if (this.parent.right) this.parent.right.parent = this;
				[this.parent.left, this.parent.right, this.left, this.right] = [this.left, this.right, this.parent, this.parent.right];
			}
			if (this === this.parent.right) {
				if (this.parent.left) this.parent.left.parent = this;
				[this.parent.left, this.parent.right, this.left, this.right] = [this.left, this.right, this.parent.left, this.parent];
			}

			[this.parent.parent, this.parent] = [this, this.parent.parent];
		}
	}
}

module.exports = Node;
