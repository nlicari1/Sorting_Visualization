import React from "react";
import * as sortingAlgorithms from '../Algorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        /* Main Array */
        this.state = {
            array: [],
        };
    }   
 

 /* when app loads resets array */
 componentDidMount() {
    this.resetArray();
 }

  /* creates array up too 100 between 5-1000 then resets state of array */
 resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++){
        array.push(randomIntFromInterval(5, 1000));
    }
    this.setState({array});
 } 
 mergeSort() { 
    const javaScriptSortedArray = this.state.array.slice() /*creates copy of main array */
    .sort((a,b) => a - b); /* sorting method for js */
    const sortedArray = sortingAlgorithms.mergeSort(this.state.array); 
    console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
 }

 quickSort() {}

 heapSort() {}

 bubbleSort() {}

 testingSortingAlgorithms() { /* iterates random array between 1 - 1000 then push betwen -1000 and 1000 */
    for (let i = 0; i < 100; i++) {
        const array = []
        const length = randomIntFromInterval(1, 1000);
        for(let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b); /* sorts with js sort */
        const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice()); /* sorts with merge sort*/
        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray)); /* logs if they are equal */ 
    }
 }
 
 render() {
    const {array} = this.state;

    return (
         /* goes through array then maps to array bar*/

         <div className="array-container">
         {array.map((value, idex) => (
            <div className="array-bar" 
                key={idex}
                style={{height: `${value}px`}}>
            </div>
         ))}
         <button onClick={() => this.resetArray()}>Generate New Array</button>
         <button onClick={() => this.mergeSort()}>Merge Sort</button>
         <button onClick={() => this.quickSort()}>Quick Sort</button>
         <button onClick={() => this.heapSort()}>Heap Sort</button>
         <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
         <button onClick={() => this.testingSortingAlgorithms()}>Test Sorting Algorithms</button>
        </div>
    );
 }
}

 /* */
 function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function arraysAreEqual(arrayOne, arrayTwo) { /* check if arrays have same length then check each index, if value dont equal each other return false*/
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
 }