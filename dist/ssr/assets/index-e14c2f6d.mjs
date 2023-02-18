import { _ as _createClass, a as _classCallCheck, ɵ as ɵɵdefineComponent, b as ɵɵStandaloneFeature, c as ɵɵelementStart, d as ɵɵtext, e as ɵɵelementEnd, f as ɵɵelement, R as RouterLink } from "../main.server.mjs";
import "zone.js/bundles/zone-node.umd.js";
import "rxjs";
import "rxjs/operators";
import "domino";
import "xhr2";
import "url";
import "tslib";
var HomeComponent = /* @__PURE__ */ _createClass(function HomeComponent2() {
  _classCallCheck(this, HomeComponent2);
});
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)();
};
HomeComponent.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
  type: HomeComponent,
  selectors: [["app-home"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 5,
  vars: 0,
  consts: [["routerLink", "/about"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "h1");
      ɵɵtext(1, "Home");
      ɵɵelementEnd();
      ɵɵelementStart(2, "a", 0);
      ɵɵtext(3, "About");
      ɵɵelementEnd();
      ɵɵelement(4, "br");
    }
  },
  dependencies: [RouterLink],
  encapsulation: 2
});
(function() {
})();
export {
  HomeComponent as default
};
