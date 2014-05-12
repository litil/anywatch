/*
 * GET tasks listing.
 */

/**
 * This method renders the about page.
 *
 * @param req
 * @param res
 */
exports.display = function(req, res){

    res.render('about', { title: 'About'});
};

