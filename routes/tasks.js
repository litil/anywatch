/*
 * GET tasks listing.
 */

/**
 * This method renders the main page which will asynchronously load
 * the tasks list.
 *
 * @param req
 * @param res
 */
exports.list = function(req, res){

    res.render('tasks', { title: 'Dashboard', tasks: []});
};

