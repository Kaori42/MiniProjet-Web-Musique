let open=0;
let mute=0;
let playing=1;
let upopen=0;
function openSong($musique){
    if (open===0){
        $('#playerContainer').css('display','flex');
        open=1;
    }
    changeSong($musique);
    $("#player").on("timeupdate", Update);
    $("body").on("keydown",Key);
    play();
}

function changeSong($musique){
    let player = $("#player");
    if($musique!==(player.attr("src"))){
        player.attr("src", $musique);
        //name();
    }
}

function stop(){
    let player = $("#playerContainer");
    changeSong("");
    player.addClass('hide');
    setTimeout( function(){
        player.css('display','none');
        player.removeClass('hide');
    },1000);
    open=0;
}

function change_vol(volume) {
    let player = $("#player");
    let mutelogo = $("#playerVolume");
    player.prop("volume",volume);
    if (volume==='0'){
        player.prop("muted", true);
        mutelogo.css('background-image', 'url("./player/mute.png")');
        mute=1;
    } else {
        player.prop("muted", false);
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

function change_time(time){
    $('#player').prop("currentTime",time);
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
    if($('#player').prop("paused")===true){
        pause();
    } else play();
}

function Key(e){
    vol = $("#change_vol");
    time = $("#timeline");
    switch(e.keyCode){
        case 32:
            if(playing===0){
                play();
                playing=1;
            } else{
                pause();
                playing=0;
            }
            break;
        case 37: //left
            change_time(parseFloat(time.val())-10);
            break;
        case 38: //up
            if (parseFloat(vol.val()) + 0.1<=1) {
                change_vol(parseFloat(vol.val()) + 0.1);
                vol.val(parseFloat(vol.val()) + 0.1);
            } else{
                change_vol(1);
                vol.val(1);
            }
            break;
        case 39: //right
            change_time(parseFloat(time.val())+10);
            break;
        case 40: //down
            if (parseFloat(vol.val()) - 0.1>=0) {
                change_vol(parseFloat(vol.val()) - 0.1);
                vol.val(parseFloat(vol.val()) - 0.1);
            } else{
                change_vol(0);
                vol.val(0);
            }
            break;
        default:
            break;
    }
}

function name(i){
    let song = songs[i];
    $("#Title").innerHTML = song.name;
    $("#Artist").innerHTML = song.artist;
}

function openUpgrades(){
    let up = $("#listeUpgrades");
    if (upopen===0){
        up.css('display','block');
        upopen=1;
    } else {
        up.css('display','none');
        upopen=0;
    }
}