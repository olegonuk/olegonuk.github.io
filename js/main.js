
const requestSidebar = document.querySelector('.sidebar-request__tabs-wrapper'),//Родитель табов
    requestsContentBlock = document.querySelector('.requests-content'),//Блок с контентом куду перемещаем
    requestSidebarBlock = document.querySelector('.request-sidebar'),// Табы
    mediaQuery = window.matchMedia('(max-width: 1199px)');//mediaQuery

let body = document.querySelector('body');

//Mobile menu touch
function menuMobileTouch() {
    if (mediaQuery.matches) {

        body.classList.add('touch');
        body.classList.remove('mouse');

        let arrowMenu = document.querySelectorAll('.header-menu-arrow'),
            parentList = document.querySelectorAll('.header-menu__list'),
            parentSubList = document.querySelectorAll('.header-submenu__list'),

            arrowSubMenu = document.querySelectorAll('.header-submenu-arrow'),
            headerSubmenu = document.querySelectorAll('.header-submenu'),
            subSubmenu = document.querySelectorAll('.sub-submenu');
        // arrowtabItem;

        //Первый уровень стрелочек
        arrowMenu.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                let thisLink = item.parentNode,
                    subMenu = item.nextElementSibling,
                    thisArrow = item;

                if (item.parentNode.classList.contains('active')) {

                    thisLink.classList.remove('active');
                    thisArrow.classList.remove('active');
                    subMenu.classList.remove('open');

                    hideSubmenu();
                }
                else {
                    removeClassActive(arrowMenu, 'active');
                    thisArrow.classList.add('active');

                    removeClassActive(parentList, 'active');
                    thisLink.classList.add('active');

                    removeClassActive(headerSubmenu, 'open')
                    subMenu.classList.add('open');
                }
            })
        })
        //Второй уровень стрелочек
        arrowSubMenu.forEach(item => {
            item.addEventListener('click', (e) => {
                let thisLink = item.parentNode,
                    subMenu = item.nextElementSibling,
                    thisArrow = item;

                if (item.parentNode.classList.contains('active')) {

                    thisLink.classList.remove('active');
                    thisArrow.classList.remove('active');
                    subMenu.classList.remove('open');
                }
                else {
                    removeClassActive(arrowSubMenu, 'active');
                    thisArrow.classList.add('active');

                    removeClassActive(parentSubList, 'active');
                    thisLink.classList.add('active');

                    removeClassActive(subSubmenu, 'open');
                    subMenu.classList.add('open');
                }
            });
        });
    }
    else {
        body.classList.remove('touch');
        body.classList.add('mouse');
    }
}
//Удаление активных классов
function removeClassActive(arr, nameClass) {
    arr.forEach(item => {
        item.classList.remove(nameClass)
    });
}
//закрываем подменю
function hideSubmenu() {
    let arrows = document.querySelectorAll('.arrow-menu-content');

    arrows.forEach((item, i) => {
        let subMenu = item.nextElementSibling;
        let thisArrow = item;

        subMenu.classList.remove('open');//Удаляем активные классы в мобильно меню подменю
        thisArrow.classList.remove('active');//Удаляем активные классы в мобильном меню стрелочки

    });
}

mediaQuery.addEventListener('change', menuMobileTouch);
menuMobileTouch(mediaQuery);

//Arrow Sidebar tabs
const arrowTabItem = document.querySelectorAll('.tab-item-submenu-arrow'),
    parentTabItem = document.querySelectorAll('.tab-item'),
    tabItemSubmenu = document.querySelectorAll('.tab-item-submenu');

if (arrowTabItem) {
    arrowTabItem.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            let thisLink = item.parentNode,
                subMenu = item.nextElementSibling,
                thisArrow = item;

            if (item.parentNode.classList.contains('active')) {

                thisLink.classList.remove('active');
                thisArrow.classList.remove('active');
                subMenu.classList.remove('open');
            }
            else {
                removeClassActive(arrowTabItem, 'active');
                thisArrow.classList.add('active');

                removeClassActive(parentTabItem, 'active');
                thisLink.classList.add('active');

                removeClassActive(tabItemSubmenu, 'open')
                subMenu.classList.add('open');
            }
        })
    })
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.parentNode.classList.contains('tab-item')) {
            arrowTabItem.forEach((item, i) => {
                let subMenu = item.nextElementSibling;
                let thisArrow = item;
                subMenu.classList.remove('open');//Удаляем активные классы в мобильно меню подменю
                thisArrow.classList.remove('active');//Удаляем активные классы в мобильном меню стрелочки

            });
        }
    })
}

//Перемещение табов запросов
if (requestSidebar) {
    function handleTabletChange() {
        if (mediaQuery.matches) {
            requestsContentBlock.prepend(requestSidebar)//Перемещаем блок с табами вверх мобильная версия
        }
        else {
            requestSidebarBlock.prepend(requestSidebar)//Перемещаем блок с табами назад десктоп
        }
    }
    mediaQuery.addEventListener('change', handleTabletChange);
    handleTabletChange(mediaQuery);
}
//Добавление файла/удаление файла
const inputAddFile = document.getElementById('add-file');

if (inputAddFile) {
    const labelStatus = document.querySelector('.add-file__label')
    btnDeleteFile = document.getElementById('btn-delete-file');

    inputAddFile.addEventListener('change', () => {

        if (inputAddFile.value) {
            labelStatus.classList.add('file-download');
        } else { // Если после выбранного тыкнули еще раз, но дальше cancel
            inputAddFile.value = '';
            labelStatus.classList.remove('file-download');
            console.log("Файл не выбран");
        }
    });

    btnDeleteFile.addEventListener('click', () => {
        inputAddFile.value = '';
        labelStatus.classList.remove('file-download');
    });
}

//Logout popup
const btnLogout = document.getElementById('btn-logout'),
    popupLogout = document.getElementById('popup__logout');

if (btnLogout) {

    btnLogout.addEventListener('click', () => {
        popupLogout.classList.toggle('active');
        document.body.classList.toggle('lock');

    });

    const btnMobileClose = popupLogout.querySelector('.btn-close__mobile-menu');

    btnMobileClose.addEventListener('click', () => {
        popupLogout.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

    });
}

//Register popup
const btnRegUser = document.getElementById('btn-register__user'),
    popupRegUser = document.getElementById('popup__register-user'),
    btnLogoutPopup = document.getElementById('btn-logout-popup');

if (btnRegUser) {

    btnRegUser.addEventListener('click', () => {
        popupRegUser.classList.add('active');
        document.body.classList.add('lock');

        popupLogout.classList.remove('active');//Удаляем класс active у Попап

    });

    const btnMobileClose = popupRegUser.querySelector('.btn-close__mobile-menu');

    btnMobileClose.addEventListener('click', () => {
        popupRegUser.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

    });

    btnLogoutPopup.addEventListener('click', () => {
        popupRegUser.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

        popupLogout.classList.add('active');
        document.body.classList.add('lock');
    })
}
// mobile menu
const btnBurger = document.getElementById('burger__nav'),
    mobileMenu = document.querySelector('.mobile-menu__wrapper');

if (btnBurger) {
    btnBurger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.add('lock');
    });

    const btnMobileClose = document.getElementById('btn-mobile-close');


    btnMobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

        hideSubmenu();//закрываем подменю

    });
}
// mobile catalog filter parishes
const btnCatalogfilter = document.getElementById('arrow-next-filter'),
    mobileCatalogFilter = document.querySelector('.mobile-filter-parishes__wrapper');

if (btnCatalogfilter) {
    btnCatalogfilter.addEventListener('click', () => {
        mobileCatalogFilter.classList.toggle('active');
        document.body.classList.add('lock');
    });

    const btnApplyFilter = mobileCatalogFilter.querySelector('.btn-apply-selected-value');
    //Обработчик на кнопку Применть
    btnApplyFilter.addEventListener('click', () => {
        const selectedFieldValue = document.querySelector('.selected-section__value');//поле с обозначением раздела по умолчанию
        let selectedValue = document.querySelector('.slider-catalog-filter-parishes .swiper-slide.swiper-slide-active');// Получение активного раздела
        selectedFieldValue.textContent = selectedValue.textContent;//Меняем значениие поля раздела из активного раздела 

        mobileCatalogFilter.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body
    })

    const btnClose = mobileCatalogFilter.querySelector('.btn-close-popup');


    btnClose.addEventListener('click', () => {
        mobileCatalogFilter.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

    });
}
// mobile search popup
const mobileHeaderSearchInput = document.querySelector('.mobile-header-search__input'),
    tabSelectedSearch = document.querySelector('.tab-selected-search'),//Таб в поле поиска в хедере
    mobileSearchPopup = document.querySelector('.mobile-header-search-popup__wrapper');

if (mobileHeaderSearchInput) {
    tabSelectedSearch.addEventListener('click', () => {
        mobileSearchPopup.classList.toggle('active');
        document.body.classList.add('lock');
    });

    const btnSearchInfo = mobileSearchPopup.querySelector('.btn-apply-selected-value');
    //Обработчик на кнопку Искать
    btnSearchInfo.addEventListener('click', () => {

        const findSectionsTabs = document.querySelectorAll('.find-sections-tab__wrapper .find-sections__tab');//Табы в попап

        findSectionsTabs.forEach(tab => {
            if (tab.classList.contains('selected-tab')) {
                tabSelectedSearch.textContent = tab.textContent;// Меняем texContent в табе поля поиска в хедере
            }
        });

        mobileSearchPopup.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body
        // selectedTabValue
    })

    const btnClose = mobileSearchPopup.querySelector('.btn-close-popup');

    //Обработчик на кнопку Закрыть
    btnClose.addEventListener('click', () => {
        mobileSearchPopup.classList.remove('active');//Удаляем класс active у Попап
        document.body.classList.remove('lock');//Удалем класс lock y body

    });
}
//Tabs mobile search popup
const mobileSearchTabsParent = document.querySelector('.find-sections-tab__wrapper'),
    mobileSearchTabs = mobileSearchTabsParent.querySelectorAll('.find-sections__tab');

if (mobileSearchTabsParent) {
    //Удаляем у всех табов класс selected-tab
    function removeActiveClassTabs() {

        mobileSearchTabs.forEach(tab => {
            tab.classList.remove('selected-tab');
        })
    }
    //Устанавливаем класс selected-tab у таба по умолчанию
    function addActiveClassTabs(i = 0) {
        mobileSearchTabs[i].classList.add('selected-tab');
    }

    removeActiveClassTabs();
    addActiveClassTabs();

    //Обработчик на родителя
    mobileSearchTabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('find-sections__tab')) {
            mobileSearchTabs.forEach((tab, i) => {
                if (target === tab) {
                    removeActiveClassTabs();
                    addActiveClassTabs(i);
                }
            });
        }
    });
}
//Tab select-archive
const selectArchiveTabsParent = document.querySelector('.select-archive__tabs');

if (selectArchiveTabsParent) {
    const selectArchiveTabs = selectArchiveTabsParent.querySelectorAll('.select-archive__tab'),
        selectArchiveTabActiveValue = document.querySelector('.select-archive-tab-active-value');//mobile tab


    function removeActiveClass() {
        selectArchiveTabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    function addActiveClass(i = 0) {
        selectArchiveTabs[i].classList.add('active');
        selectArchiveTabActiveValue.textContent = selectArchiveTabs[i].textContent;
    }

    removeActiveClass();
    addActiveClass();

    selectArchiveTabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('select-archive__tab')) {
            selectArchiveTabs.forEach((tab, i) => {
                if (target === tab) {
                    removeActiveClass();
                    addActiveClass(i);

                    selectArchiveTabsParent.classList.remove('active');//mobile tab
                    selectArchiveTabActiveValue.classList.remove('active');//mobile tab
                }
            })
        }
    })
    //mobile tab
    selectArchiveTabActiveValue.addEventListener('click', () => {
        selectArchiveTabsParent.classList.toggle('active');
        selectArchiveTabActiveValue.classList.toggle('active');
    });
}
//Tab select-all-funds__tabs
const selectAllFundsTabsParent = document.querySelector('.select-all-funds__tabs');

if (selectAllFundsTabsParent) {
    const selectAllFundsTabs = selectAllFundsTabsParent.querySelectorAll('.select-all-funds__tab'),
        selectFundTabActiveValue = document.querySelector('.select-fond-tab-active-value');//mobile tab


    function removeClass() {
        selectAllFundsTabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    function addClass(i = 0) {
        selectAllFundsTabs[i].classList.add('active');
        selectFundTabActiveValue.innerHTML = selectAllFundsTabs[i].innerHTML;
    }

    removeClass();
    addClass();

    selectAllFundsTabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('select-all-funds__tab')) {
            selectAllFundsTabs.forEach((tab, i) => {
                if (target === tab) {
                    removeClass();
                    addClass(i);

                    selectAllFundsTabsParent.classList.remove('active');//mobile tab
                    selectFundTabActiveValue.classList.remove('active');//mobile tab
                }
            })
        }
    })
    //mobile tab
    selectFundTabActiveValue.addEventListener('click', () => {
        selectAllFundsTabsParent.classList.toggle('active');
        selectFundTabActiveValue.classList.toggle('active');
    });
}
//Tab sidebar-request__tads
const requestsTabsParent = document.querySelector('.select-request__tabs'),
    requestsTabsContentParent = document.querySelector('.requests-tab-content__wrapper');

if (requestsTabsParent) {
    const selectRequestTabs = requestsTabsParent.querySelectorAll('.select-request__tab'),
        requestsTabContents = requestsTabsContentParent.querySelectorAll('.requests-tab__content'),
        selectRequestTabActiveValue = document.querySelector('.selected-request-tab-active-value');//mobile tab

    function hideRequestTabContent() {
        requestsTabContents.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        selectRequestTabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showRequestTabConten(i = 0) {
        requestsTabContents[i].classList.add('show', 'fade');
        requestsTabContents[i].classList.remove('hide');
        selectRequestTabs[i].classList.add('active');
        selectRequestTabActiveValue.textContent = selectRequestTabs[i].textContent;//mobile tab
    }


    hideRequestTabContent();
    showRequestTabConten();

    requestsTabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('select-request__tab')) {

            selectRequestTabs.forEach((tab, i) => {
                if (target === tab) {
                    hideRequestTabContent();
                    showRequestTabConten(i);

                    requestsTabsParent.classList.remove('active');//mobile tab
                    selectRequestTabActiveValue.classList.remove('active');//mobile tab
                }
            })
        }
    })
    //mobile tab
    selectRequestTabActiveValue.addEventListener('click', () => {
        requestsTabsParent.classList.toggle('active');
        selectRequestTabActiveValue.classList.toggle('active');
    });
}
//Tab prices-work-tabs
const pricesWorkTabsParent = document.querySelector('.prices-work-tabs__wrapper'),
    pricesWorkTabsContentParent = document.querySelector('.prices-work-tabs-contents__container');

if (pricesWorkTabsParent) {
    const pricesWorkTabs = pricesWorkTabsParent.querySelectorAll('.prices-work-tab'),
        pricesWorkTabContents = pricesWorkTabsContentParent.querySelectorAll('.prices-work-tabs__content');

    function hidePricesWorkTabContent() {
        pricesWorkTabContents.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        pricesWorkTabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showPricesWorkTabConten(i = 0) {
        pricesWorkTabContents[i].classList.add('show', 'fade');
        pricesWorkTabContents[i].classList.remove('hide');
        pricesWorkTabs[i].classList.add('active');
    }


    hidePricesWorkTabContent();
    showPricesWorkTabConten();

    pricesWorkTabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('prices-work-tab')) {
            console.log('work')
            pricesWorkTabs.forEach((tab, i) => {
                if (target === tab) {
                    hidePricesWorkTabContent();
                    showPricesWorkTabConten(i);
                }
            })
        }
    })
}
// Tabs Activity

const tabs = document.querySelectorAll('.activity-tabheader__item'),
    tabsContent = document.querySelectorAll('.activity-tabcontent'),
    tabsParent = document.querySelector('.activity-tabheader__items'),
    tabheaderActiveValue = document.querySelector('.tabheader-item-active-value');//mobile tab

if (tabsParent) {

    function hideActivityTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('activity-tabheader__item-active');
        });
    }

    function showActivityTabConten(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('activity-tabheader__item-active');
        tabheaderActiveValue.textContent = tabs[i].textContent;//mobile tab
    }


    hideActivityTabContent();
    showActivityTabConten();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('activity-tabheader__item'))
            tabs.forEach((item, i) => {

                if (target == item) {
                    hideActivityTabContent();
                    showActivityTabConten(i);

                    tabsParent.classList.remove('active');//mobile tab
                    tabheaderActiveValue.classList.remove('active');//mobile tab
                }
            })
    })
    //mobile tab
    tabheaderActiveValue.addEventListener('click', () => {
        tabsParent.classList.toggle('active');
        tabheaderActiveValue.classList.toggle('active');
    });
}
// Tabs doc-complexes


const docComplexTabsParent = document.querySelector('.doc-complexes-tabheader__items');

if (docComplexTabsParent) {
    const docComplexTabCcontainer = document.querySelector('.doc-complexes-tabcontent__wrapper'),
        docComplexTabs = docComplexTabsParent.querySelectorAll('.doc-complexes-tabheader__item'),
        docComplexTabsContent = docComplexTabCcontainer.querySelectorAll('.doc-complexes-tabcontent'),
        docComplexTabHeaderActiveValue = docComplexTabsParent.querySelector('.tabheader-item-active-value');//mobile tab

    function hideDocComplexTabContent() {
        docComplexTabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        docComplexTabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showDocComplexTabConten(i = 0) {
        docComplexTabsContent[i].classList.add('show', 'fade');
        docComplexTabsContent[i].classList.remove('hide');
        docComplexTabs[i].classList.add('active');
        docComplexTabHeaderActiveValue.textContent = docComplexTabs[i].textContent;//mobile tab
    }


    hideDocComplexTabContent();
    showDocComplexTabConten();

    docComplexTabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('doc-complexes-tabheader__item'))
            docComplexTabs.forEach((item, i) => {

                if (target == item) {
                    hideDocComplexTabContent();
                    showDocComplexTabConten(i);

                    docComplexTabsParent.classList.remove('active');//mobile tab
                    docComplexTabHeaderActiveValue.classList.remove('active');//mobile tab
                }
            })
    })
    //mobile tab
    docComplexTabHeaderActiveValue.addEventListener('click', () => {
        docComplexTabsParent.classList.toggle('active');
        docComplexTabHeaderActiveValue.classList.toggle('active');
    });
}
// Tabs readingroom

const readingTabsParent = document.querySelector('.readingroom__tabs');

if (readingTabsParent) {
    const readingTabContainer = document.querySelector('.readingroom-tab-content__wrapper'),
        readingTabs = readingTabsParent.querySelectorAll('.readingroom__tab'),
        readingTabsContent = readingTabContainer.querySelectorAll('.readingroom-tab__content');
    console.log(readingTabsContent)
    function hideReadingroomTabContent() {
        readingTabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        readingTabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showReadingroomTabConten(i = 0) {
        readingTabsContent[i].classList.add('show', 'fade');
        readingTabsContent[i].classList.remove('hide');
        readingTabs[i].classList.add('active');
        readingTabsContent[i].querySelector('.readingroom-tab__content-name').textContent = readingTabs[i].textContent;
    }


    hideReadingroomTabContent();
    showReadingroomTabConten();

    readingTabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('readingroom__tab'))
            readingTabs.forEach((item, i) => {

                if (target == item) {
                    hideReadingroomTabContent();
                    showReadingroomTabConten(i);
                }
            })
    });
}
//tab show-sort__block
const showSortBlockValue = document.querySelector('.show-sort__title-value');
if (showSortBlockValue) {
    const showSortValue = showSortBlockValue.querySelector('.show-sort__value'),
        showSortLists = showSortBlockValue.querySelector('.show-sort__lists'),
        showSortList = showSortLists.querySelectorAll('.show-sort__list');

    showSortBlockValue.addEventListener('click', (e) => {
        const target = e.target;
        showSortBlockValue.classList.toggle('active');

    });

    showSortLists.addEventListener('click', (e) => {
        const target = e.target;
        showSortValue.textContent = target.dataset.valueCount;
    });

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (!target.classList.contains('show-sort__title-value')) {
            showSortBlockValue.classList.remove('active');

        }
    });

}

//mob-burger__lists
const mobBurgerLists = document.querySelectorAll('.mob-burger__lists');

if (mobBurgerLists) {
    let b = '';
    mobBurgerLists.forEach(btnBurger => {
        btnBurger.addEventListener('click', (e) => {
            const target = e.target,
                modalAtr = target.getAttribute('data-modal'),
                modalElem = document.querySelector(`.tabs-block__list[data-modal="${modalAtr}"]`);
            b = modalElem;
            modalElem.classList.toggle('open');
            target.classList.toggle('active');
        });
    });
}

//mob-burger-comments-control
const burgerCommentsControlLists = document.querySelectorAll('.burger-comments-control'),
    commentsTextControl = document.querySelectorAll('.comments-text-control__lists');

if (burgerCommentsControlLists) {

    burgerCommentsControlLists.forEach((btnBurger, i) => {
        btnBurger.addEventListener('click', () => {
            commentsTextControl[i].classList.toggle('open');
            btnBurger.classList.toggle('active');
        });
    });
}

//fuds-accordion

const fudsAccordionParents = document.querySelectorAll('.fuds-accardion__wrapper');

if (fudsAccordionParents) {
    fudsAccordionParents.forEach(fudsAccordionParent => {
        const accordionItemHeader = fudsAccordionParent.querySelector('.fuds-accardion__header'),
            btnCloseFudsAccordion = fudsAccordionParent.querySelector('.btn-close-fuds-accordion');
        console.log(btnCloseFudsAccordion);
        accordionItemHeader.addEventListener('click', () => {
            accordionItemHeader.classList.toggle('active');
            accordionItemHeader.querySelector('.funds-accordion-item__icon').classList.toggle('active');
            accordionItemHeader.querySelector('.accordion-icon__line').classList.toggle('active');
        });


        btnCloseFudsAccordion.addEventListener('click', () => {
            accordionItemHeader.classList.remove('active');
            accordionItemHeader.querySelector('.funds-accordion-item__icon').classList.remove('active');
            accordionItemHeader.querySelector('.accordion-icon__line').classList.remove('active');
        });


    });

}

//FAQ__accordion

const faqAccordionParent = document.querySelector('.about-archive-faq__accordion');

if (faqAccordionParent) {
    const accordionItemHeader = faqAccordionParent.querySelectorAll('.archive-faq__accordion-item-header');
    accordionItemHeader.forEach(acordionItem => {
        acordionItem.addEventListener('click', () => {
            acordionItem.classList.toggle('active');
            acordionItem.querySelector('.archive-faq-icon__line').classList.toggle('active')
        })
    });
}
//New Arivals__accordion

const newArivalsAccordionParent = document.querySelector('.new-arivals__accordion');

if (newArivalsAccordionParent) {
    const accordionItemHeader = newArivalsAccordionParent.querySelectorAll('.new-arivals__accordion-item-header');
    accordionItemHeader.forEach(acordionItem => {
        acordionItem.addEventListener('click', () => {
            acordionItem.classList.toggle('active');
            acordionItem.querySelector('.new-arivals-icon__line').classList.toggle('active')
        })
    });
}
/*Slider*/
const swiper = new Swiper('.useful-links-slider', {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 3,
        },
    }
});

//slider-catalog-filter-parishes
const mySwiper = new Swiper('.slider-catalog-filter-parishes', {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 4,
});