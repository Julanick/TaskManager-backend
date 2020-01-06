// note_routes.js
module.exports = function(app, client) {
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        client.db('TaskManagerDB').collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};