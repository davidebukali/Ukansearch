var express = require('express'),
    argv = require('optimist').argv,
    app = express(),
    port = process.env.PORT || argv.p || argv.port || 80;

app.use("/", express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');
