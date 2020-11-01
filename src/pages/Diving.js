import React, { useEffect } from 'react';
import jQuery from "jquery";
import './MainPage.css';
window.$ = window.jQuery = jQuery;
const $ = window.$;

function Diving(props) {

    //이미지
    let imgArray1 = new Array();
    let imgArray2 = new Array();
    let imgArray3 = new Array();
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

    let secCnt = 58;
    let cntHowMany = 1;
    let scrollCase = 0;
    
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;



    // 마우스 휠~
    function handle(delta) {
        var s = delta + ": ";
        secCnt = 30;
        cntHowMany = 0;
        if (delta < 0) {
            scrollCase = 1;
        }
        else {
            scrollCase = 2;
        }
    }

    //마우스 이벤트
    function wheel(event) {
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        } else if (event.detail) delta = -event.detail / 3;
        if (delta) handle(delta);
    }
 


    function setImage() {

        for (let i = 1; i <= 18; i++) {
            imgArray1[i] = "/images/dive_into_shadow/dive_into_shadow1/dive_into_shadow1 (" + i + ").png";
        }
        for (let i = 1; i <= 26; i++) {
            imgArray2[i] = "/images/dive_into_shadow/dive_into_shadow2/dive_into_shadow2 (" + i + ").png";
        }
        for (let i = 1; i <= 2505; i++) {
            imgArray3[i] = "/images/diving/diving (" + i + ").png";
        }

    }

    function showImage() {
        objImg = document.getElementById("introimg");
        objImg.style.opacity = imgOpacity;
        switch (sceneCase) {
            case 1:
                objImg.src = imgArray1[imgNum++];
                if (imgNum > 18) {
                    imgNum = 1;
                }
                break;
            case 2:
                objImg.src = imgArray2[imgNum++];
                if (imgNum == 26) {
                    imgNum = 1;
                    sceneCase++;
                }
                break;
            case 3:
                if (secCnt < 300 && imgNum < 2298) {
                    if (scrollCase == 1)
                        objImg.src = imgArray3[imgNum++];
                    if (scrollCase == 2) {
                        objImg.src = imgArray3[imgNum--];
                        if (imgNum <= 0) {
                            imgNum = 1;
                        }
                    }
                    
                    
                        secCnt *= 1.1;
                    cntHowMany++;
                }
                if(imgNum >= 2298){
                    objImg.src = imgArray3[imgNum++];
                    if (imgNum == 2400) {
                        volCnt = 0.001;
                        imgCnt = 0.03;

                        setAudioFadeOut();
                        setImgFadeOut();
                    }
                    if (imgNum > 2490) {
                        imgNum = 1;
                        keepPlay = false;
                        props.history.push("/calm");
                    }
                }
               
                break;
        }

        if (keepPlay) {
            setTimeout(showImage, secCnt);
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
                        if (x > wi * 0.51 && x < wi * 0.59 && y > he * 0.37 && y < he * 0.52)
                            $('body').css('cursor', 'pointer');
                        else {
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
                    if (x > wi * 0.51 && x < wi * 0.59 && y > he * 0.37 && y < he * 0.52) {
                        sceneCase++;
                        
                    }
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

export default Diving;