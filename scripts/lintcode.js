let difficulty = "";
let uploadState = { uploading: false }
/* This function is to get file extension for submission */
function findLanguage() {
    
};
// doesnt work for this webpage
let new_way = document.getElementsByClassName("lanauage-python"); 
// console.log(new_way);
// can find the element but cannot find the children
// maybe we can directly copy it to the README.md

new_way = document.getElementsByTagName("code");
// [span, span, span, span, span, span, span, span]
// map all span's inner text
// will get all codes in text
// new_way[0].childNodes.map(x => console.log(x));

// doesnt work anymore
let old_way = document.getElementsByClassName('status-column__3SUg');
console.log(old_way);
button_class_name = "px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex text-label-r bg-green-s dark:bg-dark-green-s hover:bg-green-3 dark:hover:bg-dark-green-3 rounded-lg"
submit_button = document.getElementsByClassName(button_class_name)
console.log(submit_button)
submit_button.addEventListener("click",handleClick)
function handleClick(event) {
    console.log(event.target)
    console.log("clicked")
}



