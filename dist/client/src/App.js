"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const ProductForm_1 = __importDefault(require("./components/Product/ProductForm"));
const ProductList_1 = __importDefault(require("./components/Product/ProductList"));
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("header", { className: "App-header" },
            react_1.default.createElement(ProductForm_1.default, null),
            react_1.default.createElement(ProductList_1.default, null))));
}
exports.default = App;
