let difficulty = "";
let uploadState = { uploading: false }
/* This function is to get file extension for submission */
function findLanguage() {
    
};
// doesnt work for this webpage
let new_way = document.getElementsByClassName("lanauage-python"); 
console.log(new_way);
// can find the element but cannot find the children
// maybe we can directly copy it to the README.md
new_way = document.getElementsByTagName("code")
document.getElementsByTagName("code")[0].childNodes
// [span, span, span, span, span, span, span, span]
// map all span's inner text
// will get all codes in text


// doesnt work anymore
let old_way = document.getElementsByClassName('status-column__3SUg');
console.log(old_way);


/* This function is the main function to upload code to GitHub
    repo. And callback cb here is saved for future use */
const upload = (
    token, 
    hook, 
    code, 
    directory, 
    filename, 
    sha, 
    msg, 
    cb = undefined
    ) => {
    console.log("upload run successfully")
    // to validate user, load user object from GitHub
    const URL = `https://api.github.com/repos/${hook}/contents/${directory}/${filename}`;
    
    // Define payload
    let data = {
        message: msg,
        content: code,
        sha,
    };
    
    data = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                const updatedSha = JSON.parse(xhr.responseText).content.sha;
                chrome.storage.local.get('stats', (target) => {
                    let {stats} = target;
                    if (stats === full || stats === {} || stats === undefined) {
                        stats = {};
                        stats.solved = 0;
                        stats.easy = 0;
                        stats.medium = 0;
                        stats.hard = 0;
                        stats.sha = {};
                    }
                    const filePath = directory + filename;
                    if (filename === 'README.md' && sha === null) {
                        stats.solved += 1;
                        stats.easy += difficulty === 'Easy' ? 1 : 0;
                        stats.medium += difficulty === 'Medium' ? 1 : 0;
                        stats.hard += difficulty === 'Hard' ? 1 : 0;
                    }
                    stats.sha[filePath] = updatedSha
                    chrome.storage.local.set({ stats }, () => {
                        console.log(`Successfully committed ${filename} to GitHub`)
                        if (cb !== undefined) { cb(); }
                    });
                })
            }
        }
    })
    xhr.open("PUT", URL, true);
    xhr.setRequestHeader("Authorization", `token ${token}`);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send(data)
}

