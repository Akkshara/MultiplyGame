// if we click start reset button
    // if we are playing
       // reload page
    //if not playing
        //show countdown box
          // reduce time by one sec
                 //time left ?
                 //yes continue if no- gameover
 /***************************************************************************************** */
//when we click start time shows
var playing = false;
var score ;
var action;
var timeremaining;
var correctans;



document.getElementById("startreset").onclick=function(){ 
    if(playing == true){
        location.reload();
        

    }
    else{ // if not playing
        playing = true; //changing mode to play
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        show("timeremaining");
        timeremaining =60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        hide("gameover");

        document.getElementById("startreset").innerHTML="Reset game";

        //start countdown
        startcountdown();


        // generate qns and ans
        generateqa();
        




    }
    
}
//clicking on the ans box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctans){
                //corrext ans
    
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
    
                //generate new qns
                generateqa();
    
            }
            else{
                //wrong ans
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
    
            }
    
        }
    
    }
}

//functions

//start countdown
function startcountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining == 0){
            //game over;
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>gameover!</p><p>your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "start game";

        }

    },1000);
}

//stop counter
function stopcountdown(){
    clearInterval(action);



}
// hide an element
function hide(id){
    document.getElementById(id).style.display="none";
}

// show  an element
function show(id){
    document.getElementById(id).style.display="block";
}

function generateqa(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctans = x*y;
    document.getElementById("question").innerHTML = x +"x" + y;
    var correctpos =  1+ Math.round(3*Math.random());
    document.getElementById("box"+correctpos).innerHTML = correctans; // fill one box with correct ans

    var answers = [correctans];

    for(i=1;i<5;i++){
        if(i!== correctpos){
            var wrongans; 
            do{
                wrongans = ( 1+ Math.round(9*Math.random()))*( 1+ Math.round(9*Math.random()));
            }
            while(answers.indexOf(wrongans)>-1)
            document.getElementById("box"+i).innerHTML = wrongans;
            answers.push(wrongans);
        }
    }




}
