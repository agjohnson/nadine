// To test this file, make sure CapserJs is installed on local machine
// (brew install casperjs) then use code 'casperjs test homelinktesting.js'

// This tests to make sure all urls are valid on the homepage

var url = 'http://127.0.0.1:8000';
var links;

casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

casper.test.begin('Profile has 30 links', 35, function suite(test) {
  function getLinks() {
    var links = document;
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
  }

  casper.start(url + '/login', function() {
      test.assertTitle("Login | Office Nomads", "Login page title is the one expected");
      test.assertExists('form[method="post"]', "login form is found");
  });

  casper.then(function() {
    this.evaluate(function() {
      //insert username to test
      document.getElementById('id_username').value = '';
      document.getElementById('id_password').value = 'hellocats';
      document.getElementById('loginonly-btn').click();
    })
  })

  casper.then(function() {
    test.assertTitle("Office Nomads", "Homepage title is ok");
    test.assertUrlMatch(/member/, "Homepage url correct");
  });

  casper.then(function getLinks() {
    links = this.evaluate(function(){
      var links = document.getElementsByTagName('a');
      links = Array.prototype.map.call(links,function(link){
          return link.getAttribute('href');
      });
      return links;
    });
  });

  casper.then(function() {
    // Second value below shows the number of links we KNOW exist. If using this code to test another page, change that number.
    test.assertEquals(links.length, 30);
    this.each(links,function(self,link) {
      path = url + link;
      self.thenOpen(path,function(a) {
        test.assertEquals(this.currentHTTPStatus, 200);
      });
    });
  });

  casper.run(function() {
      test.done();
  });
});
