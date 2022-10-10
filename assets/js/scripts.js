const html = document.querySelector("html")
const check = document.querySelector("input[name=theme]")

const getStyle = ( element, style ) => window.getComputedStyle(element).getPropertyValue(style)

const lightMode = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
}

const darkMode = {
    bg: "#333333",
    bgPanel: "#434343",
    colorHeadings: "#3664FF",
    colorText: "#B5B5B5"
}

const transformKey = key => "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

const changeColors = ( colors ) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

check.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(lightMode)
})

const isExistLocalStorage = ( key ) => localStorage.getItem(key) != null

const createOrEditLocalStorage = ( key, value ) => localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = ( key ) => JSON.parse(localStorage.getItem(key))

check.addEventListener("change", ({target}) => {
    if (target.checked) {
        changeColors(darkMode) 
        createOrEditLocalStorage('theme','darkMode')
    } 
    else {
        changeColors(lightMode)
        createOrEditLocalStorage('theme','lightMode')
    }
})

if(!isExistLocalStorage('theme'))createOrEditLocalStorage('theme', 'lightMode')

if (getValeuLocalStorage('theme') === "lightMode") {
    check.removeAttribute('checked')
    changeColors(lightMode);
}
else {
    check.setAttribute('checked', "")
    changeColors(darkMode);
}