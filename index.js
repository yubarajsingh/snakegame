

//calling grid class
const grid=document.querySelector('.grid')
//creatig snake
let snake=[12,11,10]
//creating cell
let cells=[]
//forming grid cell using loop
let direction=1
//width of the grid
let width=50
//set total cell
const totalCell=width*width;
//fruit index
let fruitindex=0



for(let i=0;i<totalCell;i++)
{
    //creating new div element
    const cell= document.createElement('div');
    cell.classList.add('cell')
    
    grid.appendChild(cell)
    cells.push(cell)
}

//making snake
snake.forEach(index=>
    {   
        cells[index].classList.add('snake')        }
       )

// making fruit
function fruit(){
    do{

        fruitindex=Math.floor(Math.random()*totalCell)
       
    }while(cells[fruitindex].classList.contains('snake'))
    cells[fruitindex].classList.add('fruit')
}

fruit()
       //moving snake

function moveSnake(){
    
    let tail=snake.pop()
    
    cells[tail].classList.remove('snake')
    snake.unshift(snake[0]+direction)
    cells[snake[0]].classList.add('snake')
    

}
let timer=setInterval(moveSnake,1000)

function snakeDirection(event){
    
    //up arrow
    if(event.keyCode===38){
        direction= -width
    }
    //right arrow
    else if(event.keyCode===39){
        direction= 1
    }
    //left arrow
    else if(event.keyCode===37){
        direction= -1
    }

    //down arrow
    else if(event.keyCode===40){
        direction=width
    }

    
}


document.addEventListener('keydown',snakeDirection)

