jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos", callback);
}

jQuery.fn.loadRepositories = function(username) {
  this.html("<span>저장소를 읽어들이는 중</span>");

  var target = this;
  $.githubUser(username, function(data) {
    var repos = data;
    sortByNumberOfWatchers(repos);
    console.log(repos);

    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  });

  function sortByNumberOfWatchers(repos) {
    repos.sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};
