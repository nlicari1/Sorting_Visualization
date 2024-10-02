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

export function getBubbleSortAnimations(array){
    const animations = []   
    for(let i=0; i < array.length; i ++){
        //last i element are already in place
        for(let j = 0; j< array.length - i - 1; j++){
            animations.push([j, j+1])//compare
            animations.push([j, j+1])//revert
            //checking if item at present iteration is greater than next
            if(array[j] > array[j+1]){
                //if true then swap
                animations.push([j, j+1])

                const temp = array[j]
                array[j]= array[j+1]
                array[j+1] = temp
            } else {
                //dummy animation if no swap is needed
                animations.push([-1, -1]) //no swap
            }
        }
    }
    return animations;
}



export function getQuickSortAnimations(array){
    const animations = []
    if(array.length <= 1){
        return array
    }
    quickSortHelper(array, 0, array.length -1, animations)
    return animations
    
}

function quickSortHelper(array, lowIndex, highIndex, animations){
    if(lowIndex >= highIndex) 
        return;
    const pivotIndex = partitionQuickSort(array, lowIndex, highIndex, animations);
    quickSortHelper(array, lowIndex, pivotIndex - 1, animations)
    quickSortHelper(array, pivotIndex + 1, highIndex, animations);
}

function partitionQuickSort(array, lowIndex, highIndex, animations){
    const pivot = array[highIndex]
    let pivotIndex = lowIndex
    for(let i = lowIndex; i < highIndex; i++){
        animations.push([i, highIndex])
        animations.push([i, highIndex])
        if(array[i] < pivot){
            animations.push([i, pivotIndex])
            swapQuickSort(array, i, pivotIndex)
            pivotIndex++;
        }
    }
    animations.push([pivotIndex, highIndex])
    swapQuickSort(array, pivotIndex, highIndex);
    return pivotIndex;

}

function swapQuickSort(array, index1, index2){
    const temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}






