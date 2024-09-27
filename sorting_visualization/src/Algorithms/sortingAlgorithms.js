export const mergeSort = array => {
    if (array.length === 1) return array;
    const middleIndex = Math.floor(array.length / 2)
    const firstHalf = mergeSort(array.slice(0, middleIndex))
    const secondHalf = mergeSort(array.slice(middleIndex))
    const sortedArray = []
    
    let i = 0, j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if(firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++])
        } else {
            sortedArray.push(secondHalf[j++])
        }
    }
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++])
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++])
    return sortedArray
};