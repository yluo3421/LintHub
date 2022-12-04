console.log("lintcode.js working")

document.addEventListener('DOMContentLoaded', function run(){
    console.log('After loading the page')
    setTimeout(grabButton,2000)
    
})
function grabButton() {
    let button_class_name = "px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex text-label-r bg-green-s dark:bg-dark-green-s hover:bg-green-3 dark:hover:bg-dark-green-3 rounded-lg"
    let submit_button = document.getElementsByClassName(button_class_name)[0]
    console.log(submit_button)
    submit_button.addEventListener("click",handleClick)
    setTimeout(grabCode, 5000)
}
function grabCode() {
    let element = document.getElementsByClassName("mb-6")
    console.log(element)
    let solution_container = element
    let solution_text = solution_container[1].innerText
    console.log(solution_container)
    console.log(solution_text)
}
console.log(window.location.href)

//!!!!!!!!!!!!!!MutationObserver()


function handleClick(event) {
    console.log(event.target)
    console.log("clicked")
}


