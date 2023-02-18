import { _ as _createClass, a as _classCallCheck, ɵ as ɵɵdefineComponent, b as ɵɵStandaloneFeature, c as ɵɵelementStart, d as ɵɵtext, e as ɵɵelementEnd, f as ɵɵelement, R as RouterLink } from "../main.server.mjs";
import "zone.js/bundles/zone-node.umd.js";
import "rxjs";
import "rxjs/operators";
import "domino";
import "xhr2";
import "url";
import "tslib";
var AboutComponent = /* @__PURE__ */ _createClass(function AboutComponent2() {
  _classCallCheck(this, AboutComponent2);
});
AboutComponent.ɵfac = function AboutComponent_Factory(t) {
  return new (t || AboutComponent)();
};
AboutComponent.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
  type: AboutComponent,
  selectors: [["ng-component"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 5,
  vars: 0,
  consts: [["routerLink", "/"]],
  template: function AboutComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "h1");
      ɵɵtext(1, "About");
      ɵɵelementEnd();
      ɵɵelementStart(2, "a", 0);
      ɵɵtext(3, "Home");
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
  AboutComponent as default
};
