const html = document.querySelector("html")
const check = document.querySelector("input[name=theme]")

const getStyle = ( element, style ) => window.getComputedStyle(element).getPropertyValue(style)

const transformKey = key => "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

const changeColors = ( colors ) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

const isExistLocalStorage = ( key ) => localStorage.getItem(key) != null

const changeLocalStorage = ( key, value ) => localStorage.setItem(key, JSON.stringify(value))

const getValueLocalStorage = ( key ) => JSON.parse(localStorage.getItem(key))

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

check.addEventListener("change", ( {target} ) => {
    target.checked ? changeColors(darkMode) : changeColors(lightMode)
})

check.addEventListener("change", ({target}) => {
    if (target.checked) {
        changeColors(darkMode) 
        changeLocalStorage('theme','darkMode')
    } 
    else {
        changeColors(lightMode)
        changeLocalStorage('theme','lightMode')
    }
})

if(!isExistLocalStorage('theme')) changeLocalStorage('theme', 'lightMode')

if (getValueLocalStorage('theme') === "lightMode") {
    check.removeAttribute('checked')
    changeColors(lightMode);
}
else {
    check.setAttribute('checked', "")
    changeColors(darkMode);
}