export function detecCycle(adjList: any) {
    const graphNodes = Object.keys(adjList);
    const visited = {};
    const recStack = {};
    for (let i = 0; i < graphNodes.length; i++) {
      const node = graphNodes[i];
      if (detectCycleUtil(node, visited, adjList, recStack, i)) return true;
    }
    return false;
  }
  
  function detectCycleUtil(
    vertex: any,
    visited: any,
    adjList: any,
    recStack: any,
    _count: any
  ) {
    if (!visited[vertex]) {
      visited[vertex] = true;
      recStack[vertex] = true;
      const nodeNeighbors = adjList[vertex];
      for (let i = 0; i < nodeNeighbors?.length; i++) {
        const currentNode = nodeNeighbors[i];
        if (
          (!visited[currentNode] &&
            detectCycleUtil(currentNode, visited, adjList, recStack, i)) ||
          recStack[currentNode]
        ) {
          return true;
        }
      }
    }
    recStack[vertex] = false;
    return false;
  }
  