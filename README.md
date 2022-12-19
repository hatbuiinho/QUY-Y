## Create .env file in root directory
```
DB_HOST="<string>"
DB_PORT="<number>"
DB_NAME="<string>"
DB_USER="<string>"
DB_PASS="<string>"
COOKIE_APP_NAME="<string>"
COOKIE_PASS="<string>"
```

## Migrate DB if tables do not exist
```bash
npx sequelize-cli db:migrate
```

## Getting Started

### First, run the development server:
```bash
npm run dev
# or
yarn dev
```

### Production mode
```bash
npm run build
npm start
```