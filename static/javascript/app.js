$( document ).ready(function() {
  setupPrompt();
  animateSlideOutOfBox();
});

function setupPrompt() {
  // randomly pick a prompt and send prompt ID to database
  var totalNumPrompt = 2;

  // Rothko
  var promptMap = {
    0: "<p>What does Mark Rothko's <i>No. 14</i> bring to your mind? </p>",
  };

  // Mitchell
  var promptMap = {
    0: "<p>What does Joan Mitchell's <i>Before, Again IV</i> bring to your mind? </p>",
    1: "<p>Joan Mitchell painted this piece <i>Before, Again IV</i> during her illness. Does this change how you perceive the piece?</p>"
  };

  window.promptid = Math.floor(Math.random() * (totalNumPrompt - 1));
  var div = document.createElement("div");
  div.innerHTML = promptMap[window.promptid];
  document.getElementById("prompt").append(div);
}

function animateSlideOutOfBox() {
  document.getElementById("date").textContent = getCurrentDate();
  document.getElementById("time").textContent = getCurrentTime();
  $('#container').animate({ 'margin-top': '230px' }, 6000);
}

function animateSlideIntoBox() {
  $('#container').animate({ 'margin-top': '730px' }, 3000);
}

function getCurrentDate() {
  return moment().format('MMMM Do YYYY');
}

function getCurrentTime() {
  return moment().format('h:mm A');
}

function send() {
  $('form').on('submit', function(event) {
    event.preventDefault();
  });
  $.ajax({
    data : {
      date : getCurrentDate(),
      time : getCurrentTime(),
      datetime : Date.now(),
      name : "Someone",
      message : $('#textarea').val(),
      promptid: window.promptid
    },
    type : 'POST',
    url : '/post'
  }).done(function(data) {
    animateSlideIntoBox();
    setTimeout(() => {
      $("#textarea").val('');
      animateSlideOutOfBox();
    }, 20000);
  });
}
