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
    upload(token, personal_hook, test_code, test_dir, test_filename, test_sha, "")
}
// to upload I need below information
// token: from generate personal token
// hook: looks like its from xhr responseText.full_name EXAMPLE    gracelj/LeetHub-test
// code: from grabCode, need to format
// directory: problemName     directly from window.location.pathname.split('/')[2];
// filename: filename = problemName + language, +".py"
// sha: not yet clear
/*
"sha": {
            "0026-remove-duplicates-from-sorted-array0026-remove-duplicates-from-sorted-array.py": "0e0cffed07d03950aa5b53c3aa7b705fa621a5c0",
            "0026-remove-duplicates-from-sorted-arrayNOTES.md": "38c1374a2cd8b577a6f9a8e3974f17247e98c9af",
            "0026-remove-duplicates-from-sorted-arrayREADME.md": "cbe6bdb2946a18d2c1118f1dfb32343b270c7a77"
        },
*/ 
// msg:
const token = "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";
const personal_hook = "yluo3421/Leetcode-Solutions";
const test_sha = {"0026-remove-duplicates-from-sorted-array0026-remove-duplicates-from-sorted-array.py": "0e0cffed07d03950aa5b53c3aa7b705fa621a5c0"};
const test_dir = "Two_Sum_Test"
const test_code = btoa(unescape(encodeURIComponent("class Solution")))
const test_filename = "Two_Sum.py"

function upload(token, hook, code, directory, filename, sha, msg) {
    const URL = `https://api.github.com/repos/${hook}/contents/${directory}/${filename}`;
    console.log("upload started")
    let data = {
        message: msg,
        content: code,
        sha,
    };

    data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        console.log("readyState change event listened")
        console.log("local storage stats")
        console.log(chrome.storage.local.get("stats", (s) => {
            console.log(s)
        }))
        if (xhr.readyState === 4) {
            console.log("readyState === 4")
            if (xhr.status === 200 || xhr.status === 201) {
                console.log("success upload to GitHub")
                const updatedSha = JSON.parse(xhr.responseText).content.sha; // get updated SHA.
                console.log("show me updated sha")
                console.log(updatedSha)
            }
        }
    })
    xhr.open('PUT', URL, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send(data);
}


const repoName = "LeetCode Solution";
const createRepo = (token, name) => {
    const AUTHENTICATION_URL = 'https://api.github.com/user/repos';
    let data = {
      name,
      private: true,
      auto_init: true,
      description:
        'Collection of LeetCode questions to ace the coding interview! - Created using [LeetHub](https://github.com/QasimWani/LeetHub)',
    };
    data = JSON.stringify(data);
  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) {
        
        statusCode(JSON.parse(xhr.responseText), xhr.status, name);
        /**
         *  JSON.parse(xhr.responseText) = below
         *  "id": 568615701,
            "node_id": "R_kgDOIeRjFQ",
            "name": "LeetHub-test",
            "full_name": "gracelj/LeetHub-test",
            "private": true,
            "owner": {
                "login": "gracelj",
                "id": 39513639,
                "node_id": "MDQ6VXNlcjM5NTEzNjM5",
                "avatar_url": "https://avatars.githubusercontent.com/u/39513639?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/gracelj",
                "html_url": "https://github.com/gracelj",
                "followers_url": "https://api.github.com/users/gracelj/followers",
                "following_url": "https://api.github.com/users/gracelj/following{/other_user}",
                "gists_url": "https://api.github.com/users/gracelj/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/gracelj/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/gracelj/subscriptions",
                "organizations_url": "https://api.github.com/users/gracelj/orgs",
                "repos_url": "https://api.github.com/users/gracelj/repos",
                "events_url": "https://api.github.com/users/gracelj/events{/privacy}",
                "received_events_url": "https://api.github.com/users/gracelj/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/gracelj/LeetHub-test",
            "description": "Collection of LeetCode questions to ace the coding interview! - Created using [LeetHub](https://github.com/QasimWani/LeetHub)",
            "fork": false,
            "url": "https://api.github.com/repos/gracelj/LeetHub-test",
         */
      }
    });
  
    xhr.open('POST', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send(data);
  };
  createRepo(token, repoName)