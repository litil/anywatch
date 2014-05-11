
/*
 * GET users listing.
 */

exports.list = function(req, res){
    var title = 'Top 10 NBA Crossovers of the 2013-2014 Regular Season';
    var url = 'https://www.youtube.com/watch?v=RhyZrDKejBo';
    var author = 'Guillaume';
    var sample = [
        {title : title, url : url, author : author, creation_datetime : new Date()},
        {title : title, url : url, author : author, creation_datetime : new Date()},
        {title : title, url : url, author : author, creation_datetime : new Date()}];

    res.render('tasks', { title: 'Dashboard', tasks: sample});

};




exports.addTask = function(req, res){
    var author = req.body.author;
    var title = req.body.title;
    var url = req.body.task_url;

    // TODO save data somewhere, Parse seems to be the best option



    var sample = [
        {title : title, url : url, author : author, creation_datetime : new Date()},
        {title : title, url : url, author : author, creation_datetime : new Date()},
        {title : title, url : url, author : author, creation_datetime : new Date()}];

    res.render('tasks', { title: 'Dashboard', tasks: sample});
};