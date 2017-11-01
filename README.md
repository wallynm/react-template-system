# React Template System

Basic things:
- [X] React file structure to support components and template engine
- [ ] Basic 
- [ ] Manage extending components (Coming from external bundles)
- [ ] Webpack layout bundling

### Todos
- [ ] Bundle js templates files
- [ ] Bundle css templates files
- [ ] Decidir entre buildar js e css dos templates juntos (utilizando css modules, classes escopadas) ou carregar css assync on demand
- [ ] Servir map files de forma separada

### File Architecture
1. Arquitetura: Necessita ser bem dividida e clara para que seja natural a implementação e uilização de novos componentes. Cada componente será responsável por si próprio, importanto suas classes, imagens ou seja lá o que o mesmo for necessário para cumprir seu objetivo.

2. Componentização: 
Bem como a reutilização daqueles já existentes dentro do atual projeto, podendo extender o mesmo e aproveitar de todas as funcionalidades do mesmo.

3. Bundler: É necessário que cada template gere seu próprio bundle, isolado de forma a permitir o sistema uma total liberade



### Cross Extension
Webpack precisa criar um bundle de cada template, e os componentes base, (block components) devem ser capaz de trabalhar com qualquer componente encontrado que dê match em seu mesmo nome. Caso um componente queira ele pode extender o componente pai, o qual ele substuirá, herando funcionalidades préviamente já implementadas

### OBS:
- Com SSR seria possível préviamente já possuir os arquivos de templates préviamente carregados no header, uma vez que os dados da área de membros já estaria préviamente carregados na API
- É possível termos vários bundles. De todo o css e JS compilado por TEMPLATE, dessa forma. Cada bundle teria apenas os códigos específicos do seu próprio tema.
