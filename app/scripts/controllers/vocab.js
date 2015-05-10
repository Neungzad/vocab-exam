'use strict';

/**
 * @ngdoc function
 * @name cutepApp.controller:VocabCtrl
 * @description
 * # VocabCtrl
 * Controller of the cutepApp
 */
angular.module('cutepApp')
  .controller('VocabCtrl', function ($scope, $http, appConfig) {
    
    $scope.allVocabList = [];

    $scope.init = function(){
        // get all vocab
        $http.get(appConfig.url+'/vocab-exam/api/vocabs/list').
          success(function(data) {            
            $scope.allVocabList = data;            
        });   

        // Active menu
        $('.nav li').removeClass('active');          
        $('#menu_vocab').addClass('active');              
    };

    $scope.init();

  });
