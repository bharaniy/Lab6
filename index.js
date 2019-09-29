let express= require('express');
console.log("1");
let app = express();
console.log("2");
app.get('/hello', function (req, res) {
    res.send('hi andi');
    console.log('3');
});
app.post('/hello', function (req, res) {
    res.send('hi andi');
    console.log('3');
});
app.listen(3000);