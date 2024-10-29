const mongoose = require('mongoose')

const connectDataBase = (url)=>{
    mongoose.connect(url)
    .then(()=> console.log('Data base Connected'))
    .catch((e) => console.log(e));
}

module.exports = connectDataBase