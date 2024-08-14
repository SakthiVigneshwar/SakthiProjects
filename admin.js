document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionForm');
    const feedback = document.getElementById('feedback');
    const questionsList = document.getElementById('questionsList');

    // Load existing questions from localStorage
    function loadQuestions() {
        const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
        questionsList.innerHTML = '';
        quizData.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.question} (A: ${item.a}, B: ${item.b}, C: ${item.c}, D: ${item.d}) - Correct: ${item.correct}`;
            questionsList.appendChild(li);
        });
    }

    loadQuestions();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = document.getElementById('question').value;
        const a = document.getElementById('a').value;
        const b = document.getElementById('b').value;
        const c = document.getElementById('c').value;
        const d = document.getElementById('d').value;
        const correct = document.getElementById('correct').value;
        
        if (!question || !a || !b || !c || !d || !correct) {
            feedback.textContent = 'Please fill out all fields.';
            feedback.style.color = 'red';
            return;
        }
        
        let quizData = JSON.parse(localStorage.getItem('quizData')) || [];
        
        quizData.push({
            question,
            a,
            b,
            c,
            d,
            correct
        });
        
        localStorage.setItem('quizData', JSON.stringify(quizData));
        
        feedback.textContent = 'Question added successfully!';
        feedback.style.color = 'green';

        form.reset();
        loadQuestions();
    });
});
