const tabsButtons = Array.from(document.querySelectorAll('.tab'));
const tabsContent = Array.from(document.querySelectorAll('.tab__content'));

function switchTabs(from, to) {
    tabsButtons[from].classList.remove('tab_active');
    tabsContent[from].classList.remove('tab__content_active');
    tabsButtons[to].classList.add('tab_active');
    tabsContent[to].classList.add('tab__content_active');

}

function getTabIndex() {
    return tabsButtons.findIndex(a => a.classList.contains('tab_active'));
}

function nextTab() {
    const currentTabIndex = getTabIndex();
    if (currentTabIndex === tabsButtons.length - 1) {
        switchTabs(currentTabIndex, 0);
    } else {
        switchTabs(currentTabIndex, currentTabIndex + 1);
    }
}

function previosTab () {
    const currentTabIndex = getTabIndex();
    if (currentTabIndex === 0) {
        switchTabs(currentTabIndex, tabsButtons.length - 1);
    } else {
        switchTabs(currentTabIndex, currentTabIndex - 1);
    }
}

for (let tabindex in tabsButtons) {
    tabsButtons[tabindex].addEventListener('click', () => {
        switchTabs(getTabIndex(), tabindex);
    });
}

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    
    if (e.code ==='Tab' && !e.shiftKey ||
        e.code === 'ArrowRight' && (getTabIndex() !== tabsButtons.length - 1)) {
        nextTab();
    } else if (e.code === 'Tab' && e.shiftKey ||
        e.code === 'ArrowLeft' && getTabIndex()) {
        previosTab();
    }
});