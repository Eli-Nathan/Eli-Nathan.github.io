Hey Martin!

Just a little document to explain some things:

*** Bootstrap ***

The documentation for Bootstrap can be found here: http://getbootstrap.com/
It contains explanations and examples. The files are downloaded and linked to in the HTML so you don't have to worry about updating

The Column layout is as follows:

    - There are 12 columns in total. Each div also has 12 columns inside it.
    
    - To define columns you simple add the classes into the HTML:
        class="col-lg-4 col-md-6 col-sm-9 col-xs-12"
        ^ That line of code tells the div to be 4/12 (1/3) the width on a large screen(lg)
          6/12 (1/2) the width on a medium sized screen like tablets (Landscape)
          9/12 (3/4) on small screens like tablet (Portrait)
          and 12/12 (Full width) on small devices like mobile
          
    - The breakpoints are:
        lg > 1200px
        md = 992px up to 1200px
        sm = 768px up to 992px
        xs = 480px up to 768px
        
    - You can nest grids inside eachother like so:
        <div class='col-lg-6'>
            <div class='col-lg-6'>
                Some Content ....
            </div>
        </div>
        ^ This will mean there is a div that is half width which also contains a div which is half width meaning
          it will be half the width of the parent div so it will really only be 1/4 width of the whole screen.
          
    - To add the regions you want on the map there is an array in the mapHighlight.js file. Simply add the names
      of ALL the places you want to appear in all countries. The query will then only show the ones on the country
      the user has selected :)
      
    - There are a few elements like the Events Carousel on the homepage which are slightly complicated.
      Because large screens have the three events divs in a row and on small screens there is a carousel.
      These elements are completely seperate so if you are filling the content using Wordpress just remember
      to use fill BOTH :)
      This goes for all the carousels as they only appear on mobile or appear slightly differently.
      
      
    - My email is ely.nathan93@gmail.com if you have any questions and I'm not on Upwork.

