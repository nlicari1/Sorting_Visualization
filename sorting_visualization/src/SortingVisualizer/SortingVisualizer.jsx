import React from "react";
import {getMergeSortAnimations} from '../Algorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from "../Algorithms/sortingAlgorithms.js";
import {getQuickSortAnimations} from "../Algorithms/sortingAlgorithms.js";
import {getHeapSortAnimations} from "../Algorithms/sortingAlgorithms.js";
import './SortingVisualizer.css';

//value of speed for animations
const ANIMATION_SPEED_MS = 100;

// value for number of bars in array
const NUMBER_OF_ARRAY_BARS = 50;


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
        array.push(this.randomIntFromInterval(5, 500));
    }
    this.setState({array});
 } 

randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 }

 handleMergeAnimations(animations, speed){
    const arrayBars = document.getElementsByClassName('array-bar')

    for(let i = 0; i < animations.length; i++){
        const isColorChange = i % 3 !== 2
        if(isColorChange){
            const [barOneIndex, barTwoIndex] = animations[i]

            if(arrayBars[barOneIndex] && arrayBars[barTwoIndex]){
                const barOneStyle = arrayBars[barOneIndex].style
                const barTwoStyle = arrayBars[barTwoIndex].style
                const color = i % 3 === 0 ? 'blue' : 'lightcoral'
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * speed);
            }
        } else {
            setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i]
                    if(arrayBars[barOneIndex]){
                    const barOneStyle = arrayBars[barOneIndex].style
                    barOneStyle.height = `${newHeight}px`
                    }
                }, i * speed);
            }
        }
    }
 handleQuickAnimations(animations, speed){
    const arrayBars = document.getElementsByClassName('array-bar')

    for(let i = 0; i < animations.length; i++){
        const isColorChange = i % 3 !== 2
        if(isColorChange){
            const [barOneIndex, barTwoIndex] = animations[i]

            if(arrayBars[barOneIndex] && arrayBars[barTwoIndex]){
                const barOneStyle = arrayBars[barOneIndex].style
                const barTwoStyle = arrayBars[barTwoIndex].style
                const color = i % 3 === 0 ? 'blue' : 'lightcoral'
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * speed);
            }
        } else {
            setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i]
                    if(arrayBars[barOneIndex]){
                    const barOneStyle = arrayBars[barOneIndex].style
                    barOneStyle.height = `${newHeight}px`
                    }
                }, i * speed);
            }
        }
    }
 handleHeapAnimations(animations, speed){
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
            }, i * speed);
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
            }, i  * speed);
        }
    }
    }

    handleBubbleAnimations(animations, speed){
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
                }, i * speed);
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
                }, i  * speed);
            }
        }
    }




 mergeSort() { 
   const animations = getMergeSortAnimations(this.state.array) // get all merge sort animations
    this.handleMergeAnimations(animations, ANIMATION_SPEED_MS)
   }

 quickSort() {
    const animations = getQuickSortAnimations(this.state.array) // get all quick sort animations
    this.handleQuickAnimations(animations, ANIMATION_SPEED_MS)
 }

 heapSort() {
    const animations = getHeapSortAnimations(this.state.array) // get all heap sort animations
    this.handleHeapAnimations(animations, ANIMATION_SPEED_MS)
 }

 bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array) // get all bubble sort animations
    this.handleBubbleAnimations(animations, ANIMATION_SPEED_MS)
 }

 render() {
    const {array} = this.state;

    return (
         /* goes through array then maps to array bar*/
    <div>

         <button onClick={() => this.resetArray()} /*disabled ={this.state.isSorting}*/>Generate New Array</button>
         <button onClick={() => this.mergeSort()} /*disabled ={this.state.isSorting}*/>Merge Sort</button>
         <button onClick={() => this.quickSort()} disabled ={this.state.isSorting}>Quick Sort</button>
         <button onClick={() => this.heapSort()} /*disabled ={this.state.isSorting}*/>Heap Sort</button>
         <button onClick={() => this.bubbleSort()} /*disabled ={this.state.isSorting}*/>Bubble Sort</button>

         <div className="array-container">
         {array.map((value, index) => (
            <div className="array-bar" 
                key={index}
                style={{height: `${value}px`}}>
            </div>
            ))}
        </div>
    </div>
    );
 }
}