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
    $("#player").on("timeupdate", Update);
}

function changeSong($musique){
    let player = $("#player");
    if($musique!==(player.attr("src"))){
        player.attr("src", $musique);
    }
}

function stop(){
    $('#playerContainer').css('display','none');
    changeSong("");
    open=0;
}

function change_vol() {
    $("#player").prop("volume",$('#change_vol').val());
}

function play(){
    $("#player").trigger("play");
    $('#playerPlay').css('display','none');
    $('#playerPause').css('display','inline');
}

function pause(){
    $("#player").trigger("pause");
    $('#playerPlay').css('display','inline');
    $('#playerPause').css('display','none');
}

function mute_vol(){
    let player = $("#player");
    player.prop("muted",!player.prop("muted"));
}

function change_time(){
    $('#player').prop("currentTime",$('#timeline').val());
}

function temps(prop){
    let player = $("#player");
    let min = Math.floor(player.prop(prop)/60);
    let sec = Math.floor(((player.prop(prop)/60)-min)*60);
    if (sec<10) sec="0"+sec;
    if (sec===60) {sec="00"; min++;}
    return {
        'min': min,
        'sec': sec
    };
}

function timer(){
    $('#timeline').attr("max", $("#player").prop("duration"));
    let {min, sec} = temps("duration");
    $('#timeTotal').text(min+":"+sec);
}

function Update(){
    $('#timeline').val(($("#player").prop("currentTime")));
    let {min, sec} = temps("currentTime");
    $('#time').text(min+":"+sec);
}