const myHeaders = new Headers({
  "Content-Type": "application/json",
});
const submitQuiz = (submission) => {
console.log(submission)
  return fetch("http://localhost:8081/quizzes", {
    method: "POST",
    body: JSON.stringify(submission),
    headers: myHeaders,
    mode: 'cors',
  });
}


export default submitQuiz;