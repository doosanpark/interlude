import React, { useEffect } from 'react';
import jQuery from "jquery";
import './MainPage.css'
window.$ = window.jQuery = jQuery;
const $ = window.$;

function Falling(props) {

  let imgArray = new Array();
  let bgm = new Audio('');
  let imgNum = 1;
  let objImg;
  let imgOpacity = 0;
  let keepPlay = true;

  //페이드 인 아웃 시 카운트
  let volCnt = 0.0001;
  let imgCnt = 0.0003;
  function setImage() {

    for (let i = 1; i <= 532; i++) {
      imgArray[i] = "/images/umbrella/umbrella (" + i + ").png";
    }
  }

  function showImage() {
    objImg = document.getElementById("introimg");
    objImg.style.opacity = imgOpacity;
    objImg.src = imgArray[imgNum++];

    if (imgNum == 455) {
      setAudioFadeOut();
      setImgFadeOut();
    }

    //60 -> 455 (-77)
    if (imgNum >= 530) {
      keepPlay = false;
      props.history.push("/");
    }
    if (keepPlay) {
      setTimeout(showImage, 60);
    }
  }

  function setAudio() {

    //오디오
    if (!bgm.canPlayType('audio/ogg')) alert('브라우저가 ogg 재생을 지원하지 않습니다.');
    else {
      let bgm_url = 'http://upload.wikimedia.org/wikipedia/commons/d/d7/Wikinews_Remix_Jingle.ogg';
      bgm = new Audio(bgm_url);
      bgm.volume = 0;
      bgm.loop = true;
      //bgm.play();

    }
  }
  function setAudioFadeIn() {
    //오디오
    if (volCnt * 1.1 + bgm.volume < 0.4) {

      volCnt *= 1.1;
      bgm.volume += volCnt;
      setTimeout(setAudioFadeIn, 100);
    } else {
      bgm.volume = 0.4;

    }
  }



  function setImgFadeIn() {

    let opacityValue = objImg.style.opacity;
    opacityValue *= 1;

    //투명도
    if (imgCnt * 1.3 + opacityValue < 1) {
      imgCnt *= 1.1;
      imgOpacity += imgCnt;

      setTimeout(setImgFadeIn, 100);
    } else {
      imgOpacity = 1;
      volCnt = 0.001;
      imgCnt = 0.03;
      // let myWindow = window.open("", "", "width=100, height=100");  // Opens a new window
      // myWindow.resizeTo(1000, 1000);                             // Resizes the new window
      // myWindow.focus();                                        // Sets focus to the new window

    }

  }

  function setAudioFadeOut() {

    //오디오
    if (bgm.volume - volCnt * 1.1 > 0) {
      volCnt *= 1.1;
      bgm.volume -= volCnt;
      setTimeout(setAudioFadeOut, 100);
    } else {
      bgm.volume = 0;
    }
  }


  function setImgFadeOut() {
    let opacityValue = imgOpacity;
    opacityValue *= 1;

    //투명도
    if (opacityValue - imgCnt > 0) {

      imgOpacity -= imgCnt;
      setTimeout(setImgFadeOut, 100);
    } else {
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

    <img id="introimg" style={{ opacity: '0.1' }} />
  );
}

export default Falling;
