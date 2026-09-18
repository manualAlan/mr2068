# Alliance 2068: Freedom to build

Campaign website for the Alliance in the fictional Republic of Caprica. A single, confident identity built around enterprise, personal freedom and opportunity.

## Live site

[View the LCA campaign](https://manualalan.github.io/mr2068/)

## Local development

```bash
npm install
npm run dev
```

The application is built with React and vinext. A Pages-safe static edition is generated into `docs/` with:

```bash
npm run export:pages
node --test tests/campaign-2068.test.mjs
```

Keep the development server running on port 3000 while exporting. GitHub Pages serves `main:/docs` at `/mr2068/`.

Campaign portraits and the Alliance logo were supplied for this project. Supporting photography and fonts are stored locally. See [CAMPAIGN_DIRECTION.md](CAMPAIGN_DIRECTION.md) for the voice, design references and asset notes. Event calendar downloads work without a backend; event registration and contact are not yet available.
