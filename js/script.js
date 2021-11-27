const dropZone = document.querySelector ('.drop-zone');
const browseBtn = document.querySelector ('.browseBtn');
const fileInput = document.querySelector ('#fileinput');

const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains('dragged')){
        dropZone.classList.add('dragged');
    }
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragged');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragged');
    const files = e.dataTransfer.files;
    console.table(files);
    if(files.length > 0){
        fileInput.files = files;
        uploadFile();
    }
});

fileInput.addEventListener('change', () => {
    uploadFile();
});

browseBtn.addEventListener('click', () => {
    fileInput.click();
});


const uploadFile = ()=>{
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('myfile', file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.Done){
            console.log(xhr.response);
        }
    };

    xhr.upload.onprogress = updateProgress;
    xhr.open('POST', uploadURL);
    xhr.send(formData);

    const updateProgress = (e) => {
        console.log(e); 
    }
} 
