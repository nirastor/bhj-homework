const allCheckboxes = Array.from(document.querySelectorAll('.interest__check'));

function setCheckboxesStatus(checkboxes, status) {
    checkboxes.forEach(item => {
        item.checked = status;
    })
}

function getChildrenCheckboxes(checkbox) {
    const childrens = Array.from(checkbox.closest('.interest').querySelectorAll('.interest__check'));
    childrens.shift();
    return childrens;
}

function getParentCheckbox(checkbox) {
    if (checkbox.closest('.interests_active')) {
        return checkbox.closest('.interests_active').closest('.interest').querySelector('.interest__check');
    }
    return false;
}

function setParentStatus(parent) {
    const childrens = getChildrenCheckboxes(parent);
    
    // почему-то не получилось через reduce
    let sum = 0;
    for (item of childrens) {
        if (item.checked) {
            sum++;
        }
    }

    parent.indeterminate = false;
    if (sum === 0) {
        parent.checked = false;
    } else if (sum == childrens.length) {
        parent.checked = true;
    } else {
        parent.indeterminate = true;
    }

    const parentParent = getParentCheckbox(parent);
    if (parentParent) {
        setParentStatus(parentParent);
    }
}

allCheckboxes.forEach(item => {
    item.addEventListener('change', () => {
        setCheckboxesStatus(getChildrenCheckboxes(item), item.checked);
        
        const parentCheckbox = getParentCheckbox(item);
        if (parentCheckbox) {
            setParentStatus(parentCheckbox);
        }
    });
});