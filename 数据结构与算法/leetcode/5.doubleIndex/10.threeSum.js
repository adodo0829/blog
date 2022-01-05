var threeSum = function (nums) {
  const arr = nums.sort((a, b) => a - b);

  const set = new Set();

  // find three sum = 0
  for (let i = 0; i < arr.length; i++) {
    // arr有序, find the first num
    const first = arr[i];

    if (first > 0) {
      return [];
    }

    // how to find the second & third num
    // 现在相当于两数之和了, 前后双指针
    let secondIndex = i + 1;
    let thirdIndex = arr.length - 1;
    while (secondIndex < thirdIndex) {
      const sum = first + arr[secondIndex] + arr[thirdIndex];
      if (sum > 0) {
        thirdIndex--;
        continue;
      }

      if (sum < 0) {
        secondIndex++;
        continue;
      }
      set.add(`${first},${arr[secondIndex]},${arr[thirdIndex]}`);
      secondIndex++;
      thirdIndex--;
    }
  }

  return Array.from(set).map((item) => item.split(","));
};
