#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { buildDocumentation, documentationToMarkdown } = require("tsdoc-markdown");

const packagesRoot = path.join(__dirname, "../packages");

//
// packages/core
//

const core = path.join(packagesRoot, "core");
const coreSrc = path.join(core, "src");
const coreModules = new Map(
  fs
    .readFileSync(path.join(coreSrc, "index.ts"), "utf-8")
    .split(/\n/)
    .map(
      (v) =>
        v
          .match(/as\s+(\w+)\s+from\s+"\.\/(\w+)"/)
          ?.slice(1, 3)
          .reverse() || []
    )
    .filter((v) => v.length === 2)
);

let md = "";

fs.readdirSync(coreSrc).forEach((filename) => {
  const mod = coreModules.get(filename.replace(path.extname(filename), ""));
  if (!mod) {
    return;
  }

  const docs = new Map(
    buildDocumentation({
      inputFiles: [path.join(coreSrc, filename)],
    }).map((doc) => {
      const name = `${mod}.${doc.name}`;
      return [name, { ...doc, name }];
    })
  );

  if (md !== "") {
    md += "\n\n";
  }

  md += documentationToMarkdown({
    entries: [...docs.values()].map((v) => ({
      ...v,
      jsDocs: v.jsDocs.map((j) =>
        j.name === "param"
          ? {
              ...j,
              text: j.text.map((t) =>
                t.kind === "text" ? { ...t, text: t.text.replace(/^- /, "") } : t
              ),
            }
          : j
      ),
    })),
    options: {
      headingLevel: "###",
    },
  }).replace(":toolbox: Functions", `:toolbox: \`${mod}\``);
});

const readme = fs.readFileSync(path.join(core, "README.md"), "utf-8");
fs.writeFileSync(
  path.join(core, "README.md"),
  readme.replace(
    /(<!-- TSDOC_START -->)[\s\S]*?(<!-- TSDOC_END -->)$/gm,
    `<!-- TSDOC_START -->\n\n${md}\n<!-- TSDOC_END -->`
  )
);
