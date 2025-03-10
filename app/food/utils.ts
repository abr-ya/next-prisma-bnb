export const distributeProducts = (weights: number[], numBins: number) => {
  // Сортируем продукты по весу в порядке убывания
  weights.sort((a, b) => b - a);

  // Создаем массив для корзин
  const bins: Array<number[]> = Array.from({ length: numBins }, () => []);

  // Массив для хранения текущего веса каждой корзины
  const binWeights = Array(numBins).fill(0);

  // Проходим по отсортированным весам
  for (const weight of weights) {
    // Находим корзину с наименьшим текущим весом
    const minIndex = binWeights.indexOf(Math.min(...binWeights));

    // Добавляем продукт в эту корзину
    bins[minIndex].push(weight);

    // Обновляем вес корзины
    binWeights[minIndex] += weight;
  }

  return bins;
};

export const getArrSum = (data: number[]) => data.reduce((acc, el) => acc + el, 0);

export const packsToUsers = (packs: Array<number[]>) => {
  const usersPacks: Array<number[]> = Array.from({ length: packs.length }, () => []);

  packs.forEach((day) => {
    usersPacks.sort((a: number[], b: number[]) => getArrSum(a) - getArrSum(b));
    usersPacks.forEach((user, index) => user.push(day[index]));
  });

  return usersPacks;
};
