let mongo = function() {
    function getAll() {
        return function() {
            let col = db.collection('Users');
            col.find({}).toArray(function(err, items) {
                return items
            });
        }
    }
};

module.exports = mongo;