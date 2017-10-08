myApp.controller('RepoController', function (GithubService) {
    console.log('RepoController loaded.')
    var vm = this;
  
    vm.repos = GithubService.repos;
  
    // get repo info on load
    GithubService.githubRepos();
  
  });
  