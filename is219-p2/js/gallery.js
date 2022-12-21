// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	const imageHTML = document.getElementById('photo')
	//Access the img element and replace its source
	imageHTML.src = mImages[mCurrentIndex].img;
	//with a new image from your images array which is loaded 
	//from the JSON string
	if(mCurrentIndex >= (mImages.length - 1)){
		mCurrentIndex = 0;
	}
	else{
		mCurrentIndex++;
	}
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();


mRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		mJson = JSON.parse(mRequest.responseText);
		iterateThrough();
    }
};
mRequest.open("GET", mUrl, true);
mRequest.send();

// Array holding GalleryImage objects (see below).





var mImages = [];

// Holds the retrived JSON information
var mJson 

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '../images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	let location = "";
	let description = "";
	let date = "";
	let img = "";
}
function iterateThrough()
{
	for(const currentIndex in mJson.images){
		mImages[currentIndex] = new GalleryImage();
		mImages[currentIndex].img = mJson.images[currentIndex].imgPath;
		mImages[currentIndex].description = mJson.images[currentImages].description
		mImages[currentIndex].location = mJson.images[currentIndex].imgLocation;
		mImages[currentIndex].date = mJson.images[currentIndex].date;
	}
}
