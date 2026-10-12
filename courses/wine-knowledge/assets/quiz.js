/* Quiz component. Retrieval practice with immediate feedback.
 *
 * Markup:
 *   <div class="quiz">
 *     <div class="q" data-correct="2">            <!-- 0-based index of the right option -->
 *       <p class="stem">Question text</p>
 *       <div class="options"><button>A</button><button>B</button>...</div>
 *       <p class="why" hidden>Explanation shown after answering.</p>
 *     </div>
 *     ...
 *   </div>
 *
 * Authoring rule: keep every option the same number of words, and vary the
 * position of the correct answer across questions.
 */
(function () {
  function initQuiz(quiz) {
    var questions = Array.prototype.slice.call(quiz.querySelectorAll(".q"));
    var score = document.createElement("p");
    score.className = "quiz-score";
    score.setAttribute("aria-live", "polite");
    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "quiz-reset";
    reset.textContent = "Clear answers and try again";
    quiz.appendChild(score);
    quiz.appendChild(reset);

    function update() {
      var answered = questions.filter(function (q) { return q.dataset.answered; });
      var right = answered.filter(function (q) { return q.dataset.answered === "right"; });
      score.textContent = answered.length
        ? right.length + " of " + answered.length + " answered correctly (" + questions.length + " questions)"
        : "Answer from memory before scrolling back up.";
    }

    questions.forEach(function (q) {
      var correct = parseInt(q.dataset.correct, 10);
      var buttons = Array.prototype.slice.call(q.querySelectorAll(".options button"));
      var why = q.querySelector(".why");
      buttons.forEach(function (b, i) {
        b.type = "button";
        b.addEventListener("click", function () {
          if (q.dataset.answered) return;
          var isRight = i === correct;
          q.dataset.answered = isRight ? "right" : "wrong";
          b.classList.add(isRight ? "is-right" : "is-wrong");
          buttons[correct].classList.add("is-right");
          buttons.forEach(function (x) { x.disabled = true; });
          if (why) why.hidden = false;
          update();
        });
      });
    });

    reset.addEventListener("click", function () {
      questions.forEach(function (q) {
        delete q.dataset.answered;
        q.querySelectorAll(".options button").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("is-right", "is-wrong");
        });
        var why = q.querySelector(".why");
        if (why) why.hidden = true;
      });
      update();
    });

    update();
  }

  document.querySelectorAll(".quiz").forEach(initQuiz);
})();
