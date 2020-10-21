import React, { useEffect } from 'react';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
const $ = window.$;

function Surf(props) { 

  let imgArray = new Array();
  let bgm = new Audio('');
  let imgNum = 1;
  let initialCnt = 0.003;
  let objImg;
  let imgOpacity = 0;
  let keepPlay = true;

  function setImage() {

    for (let i = 1; i <= 52; i++) {
      imgArray[i] = "/images/surf/surf (" + i + ").png";
    }
  }
   

  function showImage() {
    objImg = document.getElementById("introimg");
    objImg.style.opacity = imgOpacity;
    objImg.src = imgArray[imgNum++];
    
    if (imgNum > 52) {
      imgNum = 1;
    }
    setTimeout(showImage, 60);
  }

  function setAudio() {

    //오디오
    if (!bgm.canPlayType('audio/ogg')) alert('브라우저가 ogg 재생을 지원하지 않습니다.');
    else {
      let bgm_url = 'http://upload.wikimedia.org/wikipedia/commons/d/d7/Wikinews_Remix_Jingle.ogg';
      bgm = new Audio(bgm_url);
      bgm.volume = 0;
      bgm.loop=true;
      //bgm.play();
      
    }
  }
  function setAudioFadeIn(){
    
    //오디오
    if(initialCnt*1.3 + bgm.volume < 1){
      initialCnt *= 1.3;
      bgm.volume += initialCnt;
      setTimeout(setAudioFadeIn, 150);
    } else{
      bgm.volume = 1;
    }
   }

   

  function setImgFadeIn(){
    
    let opacityValue = objImg.style.opacity;
    opacityValue *= 1;
    
    //투명도
    if(initialCnt*1.3 + opacityValue < 1){
      
      imgOpacity += initialCnt;
      
      setTimeout(setImgFadeIn, 200);
    } else{
      
      imgOpacity =1;
    }
    
  }
  
  
  function setAudioFadeOut() {

    //오디오
    if (bgm.volume - initialCnt * 1.3 > 0) {
        initialCnt *= 1.3;
        bgm.volume -= initialCnt;
        setTimeout(setAudioFadeOut, 100);
    } else {
        bgm.volume = 0;
    }
}

  function setImgFadeOut() {

    let opacityValue = imgOpacity;
    opacityValue *= 1;

    //투명도
    if (opacityValue - initialCnt * 1.3 > 0) {

        imgOpacity -= initialCnt;
        setTimeout(setImgFadeOut, 100);
    } else {
        keepPlay = false;
        props.history.push("/surf");
        imgOpacity = 0;

        
    }

}


  function mouseEvent() {
    //마우스 커서 이벤트
    $(document).ready(function () {

      $(document).mousemove(function (e) {

        let x = e.pageX;
        let y = e.pageY;

        let wi = document.body.clientWidth / 2;
        let he = document.body.clientHeight / 2;

        if (x > wi / 2 - 50 && x < wi / 2 + 50 && y > he - 50)
          $('body').css('cursor', 'pointer');
        else {
          $('body').css('cursor', 'default');
        }

      });
    });
  }

  useEffect(() => {
    setImage(); 
    showImage();
    mouseEvent();
    setAudio();
    setImgFadeIn();
    setAudioFadeIn();
    
  })

  return (
    <div className="App">

      <img id="introimg" style={{opacity:'0.1'}} />
    </div>
  );
}

export default Surf;
