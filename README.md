# Wise App

## A Quiz app from RDS

## Setup

### Prerequisites

- Node.js (=== 18.17.1) [Download](https://nodejs.org/en/download/)
- Volta [Download](https://docs.volta.sh/guide/getting-started)

To setup the project run the following command:

```bash
 npm install
```

## Development

To start the development server run the following command:

```bash
 npm run dev
```

## Folder Structure

.
├── README.md
├── src
│ ├── components
│ │ ├── base (These are generic components built keeping our design system in mind. Can be shared across projects or shipped independently as a package)
│ │ ├── wise (Independent components (or) components built on top of the base components. These are specific to this project)
│ ├── modules (Every page in the project is a module. Each module has its own folder with its own components, styles, etc.)
│ ├── pages (These are the pages that are finally rendered to screen and are the entry point for each module)
│ ├── styles (Global styles & variables)
│ ├── templates (Common templates that are used to render a page)
│ ├── type (Types that are used across the project)
│ ├── utils (Utility functions that are used across the project)
...

### Components

Every component has its own folder with its own styles, tests, etc. The folder structure for a component is as follows:

.
├── ComponentName
│ ├── index.ts (index file that re-exports the component, not using a tsx file as there will be no JSX in this file)
│ ├── ComponentName.tsx (Main component file)
│ ├── ComponentName.dto.ts
│ ├── ComponentName.test.tsx
│ ├── ComponentName.stories.tsx (Storybook stories)
│ ├── ComponentName.types.ts (Types used only across this component - Optional)
│ ├── ComponentName.utils.ts (Utility functions used only across this component - Optional)
│ ├── ComponentName.children.ts (Child components used only by this component - Optional)
│ ├── ComponentName.constants.ts (Constants used across this component - Optional)
...
