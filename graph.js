class Node {
	constructor (value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor () {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex (vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices (vertexArray) {
		for (const vertex of vertexArray) {
			this.addVertex(vertex);
		}
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge (v1, v2) {
		if (this.nodes.has(v1) && this.nodes.has(v2)) {
			v1.adjacent.add(v2);
			v2.adjacent.add(v1);
		}
		else {
			throw new Error('Both vertices included in graph');
		}
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge (v1, v2) {
		if (this.nodes.has(v1) && this.nodes.has(v2)) {
			v1.adjacent.delete(v2);
			v2.adjacent.delete(v1);
		}
		else {
			throw new Error('verticies both removed');
		}
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	removeVertex (vertex) {
		if (this.nodes.has(vertex)) {
			this.nodes.delete(vertex);

			for (const v of this.nodes) {
				v.adjacent.delete(vertex);
			}
		}
		else {
			throw new Error('Vertex removed from graph');
		}
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch (start) {
		const visited = new Set();
		const result = [];

		function dfsHelper (node) {
			if (!visited.has(node)) {
				visited.add(node);
				result.push(node.value);

				for (const neighbor of node.adjacent) {
					dfsHelper(neighbor);
				}
			}
		}

		dfsHelper(start);
		return result;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [];

    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.value);

      for (const neighbor of currentNode.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

}

module.exports = { Graph, Node };

let graph1 = new Graph();
let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");

graph1.addVertices([a, b, c, d]);
graph1.addEdge(a, b);
graph1.addEdge(b, c);
graph1.addEdge(c, d);

console.log("DFS (Graph 1):", graph1.depthFirstSearch(a));
console.log("BFS (Graph 1):", graph1.breadthFirstSearch(a));

let graph2 = new Graph();
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph2.addVertices([S,P,U,X,Q,Y,V,R,W,T]);

graph2.addEdge(S, P);
graph2.addEdge(S, U);

graph2.addEdge(P, X);
graph2.addEdge(U, X);

graph2.addEdge(P, Q);
graph2.addEdge(U, V);

graph2.addEdge(X, Q);
graph2.addEdge(X, Y);
graph2.addEdge(X, V);

graph2.addEdge(Q, R);
graph2.addEdge(Y, R);

graph2.addEdge(Y, W);
graph2.addEdge(V, W);

graph2.addEdge(R, T);
graph2.addEdge(W, T);

console.log("DFS (Graph 2):", graph2.depthFirstSearch(S));
console.log("BFS (Graph 2):", graph2.breadthFirstSearch(S));