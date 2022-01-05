/**
 * 求数组交集, 假设数组长度不限且有重复元素
 * 这里使用 hash表 来存储
 */

const getInteraction = (arr1, arr2) => {
  const len1 = arr1.length;
  const len2 = arr2.length;

  // 遍历较短的数组, 较长的数组进行去重后用来判断元素是否存在
  // 设定arr2是短的, arr1是长的
  if (len1 < len2) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }

  const uniqSet = new Set(arr1);
  const resSet = new Set();

  // 遍历短的
  for (let i = 0; i < len2; i++) {
    if (uniqSet.has(arr2[i]) && !resSet.has(arr2[i])) {
      resSet.add(arr2[i]);
    }
  }

  return [...resSet];
};
