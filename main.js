'use strict';


// Make navbar transparent when it's on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})


// Scroll

function scrollIntoView(query) {
    const el = document.querySelector(query);
    if (!el) {
        return;
    }
    el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToMenu(e) {
    // Element.scrollTop - visual viewport 기준으로 특정 엘리먼트의 거리.
    // + Element.scrollBy() - 얼마나 스크롤할지  
    // + Element.scrollTo() - 어디로 스크롤할지
    // Element.scrollHeight - layout viewport 기준으로 특정엘리먼트까지의 거리

    // offset - 요소가 화면에서 차지하는 전체 크기
    // offsetParent - 

    // window.outerHeight, outerWidth -브라우저창의 크기(siedebar, 윈도우, 브라우저메뉴 포함)
    // window.innerHeight, innerWidth - 레이아웃 뷰포트 크기(콘텐츠영억 + 스크롤바포함)

    // Viewport
    // + layout viewport - 현재 다큐먼트에서 렌더링되는 모든 영역. 유저 기기에 보여지는 + 안보여지는 영역 모두.
    // + visual viewport - 유저 기기에 보여지는 영역
    const menuName = `${e.target.dataset.menu}`;
    if (menuName === 'undefined') { return; }
    console.log(":: " + menuName)
    scrollIntoView(menuName);
}

document.querySelector('.navbar__menu').addEventListener('click', e => scrollToMenu(e));
document.querySelector('#home .home__contact').addEventListener('click', e => {
    scrollIntoView('#contact');
})