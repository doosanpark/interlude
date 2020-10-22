import React, { useEffect } from 'react';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
const $ = window.$;

function MainPage(props) {

    //이미지
    let imgArray1 = new Array();
    let imgArray2 = new Array();
    let imgArray3 = new Array();
    let objImg;
    let imgOpacity = 0.1;
    let imgNum = 1;

    //오디오
    let bgm = new Audio("");

    //페이드 인 아웃 시 카운트
    let initialCnt = 0.001;
    
    //상황
    let sceneCase = 1;
    let clickCase = 0;

    //마우스 좌표
    let x;
    let y;
    let wi;
    let he;

    let keepPlay = true;

    function setImage() {

        for (let i = 1; i <= 41; i++) {
            imgArray1[i] = "/images/mainpages/mainpage1/mainpage1 (" + i + ").png";
        }
        for (let i = 1; i <= 46; i++) {
            imgArray2[i] = "/images/mainpages/mainpage2/mainpage2 (" + i + ").png";
        }
        for (let i = 1; i <= 21; i++) {
            imgArray3[i] = "/images/mainpages/mainpage3/mainpage3 (" + i + ").png";
        }
    }


    function showImage() {
        objImg = document.getElementById("introimg");
        objImg.style.opacity = imgOpacity;
        switch(sceneCase){
            case 1:
                objImg.src = imgArray1[imgNum++];
                if (imgNum > 41) {
                    imgNum = 1;
                }
                break;
            case 2:
                objImg.src = imgArray2[imgNum++];
                if (imgNum == 46) {
                    imgNum = 1;
                    sceneCase++;
                }
                break;
            case 3:
                objImg.src = imgArray3[imgNum++];
                if (imgNum > 21) {
                    imgNum = 1;
                }
                break;
        }
        
        if(keepPlay){
            setTimeout(showImage, 60);
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
            //bgm.play();
        }
    }
    function setAudioFadeIn() {
        //오디오
        if (initialCnt * 1.3 + bgm.volume < 1) {
            initialCnt *= 1.3;
            bgm.volume += initialCnt;
            setTimeout(setAudioFadeIn, 100);
        } else {
            bgm.volume = 1;
        }
    }

    function setImgFadeIn() {

        let opacityValue = objImg.style.opacity;
        opacityValue *= 1;

        //투명도
        if (initialCnt * 1.3 + opacityValue < 1) {

            imgOpacity += initialCnt;

            setTimeout(setImgFadeIn, 100);
        } else {

            imgOpacity = 1;
            
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
            if(clickCase === 1)
                props.history.push("/umbrella");
            if (clickCase === 2)
                props.history.push("/surf");

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
            
            x *=1;
            y *= 1;
            wi *=1;
            he *=1;

            x -= (document.body.clientWidth - objImg.clientWidth)/2
            
            switch (sceneCase) {
                case 1:
                    if (x > wi*0.51 && x < wi*0.59 && y > he*0.37 && y < he*0.52)
                        $('body').css('cursor', 'pointer');
                    else {
                        $('body').css('cursor', 'default');
                    }
                    break;
                    case 2:
                        $('body').css('cursor', 'default');
                        break;
                
                case 3:
                    if (x > wi*0.65 && x < wi*0.785 && y > he*0.33 && y < he*0.61){
                        $('body').css('cursor', 'pointer');
                    }
                    else if (x > wi*0.65 && x < wi*0.87 && y > he*0.69 && y < he*0.81){
                        $('body').css('cursor', 'pointer');
                    }
                    else {
                        $('body').css('cursor', 'default');
                    }
                    break;
            }


        });
    }

    function imgClickEvent(){
        switch (sceneCase) {
            case 1:
                if (x > wi*0.51 && x < wi*0.59 && y > he*0.37 && y < he*0.52){
                   sceneCase++;
                }
                imgNum = 1;
                break;
            case 2:
                    if (x > wi-60 && x < wi+40 && y > he - 80 && y < he + 85){
                       
                    }
                    break;
            case 3:
                initialCnt = 0.001;
                if (x > wi*0.65 && x < wi*0.785 && y > he*0.33 && y < he*0.61){
                    setImgFadeOut();
                    setAudioFadeOut();
                    clickCase = 1;
                }
                else if (x > wi*0.65 && x < wi*0.87 && y > he*0.69 && y < he*0.81){
                    setImgFadeOut();
                    setAudioFadeOut();
                    clickCase = 2;
                }
                imgNum = 1;
                
                break;
        }
        
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

            <img id="introimg" style={{ opacity: '0.1' }} onClick={imgClickEvent} />
        </div>
    );
}

export default MainPage;