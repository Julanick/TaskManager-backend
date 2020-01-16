module.exports = function(app, dbClient) {
    var db = dbClient.db('TaskManagerDB');

    app.get('/days', function(req, res) {
        db.collection('tasks')
            .find({ 'date': new Date(req.query.date) })
            .toArray(function(err, item) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                }
            });
    });
};