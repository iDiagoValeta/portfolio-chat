# Changelog

## [1.1.0](https://github.com/iDiagoValeta/portfolio-chat/compare/v1.0.0...v1.1.0) (2026-11-08)


### Features

* **projects:** show each project as a short video of its demo ([#14](https://github.com/iDiagoValeta/portfolio-chat/issues/14)) ([c1557a4](https://github.com/iDiagoValeta/portfolio-chat/commit/c1557a49a585b6771ccbd272898313c0a9359fa5))


### Bug Fixes

* **chat:** let the page scroll past the chat ([#17](https://github.com/iDiagoValeta/portfolio-chat/issues/17)) ([999e015](https://github.com/iDiagoValeta/portfolio-chat/commit/999e01511e4309f42101307c9d87fba66870ab13))

## 1.0.0 (2026-11-07)


### Features

* **app:** nav completo, textos hero/about/skills/proyectos i18n y dataset-creator ([7964731](https://github.com/iDiagoValeta/portfolio-chat/commit/79647312fe9976ef2bd664f887c7702cdc5897c2))
* **app:** swap avatar src on theme toggle (dark/light) ([1293837](https://github.com/iDiagoValeta/portfolio-chat/commit/129383713d5850872316a01972a6b641bbc8a46a))
* **assets:** add white-shirt avatar for light mode ([5710d69](https://github.com/iDiagoValeta/portfolio-chat/commit/5710d6930b5f66e577110800eda5d6ba5c24a06b))
* **config:** perfil actualizado, Inditex Ambassador, idioma respuesta, certs 2025 ([168c25c](https://github.com/iDiagoValeta/portfolio-chat/commit/168c25ca9afc5fc139f50149042409cb6aa75992))
* **html:** add id=avatarImg to avatar, cache-bust app.js v14 ([05eba5d](https://github.com/iDiagoValeta/portfolio-chat/commit/05eba5dd8e105f70e942a212fad110b1f8f5c487))
* **html:** nav completo, hero actualizado, proyectos, certs 2025, cache-bust v25 ([bb66f67](https://github.com/iDiagoValeta/portfolio-chat/commit/bb66f67ba2505f436364341b15a0aff182b7c208))
* migrar de Gemini 2.5 Flash a DeepSeek V4 Flash con streaming ([85f34c4](https://github.com/iDiagoValeta/portfolio-chat/commit/85f34c47a832a8179ac2a7223bf5dda18ea4d59c))
* motor de efectos visuales fx3d.js y actualizacion de README ([1ba9bdb](https://github.com/iDiagoValeta/portfolio-chat/commit/1ba9bdb36d9797b536c83757459bdbac1c392b48))
* redesign as an earth-toned developer portfolio and fix Chrome lag ([9b23ddf](https://github.com/iDiagoValeta/portfolio-chat/commit/9b23ddf3f4e064106021079ef10e463218b09cf3))
* streaming chat, command palette, redesign de skills y banners ([8dca132](https://github.com/iDiagoValeta/portfolio-chat/commit/8dca132b6049a47117b6513b18c0fedf3c292718))


### Bug Fixes

* **chat:** give answers room and keep the assistant context current ([#2](https://github.com/iDiagoValeta/portfolio-chat/issues/2)) ([af235ff](https://github.com/iDiagoValeta/portfolio-chat/commit/af235ff8c8c4eef190b329af92a41eeec1c4111d))
* **chat:** rate limit per visitor and close the open proxy ([1f549da](https://github.com/iDiagoValeta/portfolio-chat/commit/1f549daef63c4b8dc01882b38451b7824f213c02))
* **ci:** run the required check on release pull requests ([#11](https://github.com/iDiagoValeta/portfolio-chat/issues/11)) ([373baf3](https://github.com/iDiagoValeta/portfolio-chat/commit/373baf318c6c177e69e9084f1483743ea8b45f18))
* corregir parsing SSE para Gemini 2.5 Flash con thinking tokens ([6a66543](https://github.com/iDiagoValeta/portfolio-chat/commit/6a66543d08e4a7f24be051497ec7c8241a8e0cdf))
* deshabilitar thinking tokens en Gemini 2.5 Flash ([aab3940](https://github.com/iDiagoValeta/portfolio-chat/commit/aab3940c01e1707ffb871d7af2a4b12dcbf63691))
* el chat volvía a datos viejos por historial y caché del prompt. ([a95b395](https://github.com/iDiagoValeta/portfolio-chat/commit/a95b3953cb958e088727b1b6b09dd29ef4638840))
* null-guard applyLang to prevent crash on missing DOM IDs ([16329f0](https://github.com/iDiagoValeta/portfolio-chat/commit/16329f0c218bbef4735aef604ac561a87c0fd056))
* run initClock/observeReveal first, add try-catch fallback and CSS animation fallback for reveal ([b8f9220](https://github.com/iDiagoValeta/portfolio-chat/commit/b8f92206c862c61fe10e769286697aef328608dc))


### Reverts

* drop the CI dispatch from the release workflow ([#12](https://github.com/iDiagoValeta/portfolio-chat/issues/12)) ([63677d3](https://github.com/iDiagoValeta/portfolio-chat/commit/63677d392211398599f30b061f3b8d90c284f0ac))
* volver a generateContent no-streaming ([d4dc784](https://github.com/iDiagoValeta/portfolio-chat/commit/d4dc784ec8ffbd64d0092f15355ef4b55bd44d3e))
