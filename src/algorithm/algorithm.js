/* By Ratnesh Jain */
export default function Algorithm(height, width, startPosTemp, endPosTemp, wallsListNodes) {
    return (new Promise((resolve) => {
        class Node {
            constructor(i, j) {
                this.previous = undefined
                this.i = i;
                this.j = j;
                this.f = 0;
                this.g = 0;
                this.h = 0;
                this.closed = false;
            }
        }

        function FindNeighbours(node) {
            let i = node.i;
            let j = node.j;

            let U = [i - 1, j];
            let R = [i, j + 1];
            let D = [i + 1, j];
            let L = [i, j - 1];
            let neighbourList = [];
            if (IsValid(U)) {
                neighbourList.push(U);
            }
            if (IsValid(R)) {
                neighbourList.push(R);
            }
            if (IsValid(D)) {
                neighbourList.push(D);
            }
            if (IsValid(L)) {
                neighbourList.push(L);
            }

            return neighbourList;
        }

        function IsValid(point) {
            let i = point[0];
            let j = point[1];

            if (!((0 <= j && j < grid[0].length) && (0 <= i && i < grid.length))) {
                return false;
            }
            if (0 > i >= grid.length) {
                return false;
            }
            if (grid[i][j].closed) {
                return false;
            }
            return true;
        }


        function nextNode() {
            let minNode = openSet[0];
            for (let node of openSet) {
                if (node.f < minNode.f) {
                    minNode = node;
                }
            }
            minNode.closed = true;
            let index = openSet.indexOf(minNode);
            if (index > -1) {
                openSet.splice(index, 1);
            }
            return minNode
        }

        function setHeuristic(node) {
            let i = node.i;
            let j = node.j;
            let x = endPos[0];
            let y = endPos[1];
            /*
            Formulas:
            1.(Math.sqrt((x-i)**2 + (y-j)**2))
            2.(Math.abs(x-i)+Math.abs(y-j))   --- Better
            */
            node.h = (Math.abs(x - i) + Math.abs(y - j)) * setHeuristicWeight;
        }

        /*-------------------- Making Grid --------------------*/
        /*const width;
        const height; are being declared alreday, may change if nessesary*/
        var grid = [];
        for (let i = 0; i < height; i++) {
            grid.push([]);
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                grid[i][j] = new Node(i, j);
            }
        }
        /*-------------------- Identify Walls --------------------*/
        const wallsList = wallsListNodes;
        wallsList.forEach(wallID => {
            wallID = wallID.ID.split(/-/);
            grid[wallID[0]][wallID[1]].closed = true;
        })
        /*-------------------- Properties --------------------*/

        const startPos = startPosTemp.split(/-/);
        const endPos = endPosTemp.split(/-/);
        let visitedNodes = [];
        let openSet = [];
        let path = [];
        openSet.push(grid[startPos[0]][startPos[1]]);
        let setHeuristicWeight = 1;

        /*-------------------- Main Algorithm --------------------*/
        while (openSet.length !== 0) {
            var currentNode = nextNode();
            if (currentNode.i == endPos[0] && currentNode.j == endPos[1]) {
                while (currentNode.previous) {
                    currentNode = currentNode.previous;
                    path.push([currentNode.i, currentNode.j]);
                }
                path.push(endPos);
                break;
            }

            let neighbourPosList = FindNeighbours(currentNode);
            for (let neighbourPos of neighbourPosList) {
                let i = neighbourPos[0];
                let j = neighbourPos[1];
                let neighbour = grid[i][j];
                let tempValue = currentNode.g + 1
                if (neighbour in openSet) {
                    if (tempValue < neighbour.g) {
                        neighbour.g = tempValue;
                        neighbour.f = neighbour.g + neighbour.h;
                        neighbour.previous = currentNode;
                    }
                }
                else {
                    neighbour.previous = currentNode;
                    neighbour.g = tempValue;
                    setHeuristic(neighbour);
                    neighbour.f = neighbour.g + neighbour.h;

                    visitedNodes.push([neighbour.i, neighbour.j]);
                    openSet.push(neighbour);
                }
            }
        }
        /*Event Ends*/
        resolve({ path, visitedNodes });
    }))
}