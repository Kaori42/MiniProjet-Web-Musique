let open=0;
let mute=0;
function openSong($musique){
    if (open===0){
        $('#playerContainer').css('display','flex');
        open=1;
    }
    changeSong($musique);
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
    let vol = $('#change_vol');
    let mutelogo = $("#playerVolume");
    $("#player").prop("volume",vol.val());
    if (vol.val()==='0'){
        mutelogo.css('background-image', 'url("./player/mute.png")');
        mute=1;
    } else {
        mutelogo.css('background-image', 'url("./player/volume.png")');
        mute=0;
    }
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
    let mutelogo = $("#playerVolume");
    if(mute===0){
        player.prop("muted", true);
        mutelogo.css('background-image', 'url("./player/mute.png")');
        mute=1;
    }
    else{
        player.prop("muted", false);
        mutelogo.css('background-image', 'url("./player/volume.png")');
        mute=0;
    }
}

function change_time(){
    $('#player').prop("currentTime",$('#timeline').val());
}

function timeC(prop){
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

function duration(){
    $('#timeline').attr("max", $("#player").prop("duration"));
    let {min, sec} = timeC("duration");
    $('#timeTotal').text(min+":"+sec);
}

function currentTime(){
    $('#timeline').val(($("#player").prop("currentTime")));
    let {min, sec} = timeC("currentTime");
    $('#time').text(min+":"+sec);
}

function Update(){
    duration();
    currentTime();
}