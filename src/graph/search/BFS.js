/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Edge } from '../core/Edge.js';

class BFS {

	constructor( graph = null, source = - 1, target = - 1 ) {

		this.graph = graph;
		this.source = source;
		this.target = target;
		this.found = false;

		this._route = new Map(); // this holds the route taken to the target
		this._visited = new Set(); // holds the visited nodes

		this._spanningTree = new Set(); // for debugging purposes

	}

	search() {

		// create a queue(FIFO) of edges, done via an array

		const queue = [];
		const outgoingEdges = [];

		// create a dummy edge and put on the queue to begin the search

		const startEdge = new Edge( this.source, this.source );

		queue.push( startEdge );

		// mark the source node as visited

		this._visited.add( this.source );

		// while there are edges in the queue keep searching

		while ( queue.length > 0 ) {

			// grab the first edge and remove it from the queue

			const nextEdge = queue.shift();

			// make a note of the parent of the node this edge points to

			this._route.set( nextEdge.to, nextEdge.from );

			// expand spanning tree

			if ( nextEdge !== startEdge ) {

				this._spanningTree.add( nextEdge );

			}

			// if the target has been found the method can return success

			if ( nextEdge.to === this.target ) {

				this.found = true;

				return this;

			}

			// determine outgoing edges

			this.graph.getEdgesOfNode( nextEdge.to, outgoingEdges );

			// push the edges leading from the node this edge points to onto the
			// queue (provided the edge does not point to a previously visited node)

			for ( let edge of outgoingEdges ) {

				if ( this._visited.has( edge.to ) === false ) {

					queue.push( edge );

					// the node is marked as visited here, BEFORE it is examined,
					// because it ensures a maximum of N  edges are ever placed in the queue rather than E edges.
					// (N = number of nodes, E = number of edges)

					this._visited.add( edge.to );

				}

			}

		}

		this.found = false;

		return this;

	}

	getPath() {

		// array of node indices that comprise the shortest path from the source to the target

		const path = [];

		// just return an empty path if no path to target found or if no target has been specified

		if ( this.found === false || this.target === - 1 ) return path;

		// start with the target of the path

		let currentNode = this.target;

		path.push( currentNode );

		// while the current node is not the source node keep processing

		while ( currentNode !== this.source ) {

			// determine the parent of the current node

			currentNode = this._route.get( currentNode );

			// push the new current node at the beginning of the array

			path.unshift( currentNode );

		}

		return path;

	}

	getSearchTree() {

		return [ ...this._spanningTree ];

	}

	clear() {

		this.found = false;

		this._route.clear();
		this._visited.clear();
		this._spanningTree.clear();

	}

}

export { BFS };
