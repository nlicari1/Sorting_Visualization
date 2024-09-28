import React from "react";
import {getMergeSortAnimations} from '../Algorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from "../Algorithms/sortingAlgorithms.js";
import './SortingVisualizer.css';

//value of speed for animations
const ANIMATION_SPEED_MS = 3;

// value for number of bars in array
const NUMBER_OF_ARRAY_BARS = 310;


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        /* Main Array */
        this.state = {
            array: [],
        };
    }   
 

 // when app loads resets array 
 componentDidMount() {
    this.resetArray();
 }

  // creates array up too 100 between 5-1000 then resets state of array 
 resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
        array.push(randomIntFromInterval(5, 1000));
    }
    this.setState({array});
 } 
 mergeSort() { 
  // this.setState({isSorting: true}); //disable UI
   const animations = getMergeSortAnimations(this.state.array) // get all merge sort animations
   for (let i = 0; i < animations.length;i++){ //iterate through animations
    const arrayBars = document.getElementsByClassName('array-bar') // when at animation grab new array bar currently in DOM
    const isColorChange = i % 3 !== 2; //check to see if dealing with color change (happens first 2 values for every 3)
    if(isColorChange){
        const [barOneIndex, barTwoIndex] = animations[i] // dealing with the 2 bars
        const barOneStyle = arrayBars[barOneIndex].style // changing the bar colors
        const barTwoStyle = arrayBars[barTwoIndex].style
        const color = i % 3 === 0 ? 'blue':'lightcoral';
        setTimeout(() => {
            barOneStyle.backgroundColor = color
            barTwoStyle.backgroundColor = color
        }, i * ANIMATION_SPEED_MS);
    } else {
        setTimeout(() => {
            // at % 3 == 2 dealing with overwriting value; values of animation index of bar we are overwriting and new height we give that bar(new value we are overwriting with)
            const [barOneIndex, newHeight] = animations[i] 
            const barOneStyle = arrayBars[barOneIndex].style
            barOneStyle.height = `${newHeight}px`;
        }, i  * ANIMATION_SPEED_MS);
    }
   }
    /*setTimeout(() => {
        this.setState({isSorting: false});
    }, animations.length * ANIMATION_SPEED_MS);*/
 }

 quickSort() {}

 heapSort() {}

 bubbleSort() {
    //this.setState({isSorting: true}); //disable UI
    const animations = getBubbleSortAnimations(this.state.array) // get all bubble sort animations
    for (let i = 0; i < animations.length; i++){ //iterate through animations
        const arrayBars = document.getElementsByClassName('array-bar') // when at animation grab new array bar currently in DOM
        const isColorChange = i % 3 !== 2; //check to see if dealing with color change (happens first 2 values for every 3)
        if(isColorChange){
            const [barOneIndex, barTwoIndex] = animations[i] // dealing with the 2 bars
            if(arrayBars[barOneIndex] && arrayBars[barTwoIndex]){ 
            const barOneStyle = arrayBars[barOneIndex].style // changing the bar colors
            const barTwoStyle = arrayBars[barTwoIndex].style
            const color = i % 3 === 0 ? 'blue':'lightcoral';
            setTimeout(() => {
                barOneStyle.backgroundColor = color
                barTwoStyle.backgroundColor = color
            }, i * ANIMATION_SPEED_MS);
          }
        } else {
            setTimeout(() => {
            // at % 3 == 2 dealing with overwriting value; values of animation index of bar we are overwriting and new height we give that bar(new value we are overwriting with)
                const [barOneIndex, barTwoIndex] = animations[i]
                if(arrayBars[barOneIndex] && arrayBars[barTwoIndex]){ 
                const barOneStyle = arrayBars[barOneIndex].style
                const barTwoStyle = arrayBars[barTwoIndex].style
                const tempHeight = barOneStyle.height
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight
              }  
            }, i  * ANIMATION_SPEED_MS);
        }
    }
    /*setTimeout(() => {
        this.setState({isSorting: false});
    }, animations.length * ANIMATION_SPEED_MS);*/
}

 /* testingSortingAlgorithms() { /* iterates random array between 1 - 1000 then push betwen -1000 and 1000 
    for (let i = 0; i < 100; i++) {
        const array = []
        const length = randomIntFromInterval(1, 1000);
        for(let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b); //sorts with js sort 
        const mergeSortedArray = getMergeSortAnimations(array.slice()); //sorts with merge sort
        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray)); //logs if they are equal 
    }
 }*/
 render() {
    const {array} = this.state;

    return (
         /* goes through array then maps to array bar*/

         <div className="array-container">
         {array.map((value, idex) => (
            <div className="array-bar" 
                key={idex}
                style={{backgroundColor: "lightcoral" ,height: `${value}px`}}>
            </div>
         ))}
         <button onClick={() => this.resetArray()} /*disabled ={this.state.isSorting}*/>Generate New Array</button>
         <button onClick={() => this.mergeSort()} /*disabled ={this.state.isSorting}*/>Merge Sort</button>
         <button onClick={() => this.quickSort()} /*disabled ={this.state.isSorting}*/>Quick Sort</button>
         <button onClick={() => this.heapSort()} /*disabled ={this.state.isSorting}*/>Heap Sort</button>
         <button onClick={() => this.bubbleSort()} /*disabled ={this.state.isSorting}*/>Bubble Sort</button>
        </div>
    );
 }
}

 /* */
 function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 }

 /*function arraysAreEqual(arrayOne, arrayTwo) { /* check if arrays have same length then check each index, if value dont equal each other return false
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
 }*/