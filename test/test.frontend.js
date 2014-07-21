casper.test.begin('Opening UkanSearch', 1, function(test) {
    casper.start('index.html', function() {
        test.assertTitle('UkanSearch Urls');
    });

    casper.run(function() {
        test.done();
    });
});
