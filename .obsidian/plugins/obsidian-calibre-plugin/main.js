/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/ip/lib/ip.js
var require_ip = __commonJS({
  "node_modules/ip/lib/ip.js"(exports) {
    var ip2 = exports;
    var { Buffer: Buffer2 } = require("buffer");
    var os = require("os");
    ip2.toBuffer = function(ip3, buff, offset) {
      offset = ~~offset;
      var result;
      if (this.isV4Format(ip3)) {
        result = buff || new Buffer2(offset + 4);
        ip3.split(/\./g).map((byte) => {
          result[offset++] = parseInt(byte, 10) & 255;
        });
      } else if (this.isV6Format(ip3)) {
        var sections = ip3.split(":", 8);
        var i;
        for (i = 0; i < sections.length; i++) {
          var isv4 = this.isV4Format(sections[i]);
          var v4Buffer;
          if (isv4) {
            v4Buffer = this.toBuffer(sections[i]);
            sections[i] = v4Buffer.slice(0, 2).toString("hex");
          }
          if (v4Buffer && ++i < 8) {
            sections.splice(i, 0, v4Buffer.slice(2, 4).toString("hex"));
          }
        }
        if (sections[0] === "") {
          while (sections.length < 8)
            sections.unshift("0");
        } else if (sections[sections.length - 1] === "") {
          while (sections.length < 8)
            sections.push("0");
        } else if (sections.length < 8) {
          for (i = 0; i < sections.length && sections[i] !== ""; i++)
            ;
          var argv = [i, 1];
          for (i = 9 - sections.length; i > 0; i--) {
            argv.push("0");
          }
          sections.splice.apply(sections, argv);
        }
        result = buff || new Buffer2(offset + 16);
        for (i = 0; i < sections.length; i++) {
          var word = parseInt(sections[i], 16);
          result[offset++] = word >> 8 & 255;
          result[offset++] = word & 255;
        }
      }
      if (!result) {
        throw Error(`Invalid ip address: ${ip3}`);
      }
      return result;
    };
    ip2.toString = function(buff, offset, length) {
      offset = ~~offset;
      length = length || buff.length - offset;
      var result = [];
      var i;
      if (length === 4) {
        for (i = 0; i < length; i++) {
          result.push(buff[offset + i]);
        }
        result = result.join(".");
      } else if (length === 16) {
        for (i = 0; i < length; i += 2) {
          result.push(buff.readUInt16BE(offset + i).toString(16));
        }
        result = result.join(":");
        result = result.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3");
        result = result.replace(/:{3,4}/, "::");
      }
      return result;
    };
    var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
    var ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
    ip2.isV4Format = function(ip3) {
      return ipv4Regex.test(ip3);
    };
    ip2.isV6Format = function(ip3) {
      return ipv6Regex.test(ip3);
    };
    function _normalizeFamily(family) {
      if (family === 4) {
        return "ipv4";
      }
      if (family === 6) {
        return "ipv6";
      }
      return family ? family.toLowerCase() : "ipv4";
    }
    ip2.fromPrefixLen = function(prefixlen, family) {
      if (prefixlen > 32) {
        family = "ipv6";
      } else {
        family = _normalizeFamily(family);
      }
      var len = 4;
      if (family === "ipv6") {
        len = 16;
      }
      var buff = new Buffer2(len);
      for (var i = 0, n = buff.length; i < n; ++i) {
        var bits = 8;
        if (prefixlen < 8) {
          bits = prefixlen;
        }
        prefixlen -= bits;
        buff[i] = ~(255 >> bits) & 255;
      }
      return ip2.toString(buff);
    };
    ip2.mask = function(addr, mask) {
      addr = ip2.toBuffer(addr);
      mask = ip2.toBuffer(mask);
      var result = new Buffer2(Math.max(addr.length, mask.length));
      var i;
      if (addr.length === mask.length) {
        for (i = 0; i < addr.length; i++) {
          result[i] = addr[i] & mask[i];
        }
      } else if (mask.length === 4) {
        for (i = 0; i < mask.length; i++) {
          result[i] = addr[addr.length - 4 + i] & mask[i];
        }
      } else {
        for (i = 0; i < result.length - 6; i++) {
          result[i] = 0;
        }
        result[10] = 255;
        result[11] = 255;
        for (i = 0; i < addr.length; i++) {
          result[i + 12] = addr[i] & mask[i + 12];
        }
        i += 12;
      }
      for (; i < result.length; i++) {
        result[i] = 0;
      }
      return ip2.toString(result);
    };
    ip2.cidr = function(cidrString) {
      var cidrParts = cidrString.split("/");
      var addr = cidrParts[0];
      if (cidrParts.length !== 2) {
        throw new Error(`invalid CIDR subnet: ${addr}`);
      }
      var mask = ip2.fromPrefixLen(parseInt(cidrParts[1], 10));
      return ip2.mask(addr, mask);
    };
    ip2.subnet = function(addr, mask) {
      var networkAddress = ip2.toLong(ip2.mask(addr, mask));
      var maskBuffer = ip2.toBuffer(mask);
      var maskLength = 0;
      for (var i = 0; i < maskBuffer.length; i++) {
        if (maskBuffer[i] === 255) {
          maskLength += 8;
        } else {
          var octet = maskBuffer[i] & 255;
          while (octet) {
            octet = octet << 1 & 255;
            maskLength++;
          }
        }
      }
      var numberOfAddresses = Math.pow(2, 32 - maskLength);
      return {
        networkAddress: ip2.fromLong(networkAddress),
        firstAddress: numberOfAddresses <= 2 ? ip2.fromLong(networkAddress) : ip2.fromLong(networkAddress + 1),
        lastAddress: numberOfAddresses <= 2 ? ip2.fromLong(networkAddress + numberOfAddresses - 1) : ip2.fromLong(networkAddress + numberOfAddresses - 2),
        broadcastAddress: ip2.fromLong(networkAddress + numberOfAddresses - 1),
        subnetMask: mask,
        subnetMaskLength: maskLength,
        numHosts: numberOfAddresses <= 2 ? numberOfAddresses : numberOfAddresses - 2,
        length: numberOfAddresses,
        contains(other) {
          return networkAddress === ip2.toLong(ip2.mask(other, mask));
        }
      };
    };
    ip2.cidrSubnet = function(cidrString) {
      var cidrParts = cidrString.split("/");
      var addr = cidrParts[0];
      if (cidrParts.length !== 2) {
        throw new Error(`invalid CIDR subnet: ${addr}`);
      }
      var mask = ip2.fromPrefixLen(parseInt(cidrParts[1], 10));
      return ip2.subnet(addr, mask);
    };
    ip2.not = function(addr) {
      var buff = ip2.toBuffer(addr);
      for (var i = 0; i < buff.length; i++) {
        buff[i] = 255 ^ buff[i];
      }
      return ip2.toString(buff);
    };
    ip2.or = function(a, b) {
      var i;
      a = ip2.toBuffer(a);
      b = ip2.toBuffer(b);
      if (a.length === b.length) {
        for (i = 0; i < a.length; ++i) {
          a[i] |= b[i];
        }
        return ip2.toString(a);
      }
      var buff = a;
      var other = b;
      if (b.length > a.length) {
        buff = b;
        other = a;
      }
      var offset = buff.length - other.length;
      for (i = offset; i < buff.length; ++i) {
        buff[i] |= other[i - offset];
      }
      return ip2.toString(buff);
    };
    ip2.isEqual = function(a, b) {
      var i;
      a = ip2.toBuffer(a);
      b = ip2.toBuffer(b);
      if (a.length === b.length) {
        for (i = 0; i < a.length; i++) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      }
      if (b.length === 4) {
        var t = b;
        b = a;
        a = t;
      }
      for (i = 0; i < 10; i++) {
        if (b[i] !== 0)
          return false;
      }
      var word = b.readUInt16BE(10);
      if (word !== 0 && word !== 65535)
        return false;
      for (i = 0; i < 4; i++) {
        if (a[i] !== b[i + 12])
          return false;
      }
      return true;
    };
    ip2.isPrivate = function(addr) {
      return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^f[cd][0-9a-f]{2}:/i.test(addr) || /^fe80:/i.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
    };
    ip2.isPublic = function(addr) {
      return !ip2.isPrivate(addr);
    };
    ip2.isLoopback = function(addr) {
      return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(addr) || /^fe80::1$/.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
    };
    ip2.loopback = function(family) {
      family = _normalizeFamily(family);
      if (family !== "ipv4" && family !== "ipv6") {
        throw new Error("family must be ipv4 or ipv6");
      }
      return family === "ipv4" ? "127.0.0.1" : "fe80::1";
    };
    ip2.address = function(name, family) {
      var interfaces = os.networkInterfaces();
      family = _normalizeFamily(family);
      if (name && name !== "private" && name !== "public") {
        var res = interfaces[name].filter((details) => {
          var itemFamily = _normalizeFamily(details.family);
          return itemFamily === family;
        });
        if (res.length === 0) {
          return void 0;
        }
        return res[0].address;
      }
      var all = Object.keys(interfaces).map((nic) => {
        var addresses = interfaces[nic].filter((details) => {
          details.family = _normalizeFamily(details.family);
          if (details.family !== family || ip2.isLoopback(details.address)) {
            return false;
          }
          if (!name) {
            return true;
          }
          return name === "public" ? ip2.isPrivate(details.address) : ip2.isPublic(details.address);
        });
        return addresses.length ? addresses[0].address : void 0;
      }).filter(Boolean);
      return !all.length ? ip2.loopback(family) : all[0];
    };
    ip2.toLong = function(ip3) {
      var ipl = 0;
      ip3.split(".").forEach((octet) => {
        ipl <<= 8;
        ipl += parseInt(octet);
      });
      return ipl >>> 0;
    };
    ip2.fromLong = function(ipl) {
      return `${ipl >>> 24}.${ipl >> 16 & 255}.${ipl >> 8 & 255}.${ipl & 255}`;
    };
  }
});

// src/main.tsx
__export(exports, {
  default: () => CalibrePlugin
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/CalibreView.tsx
var import_obsidian = __toModule(require("obsidian"));
var ip = __toModule(require_ip());
var CALIBRE_VIEW_TYPE = "calibre-view";
var CalibreView = class extends import_obsidian.ItemView {
  constructor(leaf, settings) {
    super(leaf);
    this.settings = settings;
  }
  getViewType() {
    return CALIBRE_VIEW_TYPE;
  }
  getDisplayText() {
    return this.settings.displayText;
  }
  onOpen() {
    return __async(this, null, function* () {
      const container = this.containerEl.children[1];
      try {
        const iframe = container.createEl("iframe");
        iframe.setAttribute("sandbox", "allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-downloads allow-popups");
        iframe.src = this.settings.replaceLocalIp ? this.settings.address.replace("localhost", ip.address()) : this.settings.address;
      } catch (e) {
        console.error(e);
        const error = container.createDiv({ text: e.toString() });
        error.style.color = "var(--text-title-h1)";
      }
    });
  }
  onClose() {
    return __async(this, null, function* () {
    });
  }
};

// src/settings.tsx
var import_obsidian2 = __toModule(require("obsidian"));

// src/tools.ts
var CALIBRE_ICON_ID = "calibre";
var CALIBRE_ICON_SVG = `
<g transform="translate(-24.920761,-148.42979)">
	<image width="100" height="100" preserveAspectRatio="none" xlink:href="data:image/png;base64,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
	/55ysxEAAAAASUVORK5CYII=" x="24.920761" y="148.42979"/>
</g>`;

// src/settings.tsx
var DEBOUNCE_TIMEOUT = 1e3;
var DEFAULT_SETTINGS = {
  address: "http://localhost:8080",
  displayText: "CALIBRE",
  splitDirection: "horizontal",
  ribbonIcon: CALIBRE_ICON_ID,
  hideRibbonIcon: false,
  replaceLocalIp: true
};
var CalibreSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Calibre Settings" });
    new import_obsidian2.Setting(containerEl).setName("Server Address").setDesc("The address of calibre Content server.").addText((text) => {
      text.inputEl.size = 25;
      text.setPlaceholder(DEFAULT_SETTINGS.address).setValue(this.plugin.settings.address).onChange((0, import_obsidian2.debounce)((value) => __async(this, null, function* () {
        this.plugin.settings.address = value;
        this.plugin.saveData(this.plugin.settings);
      }), DEBOUNCE_TIMEOUT));
    });
    new import_obsidian2.Setting(containerEl).setName("Use the local IP address instead of 'localhost'").addToggle((toggle) => toggle.setValue(this.plugin.settings.replaceLocalIp).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.replaceLocalIp = value;
      this.plugin.saveData(this.plugin.settings);
    })));
    new import_obsidian2.Setting(containerEl).setName("View Display Text").setDesc("The title of calibre view.").addText((text) => {
      text.inputEl.size = 25;
      text.setPlaceholder(DEFAULT_SETTINGS.displayText).setValue(this.plugin.settings.displayText).onChange((0, import_obsidian2.debounce)((value) => __async(this, null, function* () {
        this.plugin.settings.displayText = value;
        this.plugin.saveData(this.plugin.settings);
      }), DEBOUNCE_TIMEOUT));
    });
    new import_obsidian2.Setting(containerEl).setName("Split Direction").addDropdown((dropdown) => dropdown.addOption("horizontal", "Horizontal").addOption("vertical", "Vertical").setValue(this.plugin.settings.splitDirection).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.splitDirection = value;
      this.plugin.saveData(this.plugin.settings);
    })));
    new import_obsidian2.Setting(containerEl).setName("Hide Ribbon Icon").addToggle((toggle) => toggle.setValue(this.plugin.settings.hideRibbonIcon).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.hideRibbonIcon = value;
      this.plugin.saveData(this.plugin.settings);
    })));
    new import_obsidian2.Setting(containerEl).setName("Ribbon Icon").setDesc("The icon name to be used.").addText((text) => text.setValue(this.plugin.settings.ribbonIcon).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.ribbonIcon = value;
      this.plugin.saveData(this.plugin.settings);
    })));
    if (import_obsidian2.Platform.isDesktopApp) {
      const donation = containerEl.createDiv({ cls: "calibre-donation" });
      donation.createEl("p", { text: "Make a donation to support Calibre plugin development." });
      const link = donation.createEl("a", { href: "https://paypal.me/caronchenhz", cls: "paypal" });
      const img = link.createEl("img");
      img.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTI0cHgiIGhlaWdodD0iMzNweCIgdmlld0JveD0iMCAwIDEyNCAzMyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTI0IDMzIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiMyNTNCODAiIGQ9Ik00Ni4yMTEsNi43NDloLTYuODM5Yy0wLjQ2OCwwLTAuODY2LDAuMzQtMC45MzksMC44MDJsLTIuNzY2LDE3LjUzN2MtMC4wNTUsMC4zNDYsMC4yMTMsMC42NTgsMC41NjQsMC42NTgNCgloMy4yNjVjMC40NjgsMCwwLjg2Ni0wLjM0LDAuOTM5LTAuODAzbDAuNzQ2LTQuNzNjMC4wNzItMC40NjMsMC40NzEtMC44MDMsMC45MzgtMC44MDNoMi4xNjVjNC41MDUsMCw3LjEwNS0yLjE4LDcuNzg0LTYuNQ0KCWMwLjMwNi0xLjg5LDAuMDEzLTMuMzc1LTAuODcyLTQuNDE1QzUwLjIyNCw3LjM1Myw0OC41LDYuNzQ5LDQ2LjIxMSw2Ljc0OXogTTQ3LDEzLjE1NGMtMC4zNzQsMi40NTQtMi4yNDksMi40NTQtNC4wNjIsMi40NTQNCgloLTEuMDMybDAuNzI0LTQuNTgzYzAuMDQzLTAuMjc3LDAuMjgzLTAuNDgxLDAuNTYzLTAuNDgxaDAuNDczYzEuMjM1LDAsMi40LDAsMy4wMDIsMC43MDRDNDcuMDI3LDExLjY2OCw0Ny4xMzcsMTIuMjkyLDQ3LDEzLjE1NHoiDQoJLz4NCjxwYXRoIGZpbGw9IiMyNTNCODAiIGQ9Ik02Ni42NTQsMTMuMDc1aC0zLjI3NWMtMC4yNzksMC0wLjUyLDAuMjA0LTAuNTYzLDAuNDgxbC0wLjE0NSwwLjkxNmwtMC4yMjktMC4zMzINCgljLTAuNzA5LTEuMDI5LTIuMjktMS4zNzMtMy44NjgtMS4zNzNjLTMuNjE5LDAtNi43MSwyLjc0MS03LjMxMiw2LjU4NmMtMC4zMTMsMS45MTgsMC4xMzIsMy43NTIsMS4yMiw1LjAzMQ0KCWMwLjk5OCwxLjE3NiwyLjQyNiwxLjY2Niw0LjEyNSwxLjY2NmMyLjkxNiwwLDQuNTMzLTEuODc1LDQuNTMzLTEuODc1bC0wLjE0NiwwLjkxYy0wLjA1NSwwLjM0OCwwLjIxMywwLjY2LDAuNTYyLDAuNjZoMi45NQ0KCWMwLjQ2OSwwLDAuODY1LTAuMzQsMC45MzktMC44MDNsMS43Ny0xMS4yMDlDNjcuMjcxLDEzLjM4OCw2Ny4wMDQsMTMuMDc1LDY2LjY1NCwxMy4wNzV6IE02Mi4wODksMTkuNDQ5DQoJYy0wLjMxNiwxLjg3MS0xLjgwMSwzLjEyNy0zLjY5NSwzLjEyN2MtMC45NTEsMC0xLjcxMS0wLjMwNS0yLjE5OS0wLjg4M2MtMC40ODQtMC41NzQtMC42NjgtMS4zOTEtMC41MTQtMi4zMDENCgljMC4yOTUtMS44NTUsMS44MDUtMy4xNTIsMy42Ny0zLjE1MmMwLjkzLDAsMS42ODYsMC4zMDksMi4xODQsMC44OTJDNjIuMDM0LDE3LjcyMSw2Mi4yMzIsMTguNTQzLDYyLjA4OSwxOS40NDl6Ii8+DQo8cGF0aCBmaWxsPSIjMjUzQjgwIiBkPSJNODQuMDk2LDEzLjA3NWgtMy4yOTFjLTAuMzE0LDAtMC42MDksMC4xNTYtMC43ODcsMC40MTdsLTQuNTM5LDYuNjg2bC0xLjkyNC02LjQyNQ0KCWMtMC4xMjEtMC40MDItMC40OTItMC42NzgtMC45MTItMC42NzhoLTMuMjM0Yy0wLjM5MywwLTAuNjY2LDAuMzg0LTAuNTQxLDAuNzU0bDMuNjI1LDEwLjYzOGwtMy40MDgsNC44MTENCgljLTAuMjY4LDAuMzc5LDAuMDAyLDAuOSwwLjQ2NSwwLjloMy4yODdjMC4zMTIsMCwwLjYwNC0wLjE1MiwwLjc4MS0wLjQwOEw4NC41NjQsMTMuOTdDODQuODI2LDEzLjU5Miw4NC41NTcsMTMuMDc1LDg0LjA5NiwxMy4wNzV6DQoJIi8+DQo8cGF0aCBmaWxsPSIjMTc5QkQ3IiBkPSJNOTQuOTkyLDYuNzQ5aC02Ljg0Yy0wLjQ2NywwLTAuODY1LDAuMzQtMC45MzgsMC44MDJsLTIuNzY2LDE3LjUzN2MtMC4wNTUsMC4zNDYsMC4yMTMsMC42NTgsMC41NjIsMC42NTgNCgloMy41MWMwLjMyNiwwLDAuNjA1LTAuMjM4LDAuNjU2LTAuNTYybDAuNzg1LTQuOTcxYzAuMDcyLTAuNDYzLDAuNDcxLTAuODAzLDAuOTM4LTAuODAzaDIuMTY0YzQuNTA2LDAsNy4xMDUtMi4xOCw3Ljc4NS02LjUNCgljMC4zMDctMS44OSwwLjAxMi0zLjM3NS0wLjg3My00LjQxNUM5OS4wMDQsNy4zNTMsOTcuMjgxLDYuNzQ5LDk0Ljk5Miw2Ljc0OXogTTk1Ljc4MSwxMy4xNTRjLTAuMzczLDIuNDU0LTIuMjQ4LDIuNDU0LTQuMDYyLDIuNDU0DQoJaC0xLjAzMWwwLjcyNS00LjU4M2MwLjA0My0wLjI3NywwLjI4MS0wLjQ4MSwwLjU2Mi0wLjQ4MWgwLjQ3M2MxLjIzNCwwLDIuNCwwLDMuMDAyLDAuNzA0DQoJQzk1LjgwOSwxMS42NjgsOTUuOTE4LDEyLjI5Miw5NS43ODEsMTMuMTU0eiIvPg0KPHBhdGggZmlsbD0iIzE3OUJENyIgZD0iTTExNS40MzQsMTMuMDc1aC0zLjI3M2MtMC4yODEsMC0wLjUyLDAuMjA0LTAuNTYyLDAuNDgxbC0wLjE0NSwwLjkxNmwtMC4yMy0wLjMzMg0KCWMtMC43MDktMS4wMjktMi4yODktMS4zNzMtMy44NjctMS4zNzNjLTMuNjE5LDAtNi43MDksMi43NDEtNy4zMTEsNi41ODZjLTAuMzEyLDEuOTE4LDAuMTMxLDMuNzUyLDEuMjE5LDUuMDMxDQoJYzEsMS4xNzYsMi40MjYsMS42NjYsNC4xMjUsMS42NjZjMi45MTYsMCw0LjUzMy0xLjg3NSw0LjUzMy0xLjg3NWwtMC4xNDYsMC45MWMtMC4wNTUsMC4zNDgsMC4yMTMsMC42NiwwLjU2NCwwLjY2aDIuOTQ5DQoJYzAuNDY3LDAsMC44NjUtMC4zNCwwLjkzOC0wLjgwM2wxLjc3MS0xMS4yMDlDMTE2LjA1MywxMy4zODgsMTE1Ljc4NSwxMy4wNzUsMTE1LjQzNCwxMy4wNzV6IE0xMTAuODY5LDE5LjQ0OQ0KCWMtMC4zMTQsMS44NzEtMS44MDEsMy4xMjctMy42OTUsMy4xMjdjLTAuOTQ5LDAtMS43MTEtMC4zMDUtMi4xOTktMC44ODNjLTAuNDg0LTAuNTc0LTAuNjY2LTEuMzkxLTAuNTE0LTIuMzAxDQoJYzAuMjk3LTEuODU1LDEuODA1LTMuMTUyLDMuNjctMy4xNTJjMC45MywwLDEuNjg2LDAuMzA5LDIuMTg0LDAuODkyQzExMC44MTYsMTcuNzIxLDExMS4wMTQsMTguNTQzLDExMC44NjksMTkuNDQ5eiIvPg0KPHBhdGggZmlsbD0iIzE3OUJENyIgZD0iTTExOS4yOTUsNy4yM2wtMi44MDcsMTcuODU4Yy0wLjA1NSwwLjM0NiwwLjIxMywwLjY1OCwwLjU2MiwwLjY1OGgyLjgyMmMwLjQ2OSwwLDAuODY3LTAuMzQsMC45MzktMC44MDMNCglsMi43NjgtMTcuNTM2YzAuMDU1LTAuMzQ2LTAuMjEzLTAuNjU5LTAuNTYyLTAuNjU5aC0zLjE2QzExOS41NzgsNi43NDksMTE5LjMzOCw2Ljk1MywxMTkuMjk1LDcuMjN6Ii8+DQo8cGF0aCBmaWxsPSIjMjUzQjgwIiBkPSJNNy4yNjYsMjkuMTU0bDAuNTIzLTMuMzIybC0xLjE2NS0wLjAyN0gxLjA2MUw0LjkyNywxLjI5MkM0LjkzOSwxLjIxOCw0Ljk3OCwxLjE0OSw1LjAzNSwxLjENCgljMC4wNTctMC4wNDksMC4xMy0wLjA3NiwwLjIwNi0wLjA3Nmg5LjM4YzMuMTE0LDAsNS4yNjMsMC42NDgsNi4zODUsMS45MjdjMC41MjYsMC42LDAuODYxLDEuMjI3LDEuMDIzLDEuOTE3DQoJYzAuMTcsMC43MjQsMC4xNzMsMS41ODksMC4wMDcsMi42NDRsLTAuMDEyLDAuMDc3djAuNjc2bDAuNTI2LDAuMjk4YzAuNDQzLDAuMjM1LDAuNzk1LDAuNTA0LDEuMDY1LDAuODEyDQoJYzAuNDUsMC41MTMsMC43NDEsMS4xNjUsMC44NjQsMS45MzhjMC4xMjcsMC43OTUsMC4wODUsMS43NDEtMC4xMjMsMi44MTJjLTAuMjQsMS4yMzItMC42MjgsMi4zMDUtMS4xNTIsMy4xODMNCgljLTAuNDgyLDAuODA5LTEuMDk2LDEuNDgtMS44MjUsMmMtMC42OTYsMC40OTQtMS41MjMsMC44NjktMi40NTgsMS4xMDljLTAuOTA2LDAuMjM2LTEuOTM5LDAuMzU1LTMuMDcyLDAuMzU1aC0wLjczDQoJYy0wLjUyMiwwLTEuMDI5LDAuMTg4LTEuNDI3LDAuNTI1Yy0wLjM5OSwwLjM0NC0wLjY2MywwLjgxNC0wLjc0NCwxLjMyOGwtMC4wNTUsMC4yOTlsLTAuOTI0LDUuODU1bC0wLjA0MiwwLjIxNQ0KCWMtMC4wMTEsMC4wNjgtMC4wMywwLjEwMi0wLjA1OCwwLjEyNWMtMC4wMjUsMC4wMjEtMC4wNjEsMC4wMzUtMC4wOTYsMC4wMzVINy4yNjZ6Ii8+DQo8cGF0aCBmaWxsPSIjMTc5QkQ3IiBkPSJNMjMuMDQ4LDcuNjY3TDIzLjA0OCw3LjY2N0wyMy4wNDgsNy42NjdjLTAuMDI4LDAuMTc5LTAuMDYsMC4zNjItMC4wOTYsMC41NQ0KCWMtMS4yMzcsNi4zNTEtNS40NjksOC41NDUtMTAuODc0LDguNTQ1SDkuMzI2Yy0wLjY2MSwwLTEuMjE4LDAuNDgtMS4zMjEsMS4xMzJsMCwwbDAsMEw2LjU5NiwyNi44M2wtMC4zOTksMi41MzMNCgljLTAuMDY3LDAuNDI4LDAuMjYzLDAuODE0LDAuNjk1LDAuODE0aDQuODgxYzAuNTc4LDAsMS4wNjktMC40MiwxLjE2LTAuOTlsMC4wNDgtMC4yNDhsMC45MTktNS44MzJsMC4wNTktMC4zMg0KCWMwLjA5LTAuNTcyLDAuNTgyLTAuOTkyLDEuMTYtMC45OTJoMC43M2M0LjcyOSwwLDguNDMxLTEuOTIsOS41MTMtNy40NzZjMC40NTItMi4zMjEsMC4yMTgtNC4yNTktMC45NzgtNS42MjINCglDMjQuMDIyLDguMjg2LDIzLjU3Myw3Ljk0NSwyMy4wNDgsNy42Njd6Ii8+DQo8cGF0aCBmaWxsPSIjMjIyRDY1IiBkPSJNMjEuNzU0LDcuMTUxYy0wLjE4OS0wLjA1NS0wLjM4NC0wLjEwNS0wLjU4NC0wLjE1Yy0wLjIwMS0wLjA0NC0wLjQwNy0wLjA4My0wLjYxOS0wLjExNw0KCWMtMC43NDItMC4xMi0xLjU1NS0wLjE3Ny0yLjQyNi0wLjE3N2gtNy4zNTJjLTAuMTgxLDAtMC4zNTMsMC4wNDEtMC41MDcsMC4xMTVDOS45MjcsNi45ODUsOS42NzUsNy4zMDYsOS42MTQsNy42OTlMOC4wNSwxNy42MDUNCglsLTAuMDQ1LDAuMjg5YzAuMTAzLTAuNjUyLDAuNjYtMS4xMzIsMS4zMjEtMS4xMzJoMi43NTJjNS40MDUsMCw5LjYzNy0yLjE5NSwxMC44NzQtOC41NDVjMC4wMzctMC4xODgsMC4wNjgtMC4zNzEsMC4wOTYtMC41NQ0KCWMtMC4zMTMtMC4xNjYtMC42NTItMC4zMDgtMS4wMTctMC40MjlDMjEuOTQxLDcuMjA4LDIxLjg0OCw3LjE3OSwyMS43NTQsNy4xNTF6Ii8+DQo8cGF0aCBmaWxsPSIjMjUzQjgwIiBkPSJNOS42MTQsNy42OTljMC4wNjEtMC4zOTMsMC4zMTMtMC43MTQsMC42NTItMC44NzZjMC4xNTUtMC4wNzQsMC4zMjYtMC4xMTUsMC41MDctMC4xMTVoNy4zNTINCgljMC44NzEsMCwxLjY4NCwwLjA1NywyLjQyNiwwLjE3N2MwLjIxMiwwLjAzNCwwLjQxOCwwLjA3MywwLjYxOSwwLjExN2MwLjIsMC4wNDUsMC4zOTUsMC4wOTUsMC41ODQsMC4xNQ0KCWMwLjA5NCwwLjAyOCwwLjE4NywwLjA1NywwLjI3OCwwLjA4NmMwLjM2NSwwLjEyMSwwLjcwNCwwLjI2NCwxLjAxNywwLjQyOWMwLjM2OC0yLjM0Ny0wLjAwMy0zLjk0NS0xLjI3Mi01LjM5Mg0KCUMyMC4zNzgsMC42ODIsMTcuODUzLDAsMTQuNjIyLDBoLTkuMzhjLTAuNjYsMC0xLjIyMywwLjQ4LTEuMzI1LDEuMTMzTDAuMDEsMjUuODk4Yy0wLjA3NywwLjQ5LDAuMzAxLDAuOTMyLDAuNzk1LDAuOTMyaDUuNzkxDQoJbDEuNDU0LTkuMjI1TDkuNjE0LDcuNjk5eiIvPg0KPC9zdmc+DQo=";
      img.alt = "PayPal";
    }
  }
};

// src/main.tsx
var CalibrePlugin = class extends import_obsidian3.Plugin {
  onload() {
    return __async(this, null, function* () {
      try {
        yield this.loadSettings();
        this.addSettingTab(new CalibreSettingTab(this.app, this));
        (0, import_obsidian3.addIcon)(CALIBRE_ICON_ID, CALIBRE_ICON_SVG);
        this.registerView(CALIBRE_VIEW_TYPE, (leaf) => new CalibreView(leaf, this.settings));
        if (!this.settings.hideRibbonIcon) {
          this.addRibbonIcon(this.settings.ribbonIcon, "Calibre", () => __async(this, null, function* () {
            this.activateView();
          }));
        }
        this.addCommand({
          id: "calibre-open-horizontally",
          name: "Open horizontally",
          callback: () => this.activateView("horizontal")
        });
        this.addCommand({
          id: "calibre-open-vertically",
          name: "Open vertically",
          callback: () => this.activateView("vertical")
        });
      } catch (error) {
        console.log(`Load error. ${error}`);
      }
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign(DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  activateView(direction) {
    return __async(this, null, function* () {
      const leaf = this.app.workspace.splitActiveLeaf(direction != null ? direction : this.settings.splitDirection);
      yield leaf.setViewState({
        type: CALIBRE_VIEW_TYPE,
        active: true
      });
      this.app.workspace.revealLeaf(leaf);
    });
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(CALIBRE_VIEW_TYPE);
  }
};
