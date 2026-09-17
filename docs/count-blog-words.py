import re, os, json

blog_dir = "app/blog"
results = []
for slug in sorted(os.listdir(blog_dir)):
    path = os.path.join(blog_dir, slug, "page.tsx")
    if not os.path.isfile(path):
        continue
    with open(path, encoding="utf-8") as f:
        src = f.read()
    # crude: pull text inside JSX by stripping tags/braces/attributes, keep readable text
    # remove import/export lines and function signatures roughly by taking only text-like content
    text = re.sub(r'<[^>]+>', ' ', src)  # strip tags
    text = re.sub(r'\{[^{}]*\}', ' ', text)  # strip simple JS expressions (non-nested)
    text = re.sub(r'\{[^{}]*\}', ' ', text)  # second pass for nested-ish
    # drop obvious code lines
    lines = [l for l in text.splitlines() if not re.match(r'^\s*(import|export|function|const|//|\*)', l)]
    text = "\n".join(lines)
    words = re.findall(r"[A-Za-z']+", text)
    wc = len(words)
    results.append((slug, wc))

results.sort(key=lambda x: x[1])
for slug, wc in results:
    flag = "SHORT" if wc < 3000 else ""
    print(f"{wc:6d}  {slug}  {flag}")
print()
print("Total posts:", len(results))
print("Under 3000 words:", sum(1 for _,wc in results if wc < 3000))
