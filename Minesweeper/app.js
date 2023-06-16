document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squares = [];
    let isGameOver = false;
    let flags = 0

    //create board
    function createBoard(){

        //get random bombs array
        const bombArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        
        
        for(let i = 0; i < width * width; i++){
            const square = document.createElement('div')
            square.setAttribute('id', i)
            //below line adds the fetched array element as the class name for the div above(or basically the small squares)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square);
            squares.push(square)

            //normal click
            square.addEventListener('click', function(e){
                click(square)
            })

            //cntrl and left click
            square.oncontextmenu = function(e){
                console.log('flag')
                e.preventDefault();
                addFlag(square);
            }
        }


        //add numbers
        for(let i = 0; i < width * width; i++){
            let total = 0;
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1) 
            if(squares[i].classList.contains('valid')){
                //checking north-east square
                if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;

                // checking north square
                if(i > 9 && squares[i - width].classList.contains('bomb')) total ++;

                //checking north-west square
                if(i > 9 && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) total++;

                //checking west square
                if(!isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;

                //checking south-west square
                if(i < 90 && !isLeftEdge &&squares[i + width - 1].classList.contains('bomb')) total++;

                //checking south square
                if(i < 90 && squares[i + width].classList.contains('bomb')) total++;

                //checking south-east square
                if(i < 90 && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) total++;

                //checking east square
                if(!isRightEdge && squares[i + 1].classList.contains('bomb')) total++;


                squares[i].setAttribute('data', total);  
                // console.log(squares[i])
            }
        }
    }

    createBoard()

    //add flag with right click
    function addFlag(square){
        if(isGameOver) {
            return
        }
        
        if(!square.classList.contains('checked') && (flags < bombAmount)){
            if(!square.classList.contains('flag')){
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                checkForWin()
            } 
            else{
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
            }
        }
    }

    //click on square actions 
    function click(square){
        let currentId = square.id
        if(isGameOver)
            return;

        if(square.classList.contains('checked') || square.classList.contains('flag'))
            return;
        
        if(square.classList.contains('bomb')){
            gameOver(square)
        } else{
            let total = square.getAttribute('data')
            //marks all those clicked sqaure with neighbouring bombs
            if(total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        //marks all those clicked sqaure with no neighbouring bombs
        square.classList.add('checked')
    }

    //check and mark all the neighbour if a empty square is clicked
    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);
        
        setTimeout(() => {
            //north-east
            if(currentId > 9 && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //north
            if(currentId > 9){
                const newId = squares[parseInt(currentId) - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //north-west
            if(currentId > 10 && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //west
            if(!isLeftEdge){
                const newId = squares[parseInt(currentId) - 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //south-west
            if(currentId < 90 && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //south
            if(currentId < 90){
                const newId = squares[parseInt(currentId) + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //south-east
            if(currentId < 90 && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            //east
            if(!isRightEdge){
                const newId = squares[parseInt(currentId) + 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }

    function gameOver(square){
        console.log('GAMEOVER :(')

        isGameOver = true;

        squares.forEach(square => {
            if(square.classList.contains('bomb')){
                square.innerHTML = '💣'
            }
        })
    }

    //check for win
    function checkForWin(){
        let matches = 0;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches++;
            }
            if(matches == bombAmount){
                console.log('YOU WIN !!!')
                isGameOver = true
            }
        }
    }
})