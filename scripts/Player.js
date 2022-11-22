let open=0;
function openSong($musique){
    if (open===0){
        $('#playerContainer').css('display','block');
        open=1;
    }
    changeSong($musique);
    setTimeout(function (){
        timer();
    }, 10)
    $('#player').on("timeupdate", Update);
}

function changeSong($musique){
    if($musique!==($('#player').attr("src"))){
        $('#player').attr("src", $musique);
    }
}

function stop(){
    $('#playerContainer').css('display','none');
    changeSong("");
    open=0;
}

function change_vol() {
    $('#player').prop("volume",$('#change_vol').val());
}

function play(){
    $('#player').trigger("play");
    $('#playerPlay').css('display','none');
    $('#playerPause').css('display','inline');
}

function pause(){
    $('#player').trigger("pause");
    $('#playerPlay').css('display','inline');
    $('#playerPause').css('display','none');
}

function mute_vol(){
    $("#player").prop("muted",!$("#player").prop("muted"));
}

function change_time(){
    $('#player').prop("currentTime",$('#timeline').val());
}

function timer(){
    $('#timeline').attr("max", $('#player').prop("duration"));
    let minT = Math.floor($('#player').prop("duration")/60);
    let secT = Math.floor((($('#player').prop("duration")/60)-minT)*60);
    if (secT<10) secT="0"+secT;
    if (secT===60) {secT="00"; minT++;}
    $('#timeTotal').text(minT+":"+secT);
}

function Update(){
    $('#timeline').val(($('#player').prop("currentTime")));
    let min = Math.floor($('#player').prop("currentTime")/60);
    let sec = Math.floor((($('#player').prop("currentTime")/60)-min)*60);
    if (sec<10) sec="0"+sec;
    if (sec===60) {sec="00"; min++;}
    $('#time').text(min+":"+sec);
}