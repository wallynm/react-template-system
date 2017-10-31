# React Layout System

Basic things:
- [ ] React file structure to support components and template engine
- [ ] Basic 
- [ ] Manage extending components (Coming from external bundles)
- [ ] Webpack layout bundling



### File structure
- Arquitetura 

Necessita ser bem dividida o suficiente para que seja natural a implementação e uilização de novos componentes.
Bem como a reutilização daqueles já existentes dentro do atual projeto, podendo extender o mesmo e aproveitar de todas as funcionalidades do mesmo.

### Todos
- [ ] Bundle js templates files
- [ ] Bundle css templates files
- [ ] Decidir entre buildar js e css dos templates juntos (utilizando css modules, classes escopadas) ou carregar css assync on demand
- [ ] Servir map files de forma separada


OBS:
- Com SSR seria possível préviamente já possuir os arquivos de templates préviamente carregados no header, uma vez que os dados da área de membros já estaria préviamente carregados na API
- É possível termos vários bundles. De todo o css e JS compilado por TEMPLATE, dessa forma. Cada bundle teria apenas os códigos específicos do seu próprio tema.