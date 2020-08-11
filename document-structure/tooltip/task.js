const elWithTooltip = Array.from(document.querySelectorAll('.has-tooltip'));

const elTooltip = document.createElement('div');
elTooltip.classList.add('tooltip');
elTooltip.addEventListener('click', () => elTooltip.classList.remove('tooltip_active'));

function setTooltipPosition(el) {
    switch (el.dataset.position) {
        case 'bottom':
            elTooltip.style.top = el.getBoundingClientRect().bottom + 'px';
            elTooltip.style.left = el.getBoundingClientRect().left + 'px';
            break;
        case 'top':
            const tooltipHeight = elTooltip.getBoundingClientRect().bottom - elTooltip.getBoundingClientRect().top;
            elTooltip.style.top = el.getBoundingClientRect().top - tooltipHeight + 'px';    
            elTooltip.style.left = el.getBoundingClientRect().left + 'px';
            break;
        case 'left':
            elTooltip.style.top = el.getBoundingClientRect().top + 'px'; 
            const tooltipWidth = elTooltip.getBoundingClientRect().right - elTooltip.getBoundingClientRect().left;
            elTooltip.style.left = el.getBoundingClientRect().left - tooltipWidth + 'px';
            break;
        case 'right':
            elTooltip.style.top = el.getBoundingClientRect().top + 'px'; 
            elTooltip.style.left = el.getBoundingClientRect().right + 'px';
            break;
    }
}

elWithTooltip.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        elTooltip.innerText = el.title;
        elTooltip.classList.add('tooltip_active');
        el.insertAdjacentElement('afterend', elTooltip);
        setTooltipPosition(el);
    });
});