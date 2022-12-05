let open=0;
let mute=0;
let playing=1;
let upopen=0;
function openSong($id){
    if (open===0){
        $('#playerContainer').css('display','flex');
        open=1;
    }
    changeSong($id);
    $("#player").on("timeupdate", Update);
    $("body").on("keydown",Key);
    play();
}

function changeSong($id){
    let player = $("#player");
    if(songs[$id].path!==(player.attr("src"))){
        player.attr("src", songs[$id].path);
        change($id);
    }
}

function stop(){
    let playerC = $("#playerContainer");
    $("#player").attr("src", "");
    playerC.addClass('hide');
    setTimeout( function(){
        playerC.css('display','none');
        playerC.removeClass('hide');
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
    let vol = $("#change_vol");
    let time = $("#timeline");
    switch(e.keyCode){
        case 32: //space
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

function change($id){
    let song = songs[$id];
    $("#musicName").text(song.name);
    $("#musicArtist").text(song.artist);
    $("#albumImg").attr("src", song.cover);
}

function openUpgrades(){
    let up = $("#listeUpgrades");
	let upMenu = $("#upgradesMenu");
    if (upopen===0){
        up.css('display','block');
		upMenu.css('height', '500.5px');
        upopen=1;
    } else {
        up.css('display','none');
		upMenu.css('height', '0');
        upopen=0;
    }
}