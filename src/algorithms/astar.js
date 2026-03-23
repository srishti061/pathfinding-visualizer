export function astar(grid, startNode, finishNode) {
  const openSet = [];
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  startNode.totalDistance = heuristic(startNode, finishNode);

  openSet.push(startNode);

  while (openSet.length > 0) {
    sortNodesByTotalDistance(openSet);
    const currentNode = openSet.shift();

    if (currentNode.isWall) continue;

    if (currentNode === finishNode) return visitedNodesInOrder;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      const tempDistance = currentNode.distance + 1;

      if (tempDistance < neighbor.distance) {
        neighbor.distance = tempDistance;
        neighbor.totalDistance =
          tempDistance + heuristic(neighbor, finishNode);
        neighbor.previousNode = currentNode;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortNodesByTotalDistance(nodes) {
  nodes.sort((a, b) => a.totalDistance - b.totalDistance);
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited);
}