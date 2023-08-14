"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(bodyParser.text({ type: '*/*' }));
app.use(express.static('public'));
app.get('/api/legado', require('./api/legado'));
app.post('/api/ra', require('./api/ra'));
app.listen(port, () => {
    console.info(`应用正在监听 ${port} 端口`);
});
//# sourceMappingURL=app.js.map