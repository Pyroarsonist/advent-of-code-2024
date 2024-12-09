const getDiskMap = (line) => {
  let id = -1;
  return line.split("").map((c, i) => {
    if (i % 2 === 0) {
      id++;
      return { type: "id", count: +c, id };
    }

    return { type: "emptySpace", count: +c };
  });
};

const getCheckSum = (diskMap) => {
  let sum = 0;
  let currentIndex = 0;

  for (const diskSpace of diskMap) {
    if (diskSpace.type === "id") {
      for (let i = currentIndex; i < currentIndex + diskSpace.count; i++) {
        sum += i * diskSpace.id;
      }
    }

    currentIndex += diskSpace.count;
  }

  return sum;
};

const findFirstEmptySpaceIndex = (spaceCount, diskMap) =>
  diskMap.findIndex(
    ({ type, count }) => type === "emptySpace" && count >= spaceCount,
  );

const moveDiskMap = (_diskMap) => {
  const diskMap = JSON.parse(JSON.stringify(_diskMap));
  for (let i = diskMap.length - 1; i !== 0; i--) {
    const currentSpace = diskMap[i];

    if (currentSpace.type === "emptySpace") continue;

    const firstEmptySpaceIndex = findFirstEmptySpaceIndex(
      currentSpace.count,
      diskMap,
    );

    if (firstEmptySpaceIndex > i) {
      continue;
    }

    if (firstEmptySpaceIndex === -1) {
      continue;
    }

    const firstEmptySpace = diskMap[firstEmptySpaceIndex];

    const emptySpaceLeft = firstEmptySpace.count - currentSpace.count;

    if (emptySpaceLeft < 0) continue;

    if (emptySpaceLeft === 0) {
      diskMap[firstEmptySpaceIndex] = currentSpace;
      diskMap[i] = firstEmptySpace;
    } else {
      diskMap[i] = {
        type: "emptySpace",
        count: currentSpace.count,
      };
      diskMap[firstEmptySpaceIndex].count = emptySpaceLeft;
      diskMap.splice(firstEmptySpaceIndex, 0, currentSpace);
      i++;
    }
  }

  return diskMap;
};
export const getSolution = (line) => {
  const diskMap = getDiskMap(line);
  const movedDiskMap = moveDiskMap(diskMap);
  return getCheckSum(movedDiskMap);
};
