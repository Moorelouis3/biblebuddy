// Serves docs/mockups on http://localhost:5178 for the preview pane.
import http from "http";
import { readFile } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const dir = dirname(fileURLToPath(import.meta.url));
http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split("?")[0]).split("/").filter(Boolean).join("/") || "settings-and-bible-covers.html";
  readFile(join(dir, name), (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": name.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream" });
    res.end(data);
  });
}).listen(5178);
