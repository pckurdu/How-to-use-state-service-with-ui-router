var app=angular.module('myApp',['ui.router']);

app.config(['$stateProvider',function($stateProvider){

  $stateProvider
  .state('news',{
    url:'/news',
    templateUrl:'news.html',
    controller:'newsCtrl'
  })
  .state('new',{
    url:'/new/:nid',
    templateUrl:'new.html',
    controller:'newCtrl'
  });

}]);


app.service('transporterService', function() {
  var List = [];

  this.addList = function(newList) {
      List.push(newList);
  };
  this.getList = function(){
      return List;
  };
});

app.controller('newsCtrl',['$scope','$state','transporterService',function($scope,$state,transporterService){

$scope.newsData=[
  {newId:1,newTitle:'newTitle1',newContent:'newContent1'},
  {newId:2,newTitle:'newTitle2',newContent:'newContent2'},
  {newId:3,newTitle:'newTitle3',newContent:'newContent3'},
  {newId:4,newTitle:'newTitle4',newContent:'newContent4'}
];

//console.log($state);
transporterService.addList($scope.newsData);

$scope.do=function(newId){

  $state.go('new',{
    nid:newId
  })
}



}]);

app.controller('newCtrl',['$scope','$stateParams','transporterService',function($scope,$stateParams,transporterService){

  $scope.newId=$stateParams.nid;
  console.log($scope.newId);

  $scope.News=transporterService.getList();

  $scope.New = $scope.News[0].find(i => i.newId == $scope.newId);



}]);
