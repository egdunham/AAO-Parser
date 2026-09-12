//import {parse_container_list} from "./write_ead.js"

const uploadBox = document.querySelector('.upload-wrapper')
const uploadZone = document.querySelector('.upload-zone');
const resetBtn = document.querySelector('#reset-btn');
const convertBtn = document.querySelector('#convert-btn');
const inputFile = document.querySelector('#input-file');
const fileName = document.querySelector('.file-name');
const fileSize = document.querySelector('.file-size');

let toConvert1 = null;

const handleOnChange = (file) => {
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(2) + " KB"
}

inputFile.addEventListener("change", (e) => {
    handleOnChange(e.target.files[0])
})

uploadBox.addEventListener("submit", (e) => 
    {   e.preventDefault();
        // Check for valid file and confirm selection
        if (toConvert1 === null) {
            alert("Please select a file to convert!");
        }

        else if (toConvert1.length > 1) {
            alert("Only one file can be converted at a time!");
        }

        else {
            confirm("Convert " + toConvert1[0].name + " to EAD?");
            parse_container_list();
        }
        
    })

uploadBox.addEventListener("reset", () => {
    fileName.textContent = "No File Uploaded";
    fileSize.textContent = "0.00 KB"
    toConvert1 = null;
})

uploadZone.addEventListener('dragenter', () => uploadZone.classList.add('is-dragging'));
uploadZone.addEventListener('dragover', (e) => e.preventDefault());
uploadZone.addEventListener('dragleave', (e) => {
    if (!uploadZone.contains(e.relatedTarget)) {
        uploadZone.classList.remove('is-dragging');
    }
});

uploadZone.addEventListener("drop", (e) => {
    e.preventDefault()
    handleOnChange(e.dataTransfer.files[0])
    uploadZone.classList.remove('is-dragging')
    toConvert1 = e.dataTransfer.files;
})