qNum = 0;
aNum = 0;
// seasonal > healthy > prep > hot
answers = {"true": {"true": {"true": {"true": "SNACK A: seasonal, healthy, prep, hot", "false": "SNACK B: seasonal, healthy, prep, cold"}, "false": {"true": "SNACK C: seasonal, healthy, no prep, hot", "false": "SNACK D: seasonal, healthy, no prep, cold"}},"false": {"true": {"true": "SNACK E: seasonal, unhealthy, prep, hot","false": "SNACK F: seasonal, unhealthy, prep, cold"}, "false": {"true": "SNACK G: seasonal, unhealthy, no prep, hot","false": "SNACK H: seasonal, unhealthy, no prep, cold"}},}, "false": {"true": {"true": {"true": "SNACK I: not seasonal, healthy, prep, hot", "false": "SNACK J: not seasonal, healthy, prep, cold"}, "false": {"true": "SNACK K: not seasonal, healthy, no prep, hot", "false": "SNACK L: not seasonal, healthy, no prep, cold"}}, "false": {"true": {"true": "SNACK M: not seasonal, unhealthy, prep, hot", "false": "SNACK N: not seasonal, unhealthy, prep, cold"}, "false": {"true": "SNACK O: not seasonal, unhealthy, no prep, hot", "false": "SNACK P: not seasonal, unhealthy, no prep, cold"}},},};

$(document).ready(function(){
   $("#start").click(start)
   $("#yes").click(function(){
      answer(true)
   })
   $("#no").click(function(){
      answer(false)
   })
});

function start(){
   $("#loading").removeClass("hidden");
   $("#start").addClass("hidden");
   $("#yes").removeClass("hidden");
   $("#no").removeClass("hidden");
   getQuestions();
}

function answer(ans){
   getQuestions();
   saveAnswer(ans);
}

function getQuestions(){
   $.get("questions.xml", function(data){
      var $q = $(data).find("q")
      $("#loading").addClass("hidden")
      if(qNum < $q.length){
         $("#question").html($q[qNum].firstChild.nodeValue)
      }
      else {
         $("#question").html("You've completed the quiz.")
      }
      qNum += 1
   });
}

function saveAnswer(ans){
   $.get("questions.xml", function(data){
      var $a = $(data).find("a")
      if (aNum < $a.length){
         $a[aNum].firstChild.nodeValue = ans
         answers = answers[ans]
      }
      else{
         $("#question").html(answers)
      }
      aNum += 1
   });
}
