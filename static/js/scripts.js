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
        colorText: getStyle(html, "--color-text"),
    },
    {
        selector: "dark_mode",
        background: "#333333",
        colorText: "#B5B5B5"
    },
    {
        selector: "blue_mode",
        background: "#2196f3",
        colorText: "#e0e0e0"
    },
    {
        selector: "pink_mode",
        background: "#e91e63",
        colorText: "#fafafa"
    },
    {
        selector: "purple_mode",
        background: "#9c27b0",
        colorText: "#e1bee7"
    },
    {
        selector: "green_mode",
        background: "#4caf50",
        colorText: "#eeeeee"
    }
]

if(!isExistLocalStorage("themes")) createOrEditLocalStorage("themes", "light_mode")

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
