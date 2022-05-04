'use strict';

// Opacity
const homeEl = document.querySelector(".home__container");
const homeSectionheight = homeEl.getBoundingClientRect().height;
function controlOpacity () {
    if(homeSectionheight >= window.scrollY) {
        const opacity = 1-(window.scrollY/homeSectionheight);
        homeEl.style.opacity = opacity;
    } else {
        homeEl.style.opacity = 0;
    }
}
// Make navbar transparent when it's on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    controlOpacity();
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})


// Scroll

const navbarContainer = document.querySelector('.navbar__menu');

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
    scrollIntoView(menuName);
    closeMenu();
}

navbarContainer.addEventListener('click', e => {
    scrollToMenu(e);});
document.querySelector('#home .home__contact').addEventListener('click', e => {
    scrollIntoView('#contact');
})

// Navbar - Hamburger button
const hamburgerBtn = document.querySelector(".navbar__toggle-btn");
const closeMenu = () => {
    navbarContainer.classList.remove('visible');
}
const toggleNavbar = () => {
    if(navbarContainer.classList.contains('visible')) {
        closeMenu();
    } else {
        navbarContainer.classList.add('visible');
    }
}
hamburgerBtn.addEventListener('click', () => {
    toggleNavbar();
})



// Show scroll-up button when scrolling down
const arrowButton = document.querySelector(".arrow-up");
document.addEventListener('scroll', () => {
    if(window.scrollY > homeSectionheight/2) {
        arrowButton.classList.add('arrow-up--visible')
    } else {
        arrowButton.classList.remove('arrow-up--visible')
    }
})

// Scroll To Top
arrowButton.addEventListener('click', () => {
    window.scrollTo( {top:0, behavior:'smooth'} );
});


// Projects
// category button 
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

function activateMenu(e) {
    workBtnContainer.querySelectorAll(".category__btn").forEach(x => x.classList.remove("active"));
    e.target.classList.add("active");
}

workBtnContainer.addEventListener('click', e => {
    const category = e.target.dataset.category ||  e.target.parentNode.dataset.category;
    if(category === null) {
        return;
    }
    
    activateMenu(e);

    projectContainer.classList.add("anime-out");
    setTimeout(() => {
        projects.forEach(project => {
            const type = project.dataset.categorytype;
            if(category === type || category === "*"){
                project.classList.remove('invisible')  
            }        else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove("anime-out");
    }, 300)
})


// Intersection Observer
// 1. 관찰할 요소 가져오기
const sections = document.querySelectorAll("section");
const navbarBtns = document.querySelectorAll(`.navbar__menu__item`);

// 2. Option, Callback 짜기
// -Option; threshold 70%
// -Callback; active 넣다 뺐다
function activateNavbarMenu(menuName) {
    navbarBtns.forEach(btn => {
        if(btn.dataset['menu'] === `#${menuName}`){
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// 3. IntersectionObserver 생성
const observerOptions = {
    threshold: 0.9
};
const observer = new IntersectionObserver((entries, observer)=>{
    entries.map(e => {
        if(e.target.id) {
            console.log(`:: section : ${e.target.id}`, e);

            activateNavbarMenu(e.target.id);
        }
    })
}, observerOptions);

//4. observe!
sections.forEach(section => observer.observe(section));


