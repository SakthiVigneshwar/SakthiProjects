document.addEventListener('DOMContentLoaded', () => {
    const quizContent = document.getElementById('quizContent');
    const submitQuiz = document.getElementById('submitQuiz');
    const result = document.getElementById('result');

    // Load questions from localStorage
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];

    if (quizData.length === 0) {
        quizContent.innerHTML = '<p>No questions available. Please check back later.</p>';
        submitQuiz.style.display = 'none';
    } else {
        quizData.forEach((item, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-block');

            const question = document.createElement('p');
            question.textContent = `${index + 1}. ${item.question}`;
            questionDiv.appendChild(question);

            ['a', 'b', 'c', 'd'].forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index}`;
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${item[option]}`));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });

            quizContent.appendChild(questionDiv);
        });
    }

    submitQuiz.addEventListener('click', () => {
        let score = 0;
        quizData.forEach((item, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === item.correct) {
                score++;
            }
        });

        result.textContent = `You scored ${score} out of ${quizData.length}.`;
    });
});
