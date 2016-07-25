document.addEventListener("DOMContentLoaded", function() {
  var opt1 = {selector:".round-1 .round-slider>img", data:["img/round-slider-1/1.jpg", "img/round-slider-1/2.jpg", "img/round-slider-1/1.jpg"], but_next:".round-1 .but-left", but_prev:".round-1 .but-right"};
  var opt2 = {selector:".round-2 .round-slider>img", data:["img/round-slider-2/1.jpg", "img/round-slider-2/2.jpg", "img/round-slider-2/1.jpg"], but_next:".round-2 .but-left", but_prev:".round-2 .but-right"};
  var round1, round2;
  var slider = {data:["img/top_slider/1.jpg", "img/top_slider/2.jpg", "img/top_slider/1.jpg", "img/top_slider/2.jpg"], img:document.querySelector(".slide img"), controls:Array.prototype.slice.call(document.querySelectorAll(".control"), 0) || null, current:0, setSlide:function(image) {
    this.img.setAttribute("src", image);
  }, next:function(data) {
    this.current += 1;
    if (this.current === this.data.length) {
      this.current = 0;
    }
    this.img.style.transform = "rotateX(90deg)";
    setTimeout(function() {
      slider.setSlide(slider.data[slider.current]);
      slider.img.style.transform = "rotateX(0deg)";
    }, 1E3);
  }, prev:function(data) {
    this.current -= 1;
    if (this.current < 0) {
      this.current = this.data.length - 1;
    }
    this.img.style.transform = "rotateX(90deg)";
    setTimeout(function() {
      slider.setSlide(slider.data[slider.current]);
      slider.img.style.transform = "rotateX(0deg)";
    }, 1E3);
  }, slide:function() {
    var timer = setTimeout(function frame() {
      slider.next();
      timer = setTimeout(frame, 5E3);
    }, 5E3);
  }, init:function() {
    this.setSlide(this.data[this.current]);
    this.slide();
    if (this.controls) {
      this.controls.forEach(function(item, i, arr) {
        item.addEventListener("click", function(e) {
          if (e.target.classList.contains("next")) {
            slider.next();
          } else {
            if (e.target.classList.contains("prev")) {
              slider.prev();
            }
          }
        });
      });
    }
  }};
  var Small_slider = function(opt) {
    this.img = document.querySelector(opt.selector);
    this.data = opt.data;
    this.but_next = document.querySelector(opt.but_next);
    this.but_prev = document.querySelector(opt.but_prev);
    var current = 0;
    this.frame = function(img) {
      this.img.setAttribute("src", img);
    };
    this.init = function() {
      this.frame(this.data[current], this);
      this.but_next.addEventListener("click", function(e) {
        current += 1;
        if (current === opt.data.length) {
          current = 0;
        }
        document.querySelector(opt.selector).style.transform = "rotateX(90deg)";
        var clock = setTimeout(function() {
          document.querySelector(opt.selector).setAttribute("src", opt.data[current]);
          document.querySelector(opt.selector).style.transform = "rotateX(0deg)";
        }, 450);
      });
      this.but_prev.addEventListener("click", function() {
        current -= 1;
        if (current < 0) {
          current = opt.data.length - 1;
        }
        document.querySelector(opt.selector).style.transform = "rotateY(90deg)";
        var clock = setTimeout(function() {
          document.querySelector(opt.selector).setAttribute("src", opt.data[current]);
          document.querySelector(opt.selector).style.transform = "rotateY(0deg)";
        }, 450);
      });
    };
  };
  round1 = new Small_slider(opt1);
  round2 = new Small_slider(opt2);
  round1.init();
  round2.init();
  slider.init();
  //табы
  (function(){
	  var nav = Array.prototype.slice.call(document.querySelectorAll(".tab-nav div"));
	  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs section"));
	  var accordHeaders = Array.prototype.slice.call(document.querySelectorAll(".tabs section span"));
	  console.log(nav);
	  nav.forEach(function(item,i,arr){
		 item.addEventListener('click',function(e){
			console.log(this) ;
			document.querySelector(".tab-nav div.active").classList.remove("active");
			this.classList.add("active");
			document.querySelector(".tabs section.active").classList.remove("active");			
			tabs[i].classList.add("active");
		 });
	  });
	  accordHeaders.forEach(function(item,i,arr){
		  item.addEventListener('click',function(e){
			  if(this.parentNode.classList.contains("active")){
				this.parentNode.classList.remove("active")
			  } else if(document.querySelector(".tabs section.active")){
				  document.querySelector(".tabs section.active").classList.remove("active");
				  this.parentNode.classList.add("active");
			  } else {
				  this.parentNode.classList.add("active");
			  }
			  
			  
		  });
	  });
  })();
  // мобильное меню
  (function(){
	  var trigger = document.querySelector('.nav-icon');
	  var menu = document.querySelector('.nav ul');
	  trigger.addEventListener('click',function(e){
		  if(this.classList.contains('close')){
			  this.classList.remove('close');
			  menu.classList.remove('active');
		  } else {
			  this.classList.add('close');
			  menu.classList.add('active');
		  }
	  });
  })();
  // модальное окно с большой картинкой
  (function(){
	  var modal = document.querySelector('.modal');
	  var image = document.querySelector('.quality .left>img');
	  var close = document.querySelector('.modal .icon-close');
	  var src = image.getAttribute('data-big');
	  var string = '';
	  image.addEventListener('click',function(){
		  string ='<img src="' + src + '" alt="" width="327" height="475">'
		  modal.innerHTML += string;
		  modal.classList.add('show');		  
	  });
	  modal.addEventListener('click',function(){
		  this.innerHTML = '';
		  this.classList.remove('show');
	  });
  })();
});

















