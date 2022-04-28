async function getQuestions() {
    // Get "questions.json"
    var questionData = await fetch('/questions.json');
    var questionRecieve = await questionData.json();

    // Write questions to page.
    var questionsHTML = "";

    var noName = function() {
        if (questionRecieve.questions[i].name == undefined) {
            return "";
        } else {
            return questionRecieve.questions[i].name;
        }
    }

    for (var i = 0; i < questionRecieve.questions.length; i++) {
        var questionsHTML = questionsHTML + `
            <div>
                <h2>${questionRecieve.questions[i].question}</h2>
                <h3>` + noName() + `</h3>
                <time>${questionRecieve.questions[i].date}</time>
                <button class="icon">
                <img src="/assets/icons/like.svg">
                <p>${questionRecieve.questions[i].likeCount}</p>
                </button>
            </div>
        `
    }
    document.getElementsByClassName('gallery')[0].innerHTML = questionsHTML;
}

getQuestions();