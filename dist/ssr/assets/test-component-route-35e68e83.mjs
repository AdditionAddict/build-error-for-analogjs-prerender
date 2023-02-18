import { _ as _createClass, v as _classCallCheck, a as ɵɵdefineComponent, c as ɵɵStandaloneFeature, p as ɵɵelementStart, r as ɵɵtext, q as ɵɵelementEnd } from "../main.server.mjs";
import "zone.js/bundles/zone-node.umd.js";
import "rxjs";
import "rxjs/operators";
import "domino";
import "xhr2";
import "url";
import "tslib";
var TestComponent = /* @__PURE__ */ _createClass(function TestComponent2() {
  _classCallCheck(this, TestComponent2);
});
TestComponent.ɵfac = function TestComponent_Factory(t) {
  return new (t || TestComponent)();
};
TestComponent.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
  type: TestComponent,
  selectors: [["app-test-component"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 2,
  vars: 0,
  template: function TestComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "h1");
      ɵɵtext(1, "Test Component Route");
      ɵɵelementEnd();
    }
  },
  encapsulation: 2
});
(function() {
})();
export {
  TestComponent as default
};
