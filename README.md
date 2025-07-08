# 🚗 Sistema de Gerenciamento de Veículos - EPTA

Um sistema moderno e completo para gerenciamento de veículos desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

**Teste Técnico - Desenvolvido por:** [Pedro Bastos](https://github.com/a5ur4)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes Principais](#componentes-principais)
- [Contextos e Estado](#contextos-e-estado)
- [Schemas e Validação](#schemas-e-validação)
- [Serviços e API](#serviços-e-api)
- [Estilização](#estilização)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)


## 🎯 Sobre o Projeto

Um sistema completo para gerenciamento de frotas, desenvolvido como solução para o teste técnico da EPTA. O projeto demonstra uma arquitetura moderna, com foco em performance, manutenibilidade e experiência de usuário.

### 🌟 Destaques

- **Interface Totalmente Responsiva**: Design Mobile First que se adapta perfeitamente a todos os dispositivos
- **Busca e Filtros Avançados**: Sistema de busca em tempo real com filtros inteligentes e paginação
- **Tipagem Forte**: Desenvolvido em TypeScript para maior segurança e manutenibilidade
- **Validação Robusta**: Validação de formulários com Zod e React Hook Form
- **Autenticação Segura**: Sistema completo de login e registro com JWT
- **Experiência do Usuário**: Modais dinâmicos, feedback visual e navegação fluida
- **Performance Otimizada**: Paginação, lazy loading e componentes otimizados
- **Fonte Otimizada**: Uso da fonte Poppins otimizada pelo Next.js

## ⚡ Funcionalidades

### 🔐 Autenticação
- **Login de usuário** com validação de email e senha
- **Registro de novos usuários** via modal
- **Logout seguro** com limpeza de tokens
- **Proteção de rotas** para usuários não autenticados
- **Redirecionamento automático** após autenticação

### 🚙 Gerenciamento de Veículos
- **Listagem de veículos** em tabela responsiva e estilizada
- **Busca avançada** por nome, placa, cor ou ano
- **Filtros dinâmicos** por status (Ativo/Inativo) e tipo de veículo
- **Paginação** com limite de 10 itens por página
- **Visualização adaptativa** - Cards no mobile, tabela no desktop
- **Cadastro de novos veículos** com validação completa
- **Visualização de detalhes** em modal dedicado
- **Edição de informações** de veículos existentes
- **Exclusão de veículos** com modal de confirmação
- **Alteração de status** (Ativo/Inativo) dos veículos
- **Suporte a múltiplos tipos**: Carro, Moto, Caminhão, Ônibus, Van
- **Contador dinâmico** de resultados filtrados

### 🎨 Interface e Navegação
- **Sidebar retrátil** com contexto persistente e comportamento responsivo
- **Design totalmente responsivo** para desktop, tablet e mobile
- **Menu hamburger** para dispositivos móveis
- **Overlay de navegação** em telas pequenas
- **Modais com fundo transparente** para melhor UX
- **Feedback visual** com estados de carregamento
- **Tratamento de erros** com mensagens amigáveis
- **Navegação por teclado** (ESC para fechar modais)
- **Tooltips informativos** em elementos recolhidos

### 📊 Dashboard e Estatísticas
- **Cartões de estatísticas** responsivos com ícones
- **Contadores em tempo real** de veículos totais, ativos e inativos
- **Interface adaptativa** que se ajusta ao tamanho da tela
- **Botões de ação** otimizados para diferentes dispositivos

## 🛠 Tecnologias Utilizadas

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário

### Gerenciamento de Estado
- **[React Context API](https://react.dev/reference/react/createContext)** - Para estado global
- **Custom Hooks** - Para lógica reutilizável

### Validação e Formulários
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários performático
- **[Zod](https://zod.dev/)** - Validação de schema TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + React Hook Form

### HTTP e Autenticação
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Nookies](https://github.com/maticzav/nookies)** - Gerenciamento de cookies

### Ícones e UI
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e minimalistas

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.17 ou superior)
- **npm** ou **yarn** ou **pnpm**
- **Git** para versionamento

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/a5ur4/ETPA_test_next
   cd epta_test
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas configurações:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 💡 Como Usar

### 1. Primeira Utilização

1. **Acesse a página de login**
2. **Clique em "Cadastre-se gratuitamente!"** para criar uma conta
3. **Preencha o formulário de registro** no modal que abrir
4. **Faça login** com suas credenciais

### 2. Gerenciando Veículos

#### Adicionar Novo Veículo
1. No dashboard, clique em **"Adicionar Veículo"**
2. Preencha o formulário com:
   - Nome do veículo
   - Placa (formato brasileiro)
   - Tipo (Carro, Moto, Caminhão, Ônibus, Van)
   - Ano de fabricação
   - Cor
3. Clique em **"Cadastrar Veículo"**

#### Buscar e Filtrar Veículos
1. Use a **barra de busca** para pesquisar por:
   - Nome do veículo
   - Número da placa
   - Cor
   - Ano de fabricação
2. **Filtros disponíveis**:
   - **Status**: Todos, Ativo, Inativo
   - **Tipo**: Todos, Carro, Moto, Caminhão, Ônibus, Van
3. **Limpar filtros**: Clique em "Limpar Filtros" quando aplicados

#### Navegar pela Lista
- **Paginação**: Máximo de 10 veículos por página
- **Navegação**: Use os botões de página ou setas
- **Contador**: Visualize quantos veículos correspondem aos filtros

#### Visualizar Detalhes
1. Na lista de veículos, clique no ícone de **visualização** (arquivo)
2. O modal mostrará todas as informações do veículo

#### Editar Veículo
1. Clique no ícone de **edição** (lápis)
2. Modifique os campos desejados
3. Clique em **"Atualizar Veículo"**

#### Alterar Status
1. Clique no ícone de **configurações** (engrenagem)
2. Escolha entre **"Ativar"** ou **"Desativar"**

#### Excluir Veículo
1. Clique no ícone de **lixeira** (vermelho)
2. Confirme a exclusão no modal de confirmação

### 3. Navegação

- **Sidebar**: Clique no ícone de menu para retrair/expandir
- **Modais**: Pressione **ESC** ou clique fora para fechar
- **Logout**: Use o menu do usuário no canto superior direito

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router do Next.js
│   ├── components/              # Componentes reutilizáveis
│   │   ├── dashboard/          # Componentes específicos do dashboard
│   │   │   ├── sidebar.tsx     # Barra lateral retrátil
│   │   │   ├── statusTotal.tsx # Estatísticas dos veículos
│   │   │   └── userMenu.tsx    # Menu do usuário
│   │   ├── modal.tsx           # Componente modal reutilizável
│   │   ├── vehicleForm.tsx     # Formulário de veículos
│   │   ├── vehicleList.tsx     # Lista/tabela de veículos
│   │   ├── vehicleDetails.tsx  # Detalhes do veículo
│   │   └── registerForm.tsx    # Formulário de registro
│   ├── dashboard/              # Página principal do sistema
│   ├── login/                  # Página de autenticação
│   ├── globals.css            # Estilos globais e Tailwind
│   ├── layout.tsx             # Layout raiz da aplicação
│   └── page.tsx               # Página inicial
├── assets/                     # Recursos estáticos
│   └── logo_EPTA.png          # Logo da empresa
├── contexts/                   # Contextos React
│   ├── AuthContext.tsx        # Contexto de autenticação
│   ├── VehicleContext.tsx     # Contexto de veículos
│   └── SidebarContext.tsx     # Contexto da sidebar
├── hooks/                      # Custom hooks
│   ├── useAuth.ts             # Hook de autenticação
│   └── vehicle.ts             # Hook de veículos
├── schemas/                    # Schemas de validação Zod
│   ├── login.schema.ts        # Validação de login
│   ├── register.schema.ts     # Validação de registro
│   └── vehicle.schema.ts      # Validação de veículos
├── services/                   # Serviços de API
│   ├── api.ts                 # Configuração do Axios
│   ├── auth.service.ts        # Serviços de autenticação
│   └── vehicle.service.ts     # Serviços de veículos
├── types/                      # Definições de tipos TypeScript
│   ├── user.ts                # Tipos do usuário
│   └── vehicle.ts             # Tipos de veículos
└── utils/                      # Utilitários
    └── errorHandler.ts        # Tratamento de erros
```

## 🧩 Componentes Principais

### Modal (`modal.tsx`)
Componente reutilizável para modais com:
- Fundo transparente
- Fechamento por ESC ou clique fora
- Ícone e título personalizáveis
- Tamanhos responsivos

### VehicleForm (`vehicleForm.tsx`)
Formulário multimodo para:
- **Criar** novos veículos
- **Editar** veículos existentes
- **Visualizar** detalhes (modo somente leitura)
- **Excluir** com confirmação
- **Alterar status** do veículo

### VehicleList (`vehicleList.tsx`)
Lista responsiva de veículos com:
- **Busca em tempo real** por múltiplos campos (nome, placa, cor, ano)
- **Filtros dinâmicos** por status e tipo de veículo
- **Paginação inteligente** com 10 itens por página
- **Visualização adaptativa**:
  - **Mobile**: Cards compactos com informações essenciais
  - **Desktop**: Tabela completa com todas as colunas
- **Botões de ação** contextuais para cada veículo
- **Contador dinâmico** de resultados filtrados
- **Estado vazio** quando não há resultados
- **Navegação por páginas** com controles intuitivos

### Sidebar (`sidebar.tsx`)
Barra lateral inteligente com:
- **Comportamento responsivo**:
  - **Desktop**: Retrátil com ícones ou texto completo
  - **Mobile**: Overlay com fundo escuro e menu hamburger
- **Navegação contextual** com indicador de página ativa
- **Logo adaptativo** que muda conforme o estado (completo/compacto)
- **Tooltips informativos** quando em modo recolhido
- **Fechamento automático** no mobile após navegação

## 🔄 Contextos e Estado

### AuthContext
Gerencia autenticação global:
- Estado do usuário atual
- Funções de login/register/logout
- Verificação de autenticação
- Redirecionamentos automáticos

### VehicleContext
Gerencia estado dos veículos:
- Lista de veículos do usuário
- Operações CRUD completas
- Estados de carregamento e erro
- Sincronização com API

### SidebarContext
Controla estado da sidebar:
- **Estado retrátil/expandido** persistente
- **Detecção de dispositivo móvel** automática
- **Largura dinâmica** baseada no estado e dispositivo
- **Comportamento adaptativo** para diferentes telas
- **Persistência entre navegações** do estado preferido

## 📱 Design Responsivo

O sistema foi desenvolvido com **Mobile First** e oferece uma experiência otimizada em todos os dispositivos:

### 📱 Mobile (< 768px)
- **Sidebar**: Overlay em tela cheia com menu hamburger
- **Lista de veículos**: Cards compactos com informações essenciais
- **Formulários**: Campos em coluna única, botões de tela cheia
- **Navegação**: Menu de usuário simplificado
- **Busca e filtros**: Layout vertical para facilitar o uso

### 📟 Tablet (768px - 1024px)
- **Sidebar**: Comportamento híbrido, pode ser retraída
- **Lista de veículos**: Grid responsivo de cards
- **Dashboard**: Layout em 2 colunas para estatísticas
- **Formulários**: Campos organizados em grid 2x2

### 🖥️ Desktop (> 1024px)
- **Sidebar**: Modo completo com recolhimento opcional
- **Lista de veículos**: Tabela completa com todas as colunas
- **Dashboard**: Layout em 3 colunas para estatísticas
- **Formulários**: Layout otimizado com campos lado a lado
- **Tooltips**: Informações adicionais em hover

### ⚡ Funcionalidades Responsivas
- **Busca inteligente**: Funciona em todos os dispositivos
- **Paginação adaptativa**: Controles otimizados por tela
- **Modais responsivos**: Tamanhos que se ajustam ao viewport
- **Imagens otimizadas**: Next.js Image com lazy loading
- **Fonte web otimizada**: Poppins carregada via Next.js Fonts

## 🔍 Busca e Filtros Avançados

### Funcionalidades de Busca
- **Busca em tempo real** sem necessidade de botão
- **Múltiplos campos**: Nome, placa, cor e ano
- **Busca insensível a maiúsculas** e acentos
- **Resultados instantâneos** com debounce otimizado

### Sistema de Filtros
- **Filtro por status**: Todos, Ativo, Inativo
- **Filtro por tipo**: Todos os tipos de veículos disponíveis
- **Combinação de filtros**: Use múltiplos filtros simultaneamente
- **Limpeza rápida**: Botão para resetar todos os filtros

### Paginação Inteligente
- **Limite configurável**: 10 itens por página (otimizado para performance)
- **Navegação intuitiva**: Botões anterior/próximo + números de página
- **Contador dinâmico**: "Mostrando X de Y resultados"
- **Reset automático**: Volta à página 1 ao alterar filtros

## ✅ Schemas e Validação

### LoginSchema
```typescript
{
  email: string (email válido),
  password: string (mínimo 6 caracteres)
}
```

### RegisterSchema
```typescript
{
  name: string (2-100 caracteres),
  email: string (email válido),
  password: string (6-100 caracteres),
  confirmPassword: string (deve coincidir)
}
```

### VehicleSchema
```typescript
{
  name: string (2-100 caracteres),
  plateNumber: string (formato brasileiro),
  type: VehicleType (enum),
  year: number (1886-atual),
  color: string (2-50 caracteres)
}
```

## 🌐 Serviços e API

### AuthService
- `login()` - Autenticação de usuário
- `register()` - Registro de novos usuários
- `logout()` - Logout e limpeza de sessão
- `getCurrentUser()` - Obter usuário atual

### VehicleService
- `createVehicle()` - Criar novo veículo
- `updateVehicle()` - Atualizar veículo existente
- `deleteVehicle()` - Excluir veículo
- `patchVehicleStatus()` - Alterar status
- `getAllVehicles()` - Listar todos os veículos
- `getVehicleById()` - Obter veículo específico
- `getUserVehicles()` - Veículos do usuário

## 🎨 Estilização

### Tailwind CSS
- **Fonte**: Poppins otimizada pelo Next.js
- **Cores**: Paleta azul como cor primária
- **Responsividade**: Mobile-first approach
- **Componentes**: Classes utilitárias personalizadas

### Elementos de Design
- **Sombras**: Consistentes em botões e modais
- **Bordas**: Cantos arredondados padrão
- **Espaçamento**: Sistema de grid harmonioso
- **Estados**: Hover, focus e disabled bem definidos

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm run start

# Linting do código
npm run lint
```

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico.