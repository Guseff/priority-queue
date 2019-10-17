const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let n = new Node(data, priority)
		this.insertNode(n);
		this.shiftNodeUp(n);
	}

	pop() {
		if (!this.isEmpty()) {
			const node = this.detachRoot();
			this.restoreRootFromLastInsertedNode(node);
			this.shiftNodeDown(this.root);
	
			return node.data;
		}
	}

	detachRoot() {
		if (this.parentNodes.includes(this.root)) this.parentNodes.shift();		
		const temp = this.root;
		this.root = null;
		return temp;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.isEmpty()) {
			const last = this.parentNodes.pop();
			if (last.parent) {
				if (last.parent.right === last && last.parent !== detached) this.parentNodes.unshift(last.parent);
				last.remove();
				if (detached !== last.parent) {
					if (detached.left) last.appendChild(detached.left);
					if (detached.right) last.appendChild(detached.right);
				}
				if (!last.right) this.parentNodes.unshift(last);
			}
			this.root = last;
		}
	}

	size() {
		function count(node) {
			return node === null ? 0 : 1 + count(node.left) + count(node.right);
		}
		return count(this.root);
	}

	isEmpty() {
		return this.root === null && this.parentNodes.length === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	swapParentNodes(node) {
		const nodeIndex = this.parentNodes.indexOf(node);
		const parIndex = this.parentNodes.indexOf(node.parent);
		if (nodeIndex !== -1) {
			if (parIndex !== -1) {
				this.parentNodes.splice(parIndex, 1, node);
			} 
			this.parentNodes.splice(nodeIndex, 1, node.parent);
		}
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				this.swapParentNodes(node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else this.root = node;
	}

	shiftNodeDown(node) {
		if (node) {
			let child; 
			if (node.left && node.right) {
				child = node.left.priority > node.right.priority ? node.left : node.right;	
			} else {
				child = node.left;
			}
			if (!this.isEmpty() && node.left) {
				if (node.priority < child.priority) {
					const nodeIndex = this.parentNodes.indexOf(node);
					const childIndex = this.parentNodes.indexOf(child);
					
					if (node === this.root) this.root = child;
					if (childIndex !== -1) {
						if (nodeIndex === -1) {
							this.parentNodes[childIndex] = node;
						} else {
							[this.parentNodes[childIndex], this.parentNodes[nodeIndex]] = [this.parentNodes[nodeIndex], this.parentNodes[childIndex]]
						}
					}
					child.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
		}
	}
}

module.exports = MaxHeap;
