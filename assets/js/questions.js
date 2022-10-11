var questionGallery = document.getElementById('question-gallery');
// var likeButton = document.getElementById('');

async function fetchQuestions() {
    resp = await fetch("/questions/questions.json");
    questionsJSON = await resp.json();

    for (let i = 0; i < questionsJSON.length; i++) {
        const element = questionsJSON[i];
        
        questionGallery.innerHTML = questionGallery.innerHTML + `
        <div class="question" id="${element.id}">
            <div class="body">
                <h2>${element.question}</h2>
                <i>${element.date}</i>
                <p>${element.comment}</p>
            </div>
            <div class="interactions">
                <p>#${element.id}</p>
                <div class="like">
                    <img src="/assets/images/icons/like-0.svg" alt="">
                    <p class="like-counter">${element.likeCount}</p>
                </div>
            </div>
        </div>
        `
    }

    likeButton = document.querySelector('.like img');
    likeButton.addEventListener('click', likeButtonTapped());
}

fetchQuestions();


function likeButtonTapped(e) {
    console.log("pressed")
}
