export function getMergeSortAnimations(array){
    const animations = []
    if (array.length <= 1) return array
    const auxiliaryArray = array.slice()
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations)
    return animations;
}
function mergeSortHelper( 
    mainArray,
    startIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    if(startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations)
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations)
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations)
}


function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations,
) {
    let k = startIndex
    let i = startIndex
    let j = middleIndex + 1
    while (i <= middleIndex && j <= endIndex){
        //values being compared, pushed once to change color
        animations.push([i,j])
        // values being compared then pushed second time to revert color
        animations.push([i,j])
        if(auxiliaryArray[i] <= auxiliaryArray[j]) {
            //overwrite the value at index k in original array with value at index i from auxiliary array
            animations.push([k, auxiliaryArray[i]])
            mainArray[k++] = auxiliaryArray[i++]
        } else {
            //overwrite the value at index k in original array with value at index j from auxiliary array
            animations.push([k, auxiliaryArray[j]])
            mainArray[k++] = auxiliaryArray[j++]
        }
    }
    while (i <= middleIndex){
        //these values that we are comparing push them to change color
        animations.push([i,i])
        //these values that we are comparing push them a second time to revert color
        animations.push([i,i])
        //overwrite the value at index k in original array with value at index i from auxiliary array
        animations.push([k,auxiliaryArray[i]])
        mainArray[k++] = auxiliaryArray[i++]
    }
    while (j <= endIndex){
        //these values that we are comparing push them to change color
        animations.push([j,j])
        //these values that we are comparing push them a second time to revert color
        animations.push([j,j])
        //overwrite the value at index k in original array with value at index j from auxiliary array
        animations.push([k,auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++]
    }
}