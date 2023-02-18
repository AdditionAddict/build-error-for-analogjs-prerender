import { _ as _createClass, a as ɵɵdefineComponent, c as ɵɵStandaloneFeature, p as ɵɵelementStart, e as ɵɵelement, q as ɵɵelementEnd, r as ɵɵtext, n as ɵɵlistener, s as ɵɵadvance, t as ɵɵtextInterpolate1, u as RouterLink, v as _classCallCheck } from "../main.server.mjs";
import "zone.js/bundles/zone-node.umd.js";
import "rxjs";
import "rxjs/operators";
import "domino";
import "xhr2";
import "url";
import "tslib";
var HomeComponent = /* @__PURE__ */ function() {
  function HomeComponent2() {
    _classCallCheck(this, HomeComponent2);
    this.count = 0;
  }
  _createClass(HomeComponent2, [{
    key: "increment",
    value: function increment() {
      this.count++;
    }
  }]);
  return HomeComponent2;
}();
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)();
};
HomeComponent.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
  type: HomeComponent,
  selectors: [["app-home"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 19,
  vars: 1,
  consts: [["href", "https://vitejs.dev", "target", "_blank"], ["src", "/vite.svg", "alt", "Vite logo", 1, "logo"], ["href", "https://angular.io/", "target", "_blank"], ["alt", "Angular Logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==", 1, "logo", "angular"], ["routerLink", "/test-component-route"], [1, "card"], ["type", "button", 3, "click"], ["href", "https://github.com/analogjs/analog#readme", "target", "_blank"], [1, "read-the-docs"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div")(1, "a", 0);
      ɵɵelement(2, "img", 1);
      ɵɵelementEnd();
      ɵɵelementStart(3, "a", 2);
      ɵɵelement(4, "img", 3);
      ɵɵelementEnd()();
      ɵɵelementStart(5, "h1");
      ɵɵtext(6, "Vite + Angular");
      ɵɵelementEnd();
      ɵɵelementStart(7, "a", 4);
      ɵɵtext(8, "Test Component Route");
      ɵɵelementEnd();
      ɵɵelementStart(9, "div", 5)(10, "button", 6);
      ɵɵlistener("click", function HomeComponent_Template_button_click_10_listener() {
        return ctx.increment();
      });
      ɵɵtext(11);
      ɵɵelementEnd()();
      ɵɵelementStart(12, "p");
      ɵɵtext(13, " Check out ");
      ɵɵelementStart(14, "a", 7);
      ɵɵtext(15, "Analog");
      ɵɵelementEnd();
      ɵɵtext(16, ", the fullstack meta-framework for Angular powered by Vite! ");
      ɵɵelementEnd();
      ɵɵelementStart(17, "p", 8);
      ɵɵtext(18, " Click on the Vite and Angular logos to learn more. ");
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance(11);
      ɵɵtextInterpolate1("Count ", ctx.count, "");
    }
  },
  dependencies: [RouterLink],
  styles: [".logo[_ngcontent-%COMP%] {\n        height: 6em;\n        padding: 1.5em;\n        will-change: filter;\n      }\n      .logo[_ngcontent-%COMP%]:hover {\n        filter: drop-shadow(0 0 2em #646cffaa);\n      }\n      .logo.angular[_ngcontent-%COMP%]:hover {\n        filter: drop-shadow(0 0 2em #42b883aa);\n      }\n      .read-the-docs[_ngcontent-%COMP%] {\n        color: #888;\n      }"]
});
(function() {
})();
export {
  HomeComponent as default
};
