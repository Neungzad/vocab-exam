'use strict';

/**
 * @ngdoc function
 * @name cutepApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cutepApp
 */
angular.module('cutepApp')
  .controller('MainCtrl', function ($scope, $http, SweetAlert, appConfig) {
    
    $scope.authenName = false;
    $scope.score = 0;
    $scope.AllVocab = [];
    $scope.remainQuestion = [];
    $scope.question = {};
    $scope.choices = [];

    $scope.init = function(){
        // get all vocab
        $http.get(appConfig.url+'/vocab-exam/api/vocabs').
          success(function(data, status, headers, config) {            
            $scope.AllVocab = data;
            $scope.remainQuestion = angular.copy(data);                            

            // set first question
            $scope.generateQuestion();
            // set first choice
            $scope.generateChoice(); 
        });          
        
    };

    $scope.authen = function(uname){        
        if (uname !== undefined) {
            $scope.authenName = true;       
            $scope.uname = uname;
        }else{
            alert('Enter your ninja name ;)');
        }    	
    };

    $scope.checkAnswer = function(answerId){        
        // right answer
        if($scope.question.id === answerId) {
            
            $scope.score++;   

            if($scope.remainQuestion.length > 0){                            
                // set question
                $scope.generateQuestion();
                // set choice
                $scope.generateChoice();                         
            }else{               
                // sent score log to api                
                $.post(appConfig.url+'/vocab-exam/api/vocabs/save', {
                    username : $scope.uname,
                    score : $scope.score,
                    vocab_id_wrong : null 
                }, function(data){
                    console.log(data.status);
                }); 

                // Clear Mission Start Again button           
                SweetAlert.swal({   
                    title: 'You are Awesomeeeee !',
                    text: 'Keep going forward.',                     
                    type: 'success',                 
                    html: true,  
                    confirmButtonColor: '#A5DC86',   
                    confirmButtonText: 'Play Again'
                }, function(){                   
                    // call reset vocab
                    $scope.resetVocab();
                });
            }
        // wrong answer    
        }else{

            // sent score log to api           
            $.post(appConfig.url+'/vocab-exam/api/vocabs/save', {
                username : $scope.uname,
                score : $scope.score,
                vocab_id_wrong : $scope.question.id  
            }, function(data){
                console.log(data.status);
            });

            // show score and Start Again button           
            SweetAlert.swal({   
                title: 'Score : <span class="cl-green">'+$scope.score+'</span> / 100',   
                text: 'Right answer is <strong>'+$scope.question.name_th+' = '+$scope.question.name_eng+'</strong>',   
                type: 'error',                 
                html: true,  
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: 'Play Again'
            }, function(){                   
                // call reset vocab
                $scope.resetVocab();
            });
        }
    };
    
    $scope.generateQuestion = function() {
        // random question
        var rundomId = $scope.rundomId($scope.remainQuestion.length);
        
        // add question
        $scope.question = $scope.remainQuestion[rundomId];
        
        // add meaning(th) to first choice. 
        $scope.choices = [];               
        $scope.choices.push($scope.remainQuestion[rundomId]);
        
        // remove vocab from remainQuestion
        $scope.remainQuestion.splice(rundomId, 1);        
    };

    $scope.generateChoice = function() {
        // Ramdom add more 3 choices but no dulplicate first choice.
        var count = 1;
        var choiceTH = [];
        choiceTH.push($scope.question.name_th);

        while(count < 4){
            var rundomId = $scope.rundomId($scope.AllVocab.length);
           
            if (choiceTH.indexOf($scope.AllVocab[rundomId].name_th) === -1) {
                                
                // add choice
                $scope.choices.push($scope.AllVocab[rundomId]);
                
                // add choice for check
                choiceTH.push($scope.AllVocab[rundomId].name_th);
                count++;
            }
        }    

        // random choice
        $scope.choices = $scope.shuffle($scope.choices);
    };

    $scope.rundomId = function(lengthNumber) {
        return Math.floor(Math.random()*lengthNumber);
    };

    $scope.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $scope.resetVocab = function() {
        $scope.remainQuestion = angular.copy($scope.AllVocab);   
        $scope.score = 0;                   

        // set question
        $scope.generateQuestion();
        // set choice
        $scope.generateChoice(); 
    };
    
    $scope.init();

  });
