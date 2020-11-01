import React, { useEffect } from 'react';
import jQuery from "jquery";
import './MainPage.css';
window.$ = window.jQuery = jQuery;
const $ = window.$;

function CalmBeforeStorm(props) {

    //이미지
    let imgArray1 = new Array();
    let imgArray2 = new Array();
    let objImg;
    let imgOpacity = 0.01;
    let imgNum = 1;

    //오디오
    let bgm = new Audio("");

    //페이드 인 아웃 시 카운트
    let volCnt = 0.0001;
    let imgCnt = 0.0003;

    //상황
    let sceneCase = 1;
    let clickCase = 0;

    //마우스 좌표
    let x;
    let y;
    let wi;
    let he;
    let cursorAction = false;

    let keepPlay = true;
    
    function setImage() {

        for (let i = 1; i <= 56; i++) {
            imgArray1[i] = "/images/calm/calm1/calm1 (" + i + ").png";
        }
        for (let i = 1; i <= 276; i++) {
            imgArray2[i] = "/images/calm/calm2/calm2 (" + i + ").png";
        }

    }

    function showImage() {
        objImg = document.getElementById("introimg");
        objImg.style.opacity = imgOpacity;
        switch (sceneCase) {
            case 1:
                objImg.src = imgArray1[imgNum++];
                if (imgNum > 56) {
                    imgNum = 1;
                }
                break;
            case 2:
                objImg.src = imgArray2[imgNum++];
                if (imgNum == 200) {
                    setAudioFadeOut();
                    setImgFadeOut();
                }

                //60s -> 455 (-77)
                if (imgNum >= 265) {
                    keepPlay = false;
                    props.history.push("/surf");
                }
                break;
            
        }

        if (keepPlay) {
            setTimeout(showImage, 58);
        }
    }

    function setAudio() {

        //오디오
        if (!bgm.canPlayType('audio/ogg')) alert('브라우저가 ogg 재생을 지원하지 않습니다.');
        else {
            let bgm_url = 'http://upload.wikimedia.org/wikipedia/commons/d/d7/Wikinews_Remix_Jingle.ogg';
            bgm = new Audio(bgm_url);
            bgm.pause();
            bgm.volume = 0.1;
            bgm.loop = true;
            bgm.muted = true;
            bgm.play();
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
            cursorAction = true;
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
          setTimeout(setAudioFadeOut, 50);
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
          setTimeout(setImgFadeOut, 50);
        } else {
          imgOpacity = 0;
        }
    
      }
    

    function mouseEvent() {
        //마우스 커서 이벤트

        $(document).mousemove(function (e) {

            x = e.pageX;
            y = e.pageY;
            wi = objImg.clientWidth;
            he = document.body.clientHeight;

            x *= 1;
            y *= 1;
            wi *= 1;
            he *= 1;

            x -= (document.body.clientWidth - objImg.clientWidth) / 2
            if (cursorAction) {
                switch (sceneCase) {
                    case 1:
                        if (x > wi * 0.41 && x < wi * 0.46 && y > he * 0.3 && y < he * 0.67){
                            $('body').css('cursor', 'pointer');
                        } else {
                            $('body').css('cursor', 'default');
                        }
                        break;
                }
            }

        });
    }

    function imgClickEvent() {
        if (cursorAction) {
            switch (sceneCase) {
                case 1:
                    if (x > wi * 0.41 && x < wi * 0.46 && y > he * 0.3 && y < he * 0.67){
                        sceneCase++;

                    }
                    imgNum = 1;
                    break;
               
                case 2:
                    volCnt = 0.001;
                    imgCnt = 0.03;
                    if (x > wi * 0.65 && x < wi * 0.785 && y > he * 0.33 && y < he * 0.61) {
                        setImgFadeOut();
                        setAudioFadeOut();
                        clickCase = 1;
                    }
                    else if (x > wi * 0.65 && x < wi * 0.87 && y > he * 0.69 && y < he * 0.81) {
                        setImgFadeOut();
                        setAudioFadeOut();
                        clickCase = 2;
                    }
                    imgNum = 1;

                    break;
            }
        }
        $('body').css('cursor', 'default');

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
            <img id="introimg" style={{ opacity: '0.1' }} onClick={imgClickEvent} />

    );
}

export default CalmBeforeStorm;