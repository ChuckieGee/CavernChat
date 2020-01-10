const server = require("./server");
const expect = require("chai").expect;
const request = require("request");
// global.window = window
// global.$ = require("jquery")(window);

describe('Server Status Test', function(){
    it('This should return status 200, checking server connection', function(done){
        request('http://localhost:3000', function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });    
    });
});

describe('Webpages Tests', function(){
    it('This should return pass if "Rooms" loads correctly', function(done){
        request('http://localhost:3000/rooms', function(err, res, body){
            var bigString = res.body;
            var searchString = bigString.search("<title>Socket.io Rooms</title>")
            expect(searchString).to.not.equal(-1);
            done();
        })
    });
    it('This should return pass if "index" loads correctly.', function(done){
        request('http://localhost:3000/', function(err, res, body){
            var bigString = res.body;
            var searchString = bigString.search("<title>Mongo Chat with Socket.io</title>")
            expect(searchString).to.not.equal(-1);
            done();
        })
    });
    it('This should return pass if "friends" loads correctly.', function(done){
        request('http://localhost:3000/friends', function(err, res, body){
            var bigString = res.body;
            var searchString = bigString.search("<title>Friends Demo</title>")
            expect(searchString).to.not.equal(-1);
            done();
        })
    });
    it('This should return pass if "about" loads correctly.', function(done){
        request('http://localhost:3000/about', function(err, res, body){
            var bigString = res.body;
            var searchString = bigString.search("<title>About</title>")
            expect(searchString).to.not.equal(-1);
            done();
        })
    });
    it('This should return pass if the 404 page loads correctly.', function(done){
        request('http://localhost:3000/*', function(err, res, body){
            var bigString = res.body;
            var searchString = bigString.search("<title>404</title>")
            expect(searchString).to.not.equal(-1);
            done();
        })
    });
});
