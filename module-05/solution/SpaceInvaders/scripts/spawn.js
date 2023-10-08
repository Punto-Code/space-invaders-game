const spawnPoints = [
  { x: 0, y: -83 },
  { x: 40, y: -83 },
  { x: 80, y: -83 },
  { x: 120, y: -83 },
  { x: 160, y: -83 },
  { x: 200, y: -83 },
  { x: 240, y: -83 },
  { x: 280, y: -83 },
  { x: 320, y: -83 },
  { x: 360, y: -83 },
  { x: 400, y: -83 },
  { x: 440, y: -83 },
  { x: 480, y: -83 },
  { x: 520, y: -83 },
  { x: 560, y: -83 },
  { x: 600, y: -83 },
];

const availableSpawnPoints = new Set(spawnPoints);

function getRandomSpawnPoint() {
  const pointsArray = Array.from(availableSpawnPoints);
  const randomPoint =
    pointsArray[Math.floor(Math.random() * pointsArray.length)];
  availableSpawnPoints.delete(randomPoint);
  return randomPoint;
}

function addSpawnPoint(point) {
  availableSpawnPoints.add(point);
}