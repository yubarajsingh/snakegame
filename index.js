
let start=true
const startbutton=document.getElementById('start')
//calling grid class
const grid=document.querySelector('.grid')
//get scorecard 
const scorecard=document.getElementById('score')
//creatig snake
let snake=[12,11,10]
//direction
let direction=1
//fruit index
let fruitindex=0
//creating cell
let cells=[]
//forming grid cell using loop

//width of the grid
let width=50
//set total cell
const totalCell=width*width;

//for intervalTime
let intervalTime=300
//speed
let speed=0.5
//for scoreboard
let score=0
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
        {    console.log(timer);
            start =!start
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




function snakeDirection(event){
    
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

//initiating start button
startbutton.addEventListener('click',function(){
    if(start){
        startbutton.textContent="restart🤓"
        start=!start
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
snake=[12,11,10]
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

        
       //moving snake
      timer=setInterval(moveSnake,intervalTime)
})

//call function in the intervalTime interval

document.addEventListener('keydown',snakeDirection)

