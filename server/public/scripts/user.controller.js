myApp.controller('UserController', function (GithubService) {
  console.log('UserController loaded.')
  var vm = this;

  vm.user = GithubService.user;

  // get profile and repo info on load
  GithubService.githubProfile();

});
