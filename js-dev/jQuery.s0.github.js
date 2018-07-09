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
    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.svn_url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  }, function(data){
    repos = localStorage.getItem("repodata");
    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.svn_url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  });


  function sortByNumberOfWatchers(repos) {
    $(repos).sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};
