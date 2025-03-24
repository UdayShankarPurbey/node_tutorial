"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: 'User created successfully', data: { name, email } });
});
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: 'User fetched successfully', data: { id } });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
