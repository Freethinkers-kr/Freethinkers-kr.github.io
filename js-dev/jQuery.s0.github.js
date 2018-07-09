jQuery.getRepoData = function(username, callback, failcall){
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos", callback).fail(failcall);
}
jQuery.fn.loadRepositories = function(username) {
  this.html("<span>저장소를 읽어들이는 중</span>");

  var target = this;
  var repos;
  $.getRepoData(username, function(data){
    repos = data;
    sortByNumberOfWatchers(repos);
    localStorage.setItem("repodata", data);
    itemArrange(repos, target);
  }, function(data){
    repos = localStorage.getItem("repodata");
    itemArrange(repos, target);
  });

  function itemArrange(repodata, target){
    var list = $('<div class="flex-wrap"></div>');
    $(repos).each(function(){
      let listItem = $('<div class="flex-item"></div>');
      let contect = $('<div class="item-contect"></div>');
      listItem.append('<span class="item-title">'+this.name+'</span>');
      listItem.append('<p>'+this.description+'</p>');
      contect.append('<a class="contect" href="' + this.html_url + '"><i class="fab fa-github-alt"></i></a>');
      if(this.has_pages){
        let url = this.full_name.split('/');
        let href = "https://" + url[0] + ".github.io/" + url[1];
        contect.append('<a class="contect" href="' + href + '"><i class="fas fa-passport"></i></a>');
      }
      listItem.append(contect);
      list.append(listItem);
    });
    target.empty().append(list);
  }

  function sortByNumberOfWatchers(repos) {
    $(repos).sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};
