const html = document.querySelector("html")
const button = document.getElementById("select_themes")

const transformKey = key => "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

const changeColors = (colors) => Object.keys(colors).map(key => html.style.setProperty(transformKey(key), colors[key]))

const isExistLocalStorage = (key) => localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

const getValueLocalStorage = (key) => JSON.parse(localStorage.getItem(key))

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)

const themes = [
    {
        selector: "light_mode",
        background: getStyle(html, "--background"),
        primaryColors: getStyle(html, "--primary-color"),
        colorText: getStyle(html, "--color-text"),
        lightColor: getStyle(html, "--light-color"),
    },
    {
        selector: "dark_mode",
        background: "#333333",
        primaryColor: "blue",
        colorText: "#B5B5B5",
        lightColor: "#B5B5B5"
    },
    {
        selector: "purple_mode",
        background: "#1E182A",
        primaryColor: "blue",
        colorText: "#B5B5B5",
        lightColor: "#B5B5B5"
    },
]

if(!isExistLocalStorage("themes")) createOrEditLocalStorage("themes", "light_mode")

if(isExistLocalStorage("themes")) changeColors(themes.find(item => item.selector === getValueLocalStorage("themes")))

button.addEventListener("click", () => {
    let currentTheme = getValueLocalStorage("themes");
    themes.map((theme, index) => {
        if(theme.selector === currentTheme){
            const choice = index === themes.length - 1 ? themes[0] : themes[index + 1];
            changeColors(choice) 
            createOrEditLocalStorage("themes", choice['selector'])
        }
    })
})
