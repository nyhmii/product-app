"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
require("./ProductForm.css");
const ProductForm = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [price, setPrice] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios_1.default.post('/api/products', { name, price, description });
            setName('');
            setPrice('');
            setDescription('');
        }
        catch (error) {
            console.error('Error submitting product:', error);
        }
    };
    return (react_1.default.createElement("div", { className: "edit-form" },
        react_1.default.createElement("h2", null, "Add Product"),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("label", null,
                "Name:",
                react_1.default.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: "form-control" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", null,
                "Price:",
                react_1.default.createElement("input", { type: "number", value: price, onChange: (e) => setPrice(e.target.value), className: "form-control" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", null,
                "Description:",
                react_1.default.createElement("input", { type: "text", value: description, onChange: (e) => setDescription(e.target.value), className: "form-control" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { className: "button-group" },
                react_1.default.createElement("button", { type: "submit", className: "btn-submit" }, "Add"),
                react_1.default.createElement("button", { type: "button", className: "btn-cancel", onClick: () => { setName(''); setPrice(''); setDescription(''); } }, "Clear")))));
};
exports.default = ProductForm;
