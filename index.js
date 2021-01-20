//help button
const help=document.getElementById("help")
//help count for checking initial case 
let helpcount=0
//helpclosebtn
const helpclosebtn=document.getElementById("helpclose")
//play
const play=document.getElementById("play")
//query for help modal box
const helpModal=document.querySelector(".help")
//pause condition
let pause=false
//start resest button status
let start=true
//getting modal 
const modal=document.querySelector('.modal')
//score final
const finalscore=document.getElementById('gameoverscore')
//reset button
const resetButton=document.querySelector(".reset")
//start button
const startbutton=document.getElementById('start')
//calling grid class
const grid=document.querySelector('.grid')
//get scorecard 
const scorecard=document.getElementById('score')
//creatig snake
let snake=[1123,1122,1121]
//direction
let direction=1
//fruit index
let fruitindex=0
//creating cell
let cells=[]

//timer of pause state
let pauseTimer;
//width of the grid
let width=50
//set total cell
const totalCell=width*width;
//for managing multiple keys

//for intervalTime
let intervalTime
//speed
let speed
//for scoreboard
let score=0
//for interval
let timer
for(let i=0;i<totalCell;i++)
{
    //creating new div element
    const cell= document.createElement('div');
    cell.classList.add('cell')
    
    grid.appendChild(cell)
    cells.push(cell)
}



// making fruit
function generateFruit(){
    do{

        fruitindex=Math.floor(Math.random()*totalCell)
       
    }while(cells[fruitindex].classList.contains('snake'))
    cells[fruitindex].classList.add('fruit')
}


function moveSnake(){
      
    
    //making bounding box to check snake is inside the grid and doesnt intersect its body
    if((snake[0]%width===width-1 && direction===1) ||
    (snake[0]%width===0 && direction===-1)  ||
    (snake[0]+width >= totalCell && direction===width) || (snake[0]-width< 0 && direction===-width)
     || (cells[snake[0]+direction].classList.contains('snake')))
        {    
            start =!start
            modal.style.display="block"
            finalscore.textContent="your final score is: "+score
            return clearInterval(timer)
            
            
        }
    
    let tail=snake.pop()
    
    cells[tail].classList.remove('snake')
  
   
    //adding one pixel to the head
    snake.unshift(snake[0]+direction)
    cells[snake[0]].classList.add('snake')

  //eat the fruits
    if(snake[0]===fruitindex){
        
        cells[fruitindex].classList.remove('fruit')
        //make snake bigger by pushing to snake array
        snake.push(tail)
        cells[tail].classList.add('snake')
        //calling the fruit function to randomize the fruit placement
        generateFruit()
        //clearmoving interval
        clearInterval(timer)
        //increasing the intervalTime
        intervalTime*=speed
        //new interval
        timer=setInterval(moveSnake,intervalTime)
        //score display
        score+=1
        
        scorecard.textContent=score

    }
    

}

play.addEventListener("click",function(){
    pause=!pause
    if(pause)
    {
        clearInterval(timer)
    play.textContent="play now 😇"
}
    else{
        timer=setInterval(moveSnake,intervalTime)
        play.textContent="pause ☕"
    }

})
//showing help modal
help.addEventListener('click',function(){
    //pausing if playing
    clearInterval(timer)
    
  
  helpModal.style.display="block" 
  
})

//closing help modal box
helpclosebtn.addEventListener('click',function(){
    helpModal.style.display="none"
    
      if(helpcount===0)
      return 
      else
      timer=setInterval(moveSnake,intervalTime) 
       
    
   
})


//for directing the snake
function snakeDirection(event){
    console.log(event.keyCode)
    //up arrow
    if(event.keyCode===38){
        
      if (direction=== width)
        return
       direction=-width;  
      
    }
    //down arrow
    else if(event.keyCode===40){
       if(direction=== -width) 
       return
       direction=width;
           
        
        
    }
    //right arrow
    else if(event.keyCode===39){
        if(direction===-1)
        return
        direction= 1
    }
    //left arrow
    else if(event.keyCode===37){
        if (direction===1)
        return
        direction= -1
    }

    

    
}


//function for start button

function starting(){
    //increasing count to know if it has started
    helpcount++
    if(start){
        startbutton.textContent="restart🤓"
        
        
    }
    else{
        startbutton.textContent="start🤓"
        start =!start
    }
    snake.forEach(index=>{
        cells[index].classList.remove('snake')
    })

    cells[fruitindex].classList.remove('fruit')
    //creatig snake
snake=[1123,1122,1121]
direction=1
//fruit index
fruitindex=0
//interval time
intervalTime=300  
speed=0.9




//making snake
  snake.forEach(index=>
    {   
        cells[index].classList.add('snake')        }
       )
        generateFruit()

    //clear interval if there is any        
    clearInterval(timer)
       //moving snake
      timer=setInterval(moveSnake,intervalTime)
      play.style.display="block"
}
//initiating start button
startbutton.addEventListener('click',starting)

//call function in the intervalTime interval

document.addEventListener('keydown',snakeDirection)

resetButton.addEventListener('click',function(){
    modal.style.display="none"
    starting()
})
