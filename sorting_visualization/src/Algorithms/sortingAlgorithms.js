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



export function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, lowIndex, highIndex, animations) {
    if (lowIndex < highIndex) {
        const pivotIndex = partitionQuickSort(array, lowIndex, highIndex, animations);
        quickSortHelper(array, lowIndex, pivotIndex - 1, animations);
        quickSortHelper(array, pivotIndex + 1, highIndex, animations);
    }
}

function partitionQuickSort(array, lowIndex, highIndex, animations) {
    const pivot = array[highIndex];
    let pivotIndex = lowIndex - 1;

    for (let i = lowIndex; i < highIndex; i++) {
        animations.push([i, highIndex]); // compare with pivot
        animations.push([i, highIndex])//revert color
        if (array[i] < pivot) {
            pivotIndex++;
            animations.push([pivotIndex, array[i]]); // swap
            animations.push([i, array[pivotIndex]]); // swap
            
            //swap
            const temp = array[pivotIndex]
            array[pivotIndex] = array[i]
            array[i] = temp
        }
    }
    animations.push([pivotIndex + 1, array[highIndex]]); //swap pivot animation
    animations.push([highIndex, array[pivotIndex + 1]])//swap pivot animation
    
    //swap
    const temp = array[pivotIndex + 1]
    array[pivotIndex+1]= array[highIndex]
    array[highIndex] = temp

    return pivotIndex + 1;
}

export function getHeapSortAnimations(array) {
    const animations = [];
    heapHelper(array, animations)
    return animations
}
function heapHelper(array, animations){
    const length = array.length

    // Build heap
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(array, length, i, animations);
    }
    
    // Perform heapsort
    for (let i = length - 1; i > 0; i--) {
        //animations.push([0, i]); // compare with last element
        //animations.push([0, i]); // revert color
        animations.push([0, array[i]]); // push new height for root
        animations.push([i,array[0]]); // push new height for last element
       
        //swap 
        const temp = array[0]
        array[0] = array[i]
        array[i] = temp
        heapify(array, i, 0, animations);
    }
    //return animations;
}

function heapify(array, length, i, animations) {
    let largest = i;
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    if (left < length) {
        //animation for comparing root with left child
        animations.push([i,left])//compare left child
        animations.push([i,left])// revert color
        if(array[left] > array[i]){
            largest = left;
        }
    }
    if (right < length) {
        animations.push([i,right])//compare right child
        animations.push([i,right])// revert color
        if(array[right] > array[i]){
            largest = right;
        }
    }
    
    if (largest !== i) {
        // animation for swapping the largest element with the root
        animations.push([i, array[largest]]); // push new height for root
        animations.push([largest, array[i]]) //push new height for largest

        //swap root with largest child
        const temp = array[i]
        array[i]= array[largest]
        array[largest] = temp
        //recursively heap subtree
        heapify(array, length, largest, animations);
    }
}
