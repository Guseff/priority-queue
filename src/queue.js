const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
		this._size = 0;
	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
			this._size++;
		} else {
			throw new Error();
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error();
		} else {
			this._size--;
			return this.heap.pop();
		}
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return !this._size;
	}
}

module.exports = PriorityQueue;
