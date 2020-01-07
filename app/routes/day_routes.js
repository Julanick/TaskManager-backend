module.exports = function(app, client) {
    var db = client.db('TaskManagerDB');

    app.get('/days', (req, res) => {
        db.collection('tasks').find({ 'date': new Date(req.query.date) }).toArray((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
};