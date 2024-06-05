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
require("./ProductList.css");
const ProductList = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [editingProduct, setEditingProduct] = (0, react_1.useState)(null);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [searchVisible, setSearchVisible] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios_1.default.get('/api/products');
                setProducts(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Error fetching products');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);
    const handleEdit = (product) => {
        setEditingProduct(product);
        setSearchVisible(false); // Hide search input
    };
    const handleDelete = async (productId) => {
        try {
            await axios_1.default.delete(`/api/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        }
        catch (err) {
            setError('Error deleting product');
            console.error('Error deleting product:', err);
        }
    };
    const handleSave = async () => {
        if (editingProduct) {
            try {
                await axios_1.default.put(`/api/products/${editingProduct._id}`, editingProduct);
                //Clear the form first
                setEditingProduct(null);
                //Update state directly to reflect changes
                setProducts(products.map(p => p._id === editingProduct._id ? editingProduct : p));
            }
            catch (err) {
                setError('Error updating product');
                console.error('Error updating product:', err);
            }
        }
        setSearchVisible(true); // Show search input
    };
    const clearSearch = () => {
        setSearchQuery('');
    };
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (loading) {
        return react_1.default.createElement("div", null, "Loading...");
    }
    if (error) {
        return react_1.default.createElement("div", null,
            "Error: ",
            error);
    }
    return (react_1.default.createElement("div", { className: "product-list-container" },
        react_1.default.createElement("h1", null, "Product List"),
        searchVisible && (react_1.default.createElement("div", { className: "search-container" },
            react_1.default.createElement("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search...", className: "form-control" }),
            searchQuery && (react_1.default.createElement("button", { onClick: clearSearch, className: "btn-clear" }, "Clear")))),
        editingProduct ? (react_1.default.createElement("div", { className: "edit-form" },
            react_1.default.createElement("h2", null, "Edit Product"),
            react_1.default.createElement("form", { onSubmit: (e) => { e.preventDefault(); handleSave(); } },
                react_1.default.createElement("label", null,
                    "Name:",
                    react_1.default.createElement("input", { type: "text", value: editingProduct.name, onChange: (e) => setEditingProduct(Object.assign(Object.assign({}, editingProduct), { name: e.target.value })), className: "form-control" })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null,
                    "Price:",
                    react_1.default.createElement("input", { type: "number", value: editingProduct.price, onChange: (e) => setEditingProduct(Object.assign(Object.assign({}, editingProduct), { price: parseFloat(e.target.value) })), className: "form-control" })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null,
                    "Description:",
                    react_1.default.createElement("input", { type: "text", value: editingProduct.description, onChange: (e) => setEditingProduct(Object.assign(Object.assign({}, editingProduct), { description: e.target.value })), className: "form-control" })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { className: "button-group" },
                    react_1.default.createElement("button", { type: "button", className: "btn-submit", onClick: handleSave }, "Save"),
                    react_1.default.createElement("button", { type: "button", className: "btn-cancel", onClick: () => { setEditingProduct(null); setSearchVisible(true); } }, "Cancel"))))) : (react_1.default.createElement("ul", { className: "product-list" }, filteredProducts.map((product) => (react_1.default.createElement("li", { key: product._id },
            react_1.default.createElement("div", { className: "product-info" },
                product.name,
                " - $",
                product.price.toFixed(2),
                react_1.default.createElement("br", null),
                product.description),
            react_1.default.createElement("div", { className: "button-container" },
                react_1.default.createElement("button", { onClick: () => handleEdit(product), className: "btn-submit" }, "Edit"),
                react_1.default.createElement("button", { onClick: () => handleDelete(product._id), className: "btn-delete" }, "Delete")))))))));
};
exports.default = ProductList;
