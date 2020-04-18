import { Component } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid Tracker';

  ngOnInit() {
    this.scrollTop();
    this.initiateStyleOnClick();
    this.navbarCollapseOnClick();
  }

  navbarCollapseOnClick(): void {
    $(function(){
      let navMain = $('.navbar-collapse > .navbar-nav');  // avoid dependency on #id
      navMain.on("click",  null, function () {
        $('.navbar-collapse').collapse('hide');
      });
    });
  }

  initiateStyleOnClick(): void {
    $(document).on('click', "[routerLink='/home']", function () {
      document.querySelector(".text").classList.add("spaced");
    });
  }

  scrollTop() {
    $(document).on('click', ".router", function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
