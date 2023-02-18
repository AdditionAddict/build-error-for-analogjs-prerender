import { I as InjectionToken, i as inject, A as ActivatedRoute, ɵ as ɵɵdefineInjectable, a as ɵɵdefineComponent, b as ɵɵNgOnChangesFeature, c as ɵɵStandaloneFeature, d as ɵɵHostDirectivesFeature, e as ɵɵelement, f as ɵɵpipe, g as ɵɵclassMap, h as ɵɵproperty, j as ɵɵpipeBind1, k as AsyncPipe, D as DomSanitizer, P as PLATFORM_ID, l as ɵɵsanitizeHtml, m as ɵɵdefineDirective, n as ɵɵlistener, o as DOCUMENT, L as Location, R as Router } from "../main.server.mjs";
import { of, isObservable, firstValueFrom } from "rxjs";
import { map, switchMap, mergeMap, catchError } from "rxjs/operators";
import { __awaiter } from "tslib";
import fm from "front-matter";
import { marked } from "marked";
import "prismjs";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-typescript.js";
import "zone.js/bundles/zone-node.umd.js";
import "domino";
import "xhr2";
import "url";
const getContentFilesList = () => /* @__PURE__ */ Object.assign({});
const getContentFiles = () => /* @__PURE__ */ Object.assign({});
const CONTENT_FILES_TOKEN = new InjectionToken("@analogjs/content Content Files", {
  providedIn: "root",
  factory() {
    const contentFiles = getContentFiles();
    return contentFiles;
  }
});
function waitFor(prom) {
  return __awaiter(this, void 0, void 0, function* () {
    if (isObservable(prom)) {
      prom = firstValueFrom(prom);
    }
    const macroTask = Zone.current.scheduleMacroTask(`AnalogContentResolve-${Math.random()}`, () => {
    }, {}, () => {
    });
    return prom.then((p) => {
      macroTask.invoke();
      return p;
    });
  });
}
function parseRawContentFile(rawContentFile) {
  const {
    body,
    attributes
  } = fm(rawContentFile);
  return {
    content: body,
    attributes
  };
}
function injectContent(param = "slug", fallback = "No Content Found") {
  const route = inject(ActivatedRoute);
  const contentFiles = inject(CONTENT_FILES_TOKEN);
  return route.paramMap.pipe(map((params) => params.get(param)), switchMap((slug) => {
    const filename = `/src/content/${slug}.md`;
    const contentFile = contentFiles[filename];
    if (!contentFile) {
      return of({
        attributes: {},
        filename,
        slug: slug || "",
        content: fallback
      });
    }
    return new Promise((resolve) => {
      const contentResolver = contentFile();
      {
        waitFor(contentResolver).then((content) => {
          resolve(content);
        });
      }
    }).then((rawContentFile) => {
      const {
        content,
        attributes
      } = parseRawContentFile(rawContentFile);
      return {
        filename,
        slug: slug || "",
        attributes,
        content
      };
    });
  }));
}
function getSlug(filename) {
  const parts = filename.match(/^(\\|\/)(.+(\\|\/))*(.+)\.(.+)$/);
  return (parts === null || parts === void 0 ? void 0 : parts.length) ? parts[4] : "";
}
const CONTENT_FILES_LIST_TOKEN = new InjectionToken("@analogjs/content Content Files List", {
  providedIn: "root",
  factory() {
    const contentFiles = getContentFilesList();
    return Object.keys(contentFiles).map((filename) => {
      const attributes = contentFiles[filename];
      return {
        filename,
        attributes,
        slug: encodeURI(getSlug(filename))
      };
    });
  }
});
function injectContentFiles() {
  return inject(CONTENT_FILES_LIST_TOKEN);
}
let ContentRenderer = /* @__PURE__ */ (() => {
  let ContentRenderer2 = /* @__PURE__ */ (() => {
    class ContentRenderer3 {
      render(content) {
        return __awaiter(this, void 0, void 0, function* () {
          return content;
        });
      }
      // eslint-disable-next-line
      enhance() {
      }
    }
    ContentRenderer3.ɵfac = function ContentRenderer_Factory(t) {
      return new (t || ContentRenderer3)();
    };
    ContentRenderer3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ContentRenderer3,
      factory: ContentRenderer3.ɵfac
    });
    return ContentRenderer3;
  })();
  return ContentRenderer2;
})();
(function() {
})();
let AnchorNavigationDirective = /* @__PURE__ */ (() => {
  let AnchorNavigationDirective2 = /* @__PURE__ */ (() => {
    class AnchorNavigationDirective3 {
      constructor() {
        this.document = inject(DOCUMENT);
        this.location = inject(Location);
        this.router = inject(Router);
      }
      handleNavigation(element) {
        if (element instanceof HTMLAnchorElement && isInternalUrl(element, this.document) && hasTargetSelf(element) && !hasDownloadAttribute(element)) {
          const {
            pathname,
            search,
            hash
          } = element;
          const url = this.location.normalize(`${pathname}${search}${hash}`);
          this.router.navigateByUrl(url);
          return false;
        }
        return true;
      }
    }
    AnchorNavigationDirective3.ɵfac = function AnchorNavigationDirective_Factory(t) {
      return new (t || AnchorNavigationDirective3)();
    };
    AnchorNavigationDirective3.ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
      type: AnchorNavigationDirective3,
      selectors: [["", "analogAnchorNavigation", ""]],
      hostBindings: function AnchorNavigationDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function AnchorNavigationDirective_click_HostBindingHandler($event) {
            return ctx.handleNavigation($event.target);
          });
        }
      },
      standalone: true
    });
    return AnchorNavigationDirective3;
  })();
  return AnchorNavigationDirective2;
})();
(function() {
})();
function hasDownloadAttribute(anchorElement) {
  return anchorElement.getAttribute("download") !== null;
}
function hasTargetSelf(anchorElement) {
  return !anchorElement.target || anchorElement.target === "_self";
}
function isInternalUrl(anchorElement, document) {
  return anchorElement.host === document.location.host && anchorElement.protocol === document.location.protocol;
}
let AnalogMarkdownComponent = /* @__PURE__ */ (() => {
  let AnalogMarkdownComponent2 = /* @__PURE__ */ (() => {
    class AnalogMarkdownComponent3 {
      constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.route = inject(ActivatedRoute);
        this.content$ = of("");
        this.classes = "analog-markdown";
        this.contentRenderer = inject(ContentRenderer);
      }
      ngOnInit() {
        this.updateContent();
      }
      ngOnChanges() {
        this.updateContent();
      }
      updateContent() {
        this.content$ = this.route.data.pipe(map((data) => {
          var _a;
          return (_a = this.content) !== null && _a !== void 0 ? _a : data["_analogContent"];
        }), mergeMap((contentString) => this.renderContent(contentString)), map((content) => this.sanitizer.bypassSecurityTrustHtml(content)), catchError((e) => of(`There was an error ${e}`)));
      }
      renderContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.contentRenderer.render(content);
        });
      }
      ngAfterViewChecked() {
        this.contentRenderer.enhance();
      }
    }
    AnalogMarkdownComponent3.ɵfac = function AnalogMarkdownComponent_Factory(t) {
      return new (t || AnalogMarkdownComponent3)();
    };
    AnalogMarkdownComponent3.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
      type: AnalogMarkdownComponent3,
      selectors: [["analog-markdown"]],
      inputs: {
        content: "content",
        classes: "classes"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature, ɵɵHostDirectivesFeature([AnchorNavigationDirective])],
      decls: 2,
      vars: 5,
      consts: [[3, "innerHTML"]],
      template: function AnalogMarkdownComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "div", 0);
          ɵɵpipe(1, "async");
        }
        if (rf & 2) {
          ɵɵclassMap(ctx.classes);
          ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 3, ctx.content$), ɵɵsanitizeHtml);
        }
      },
      dependencies: [AsyncPipe],
      encapsulation: 2
    });
    return AnalogMarkdownComponent3;
  })();
  return AnalogMarkdownComponent2;
})();
(function() {
})();
const renderer = new marked.Renderer();
renderer.code = function(code, lang) {
  code = this.options.highlight(code, lang);
  if (!lang) {
    return "<pre><code>" + code + "</code></pre>";
  }
  const langClass = "language-" + lang;
  return '<pre class="' + langClass + '"><code class="' + langClass + '">' + code + "</code></pre>";
};
let MarkdownContentRendererService = /* @__PURE__ */ (() => {
  let MarkdownContentRendererService2 = /* @__PURE__ */ (() => {
    class MarkdownContentRendererService3 {
      constructor() {
        this.platformId = inject(PLATFORM_ID);
      }
      render(content) {
        return __awaiter(this, void 0, void 0, function* () {
          marked.setOptions({
            renderer,
            highlight: (code, lang) => {
              lang = lang || "typescript";
              if (!Prism.languages[lang]) {
                console.warn(`Notice:
    ---------------------------------------------------------------------------------------
      The requested language '${lang}' is not available with the provided setup.
      To enable, import your main.ts as:
        import  'prismjs/components/prism-${lang}';
    ---------------------------------------------------------------------------------------
          `);
                return code;
              }
              return Prism.highlight(code, Prism.languages[lang], lang);
            },
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          });
          return marked(content);
        });
      }
      // eslint-disable-next-line
      enhance() {
      }
    }
    MarkdownContentRendererService3.ɵfac = function MarkdownContentRendererService_Factory(t) {
      return new (t || MarkdownContentRendererService3)();
    };
    MarkdownContentRendererService3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: MarkdownContentRendererService3,
      factory: MarkdownContentRendererService3.ɵfac
    });
    return MarkdownContentRendererService3;
  })();
  return MarkdownContentRendererService2;
})();
(function() {
})();
function withMarkdownRenderer() {
  return {
    provide: ContentRenderer,
    useClass: MarkdownContentRendererService
  };
}
function provideContent(...features) {
  return [...features];
}
export {
  ContentRenderer,
  AnalogMarkdownComponent as MarkdownComponent,
  MarkdownContentRendererService,
  injectContent,
  injectContentFiles,
  parseRawContentFile,
  provideContent,
  withMarkdownRenderer
};
