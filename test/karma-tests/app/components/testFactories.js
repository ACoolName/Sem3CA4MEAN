describe('meanApp.factories', function () {
    var httpBackend;
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend) {
        httpBackend = $httpBackend;
    }));

    describe('InfoFactory', function () {
        var infoFactory;
        beforeEach(inject(function (_InfoFactory_) {
            infoFactory = _InfoFactory_;
        }));

        it('Should be Hello World from a Factory', function () {
            expect(infoFactory.getInfo()).toBe("Hello World from a Factory");
        });
    });


    describe('WikiFactory', function () {
        var wikiFactory;
        beforeEach(inject(function (_WikiFactory_) {
            wikiFactory = _WikiFactory_;
        }));

        describe('getWiki', function () {
            it('should return a promise containing a wiki page', function () {
                var title = "Fake wiki title";
                var fakeWiki = {
                    title: title
                };
                httpBackend.expectGET('api/wiki/' + title).respond(fakeWiki);
                wikiFactory.getWiki(title)
                    .success(function (data) {
                        expect(data.title).toEqual(title);
                    });
                httpBackend.flush();
            });

            it('should return error when searching for non existing title', function () {
                httpBackend.expectGET('api/wiki/' + "NoSuchTitle").respond(404);
                wikiFactory.getWiki("NoSuchTitle")
                    .error(function (data, status) {
                        expect(status).toEqual(404);
                    });
                httpBackend.flush();
            })
        });

        describe('findWiki a function used to find wikis with a searchTerm', function () {
            it('should return a promise containing titles and abstracts', function () {
                var searchTerm = "Fake";
                var fakeWikiList = [
                    {title: "Fake One", abstract: "A fake abstract"},
                    {title: "Fake Two", abstract: "A sentence"}
                ];
                httpBackend.expectGET('api/wikilist/' + searchTerm).respond(fakeWikiList);
                wikiFactory.findWiki(searchTerm)
                    .success(function (data) {
                        expect(data.length).toEqual(2);
                        expect(data[0].title).toEqual("Fake One");
                    });
                httpBackend.flush();
            });
        });

    });
});