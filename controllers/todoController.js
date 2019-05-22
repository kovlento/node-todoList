var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// var data = [{item:'aaa'},{item:'bbb'},{item:'ccc'}];

mongoose.connect('mongodb+srv://cyt:cyt123456@cluster0-zmqvn.mongodb.net/test?retryWrites=true')

var todoSchema = new mongoose.Schema({
    item:String
});

var todo = mongoose.model('todo', todoSchema);

// var itemOne = todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')
// })

var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    app.get('/todo', function(req, res){
        todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo' , {todos:data})
        })
        
    })

    app.post('/todo', urlencodedParser, function(req, res){
        var itemOne = todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    })

    app.delete('/todo/:item', function(req, res){
        // data = data.filter(function(ele){
        //     return ele.item.replace(/ /g, "-") !== req.params.item;
        // })
        todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data); 
        })
        
    })
}