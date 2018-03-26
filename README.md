# JS Skeleton Carousel

A quick way to get a carousel and its DOM elements up and running with configurable options (below). All CSS should be written to suit your needs.

## Creating a Carousel
Only thing needed is a DOM element with an unordered list of items inside:
~~~~
<div id="carousel">
	<ul>
		<li>Slide 1</li>
		<li>Slide 2</li>
		<li>Slide 3</li>
		<li>Slide 4</li>
	</ul>
</div>
~~~~
Include the minified script:
~~~~
<script src="path-to/carousel.min.js"></script>
~~~~
Create a new carousel instance:
~~~~
const homeCarousel = new Carousel();
homeCarousel.init();
~~~~
Or, pass in an options object:
~~~~
var opts = {
	elementClass: 'front-page-carousel',
	rotateTime: 7000,
	arrows: false
};

const homeCarousel = new Carousel(opts);
homeCarousel.init();
~~~~

## Available Options
The only required option is "elementId." If your DOM element id is different than the default ('carousel'), pass in the id of your DOM element here. Other available options and their defaults are:
~~~~
elementId: 'carousel',
elementClass: 'my-carousel', // Custom CSS class to be appended to carousel DOM elements
autoPlay: true, // Auto play the carousel
rotateTime: 5000, // Time between CSS class swapping
nav: true, // Add nav item for each slide in the carousel
arrows: true, // Add previous/next navigation
activeClass: 'active' // CSS class name for "active" elements in the carousel
~~~~
