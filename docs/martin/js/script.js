$(window).scroll(function () { // When user scrolls ...
        
        if ($(window).scrollTop() > 1) { // IF user has scrolled more than 50px down the page...
            $(".navbarScrolled").removeClass('slideDown'); // Removes class "slideDown"
            $(".navbar").addClass('navbarScrolled slideDown2'); // Add class to naviagtion "navbarScrolled" and "slideDown" - The slideDown class provides the animation
            $(".navbarScrolled").removeClass('slideDown'); // Removes class "slideDown"
            $('.navbar-left img').attr("src", "images/logo.png"); // Ensures the navigation logo is the white version
        } // END IF
        
        else { // ELSE
            
            $('.navbarScrolled').addClass('slideDown'); // Add class to navigation "slideUp"
            $('.navbar').removeClass('navbarScrolled slideDown2');// Remove classes "navbarScrolled" & "slideDown"
            $('.navbar').addClass('slideDown'); // Add class to navigation "slideUp"
            
            $('.navbar-left img').attr("src", originalSrc); // Changes logo back to it's orignial state
            
        } // END ELSE
        
    }); // END Scroll event function

// show loading image
$('.header').css('background-color', '#2a2a2a');
$(document).ready(function(){ // When document loads...
    
    $('.closeSearch').click(function(){ // When user clicks the paragraph with class="closeSearch"...
       $('.searchDiv').fadeOut( 500, "linear" ); // Jquery fadeout animation on the search form (Home page)
        
    }); // END click function
}); // END Document ready function
$('#openCalendar').click(function() {
   $('.calendar').slideDown("slow");
});
$('.closeCalendar').click(function() {
    $('.calendar').slideToggle('slow');
})


// Switch images //
$(document).ready(function() {
    
    /* ==== Get all Image elements ==== */
    // Top image element
    firstImg = $('.imageTop img');
    // Bottom Image element
    secondImg = $('.imageBottom img');
    // First Small Image element
    thirdImg = $('.smallImg:nth-child(1) img');
    // Second Small Image element   
    fourthImg = $('.smallImg:nth-child(2) img');
    // Third Small Image  element  
    fifthImg = $('.smallImg:nth-child(3) img');
    // Fourth Small Image element   
    sixthImg = $('.smallImg:nth-child(4) img');
    // Fifth Small Image  element  
    seventhImg = $('.smallImg:nth-child(5) img');
    
    // Get all image sources
    // Top Image
    imageTop = $('.imageTop img').attr('src');
    // Bottom Image
    imageBottom = $('.imageBottom img').attr('src');
    // First Small Image
    firstSmall = $('.smallImg:nth-child(1) img').attr('src');
    // Second Small Image    
    secondSmall = $('.smallImg:nth-child(2) img').attr('src');
    // Third Small Image    
    thirdSmall = $('.smallImg:nth-child(3) img').attr('src');
    // Fourth Small Image    
    fourthSmall = $('.smallImg:nth-child(4) img').attr('src');
    // Fifth Small Image    
    fifthSmall = $('.smallImg:nth-child(5) img').attr('src');

    // Wrap the top image in a <a> tag linking to its lightbox
    $('.imageTop img').wrap( "<a href='"+imageTop+"' data-lightbox='image-1'></a>" );
    // Wrap the bottom image in a link linking to its lighbox
    $('.imageBottom img').wrap( "<a href='"+imageBottom+"' data-lightbox='image-2'></a>" );
    
});

// When small Image is clicked
$(' .changeImage img ').click(function(){
    
    // Src of clicked image
    changeTo = $(this).attr('src');
    // Src of clicked image
    $(this).fadeTo(100,0.9, function() {
        $(this).attr('src', imageTop);
        /* ===== Get new sources after change ===== */
        // Get new source of top image
        imageTop = $('.imageTop img').attr('src');
        // Get new source of bottom Image
        imageBottom = $('.imageBottom img').attr('src');
        // First Small Image
        firstSmall = $('.smallImg:nth-child(1) img').attr('src');
        // Second Small Image    
        secondSmall = $('.smallImg:nth-child(2) img').attr('src');
        // Third Small Image    
        thirdSmall = $('.smallImg:nth-child(3) img').attr('src');
        // Fourth Small Image    
        fourthSmall = $('.smallImg:nth-child(4) img').attr('src');
        // Fifth Small Image    
        fifthSmall = $('.smallImg:nth-child(5) img').attr('src');
    
        // Change link hrefs to the new sources for use in lightbox
        firstImg.parents("a").attr( "href", imageTop );
        secondImg.parents("a").attr( "href", imageBottom );
    }).fadeTo(500,1);
    firstImg.fadeTo(100,0.9, function() {
        // Change src of top image to what the bottom one was
        firstImg.attr('src', imageBottom);
        /* ===== Get new sources after change ===== */
        // Get new source of top image
        imageTop = $('.imageTop img').attr('src');
        // Get new source of bottom Image
        imageBottom = $('.imageBottom img').attr('src');
        // First Small Image
        firstSmall = $('.smallImg:nth-child(1) img').attr('src');
        // Second Small Image    
        secondSmall = $('.smallImg:nth-child(2) img').attr('src');
        // Third Small Image    
        thirdSmall = $('.smallImg:nth-child(3) img').attr('src');
        // Fourth Small Image    
        fourthSmall = $('.smallImg:nth-child(4) img').attr('src');
        // Fifth Small Image    
        fifthSmall = $('.smallImg:nth-child(5) img').attr('src');
    
        // Change link hrefs to the new sources for use in lightbox
        firstImg.parents("a").attr( "href", imageTop );
        secondImg.parents("a").attr( "href", imageBottom );
     }).fadeTo(500,1);
    secondImg.fadeTo(100,0.9, function() {
        // Change source of Bottom image
        secondImg.attr('src', changeTo);
        /* ===== Get new sources after change ===== */
        // Get new source of top image
        imageTop = $('.imageTop img').attr('src');
        // Get new source of bottom Image
        imageBottom = $('.imageBottom img').attr('src');
        // First Small Image
        firstSmall = $('.smallImg:nth-child(1) img').attr('src');
        // Second Small Image    
        secondSmall = $('.smallImg:nth-child(2) img').attr('src');
        // Third Small Image    
        thirdSmall = $('.smallImg:nth-child(3) img').attr('src');
        // Fourth Small Image    
        fourthSmall = $('.smallImg:nth-child(4) img').attr('src');
        // Fifth Small Image    
        fifthSmall = $('.smallImg:nth-child(5) img').attr('src');
    
        // Change link hrefs to the new sources for use in lightbox
        firstImg.parents("a").attr( "href", imageTop );
        secondImg.parents("a").attr( "href", imageBottom );
    }).fadeTo(500,1);
    
});

    
