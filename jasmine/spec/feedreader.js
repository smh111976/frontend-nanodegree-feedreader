/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined URLs', function() {
           for(singleFeed of allFeeds) {
             expect(singleFeed.url).toBeDefined();
             expect(singleFeed.url).not.toEqual("");
           }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined names', function() {
           for(singleFeed of allFeeds) {
             expect(singleFeed.name).toBeDefined();
             expect(singleFeed.name).not.toEqual("");
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      var docBody = document.querySelector('body');

      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
        it('is hidden by default', function() {
          /* because feedreader uses a CSS class placed on the body
           * to move the menu offscreen... we test to see if said class
           * is placed on the body element by default.
           */
          expect(docBody.classList).toContain('menu-hidden');
        });

      /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('changes visibility on menu button click', function() {
        const menuIcon = $('.menu-icon-link');
        /* programatically 'click' the menu icon to see if the 'menu hiding'
         * class is removed, thus displaying the menu
         */
        menuIcon.trigger("click");
        expect(docBody.classList).not.toContain('menu-hidden');
        /* programatically 'click' the menu icon again to see if the 'menu hiding'
         * class is added again to the body, thus hiding the menu
         */
        menuIcon.trigger("click");
        expect(docBody.classList).toContain('menu-hidden');
      });
    });




    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
     /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      var feed = document.querySelector('.feed'),
          feedItems;
      beforeEach(function(done) {
        /* run the loadFeed function and use the callback to grab the feed
         * entries after they have loaded
         */
        loadFeed(0, function() {
          feedItems = feed.querySelectorAll('.entry');
          done();
        });
      });
      it('are visible', function(done) {
        // Make sure there is at least one feed entry that has loaded into the feeder
        expect(feedItems.length > 0).toBeTruthy();
       done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
     /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
      var feed = document.querySelector('.feed'),
          initialFeedContent, newFeedContent,
          initialFirstFeedTitle, newFirstFeedTitle;

      beforeEach(function(done) {
        // load initial feed
        loadFeed(0, function() {
          // grab all initial feed articles with the class of 'entry'
          initialFeedContent = feed.querySelectorAll('.entry');
          // grab the h2 of the initial feed's first article.entry element
          initialFirstFeedTitle = initialFeedContent[0].querySelector('h2').textContent;
        });
        // load a new feed
        loadFeed(1, function() {
          // grab all new feed articles with the class of 'entry'
          newFeedContent = feed.querySelectorAll('.entry');
          // grab the h2 of the new feed's first article.entry element
          newFirstFeedTitle = newFeedContent[0].querySelector('h2').textContent;
          done();
        });
      });



     it('loads different content successfully', function() {

       expect(initialFirstFeedTitle).not.toEqual(newFirstFeedTitle);
     });
    });
}());
