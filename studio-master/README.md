# Fermentai - Demo para GitHub Pages

## 🍇 Sobre el Proyecto

Fermentai es una aplicación de gestión de viñedos con IA integrada. Esta versión ha sido adaptada para funcionar como demo estático en GitHub Pages.

## 🚀 Cambios Realizados para GitHub Pages

### Problemas Originales
La aplicación original no podía desplegarse en GitHub Pages porque:

1. **Server-Side Rendering (SSR)**: Usaba funciones del servidor (`"use server"`)
2. **Firebase Dependencies**: Requería Firebase App Hosting y Google AI APIs
3. **Server Actions**: Funciones que necesitan backend para procesar datos
4. **Variables de entorno sensibles**: API keys que no pueden exponerse al cliente

### Soluciones Implementadas

#### 1. Configuración de Next.js para Static Export
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',           // Genera sitio estático
  trailingSlash: true,        // URLs compatibles con GitHub Pages
  basePath: '/fermentai',     // Path del repositorio
  assetPrefix: '/fermentai/', // Prefix para assets
  images: {
    unoptimized: true,        // Optimización deshabilitada para static export
  },
};
```

#### 2. Mock Services
- **Chat Service** (`src/services/chatService.ts`): Simula la IA con respuestas predefinidas
- **Form Handling**: Reemplaza Server Actions con client-side logic
- **Data Management**: Mantiene datos en memoria del cliente

#### 3. GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ "main" ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build:github
      - uses: actions/deploy-pages@v4
```

#### 4. Scripts Actualizados
```json
{
  "scripts": {
    "build:github": "NODE_ENV=production next build",
    "export": "next export"
  }
}
```

## 📦 Funcionalidades del Demo

### ✅ Funciona
- ✅ Lista de viñedos con datos mock
- ✅ Chat con IA simulado (respuestas inteligentes)
- ✅ Interfaz completa y responsive
- ✅ Navegación entre páginas
- ✅ Formulario de nuevo viñedo (con validación)

### ⚠️ Limitaciones del Demo
- ⚠️ Chat con IA usa respuestas predefinidas (no hay API real)
- ⚠️ Los datos no persisten (solo en memoria)
- ⚠️ No hay autenticación real
- ⚠️ Formularios muestran alertas en lugar de guardar

## 🛠️ Tecnologías Usadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Build**: Static Site Generation (SSG)
- **Deploy**: GitHub Pages + GitHub Actions

## 🚀 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build para GitHub Pages
npm run build:github

# Build normal
npm run build

# Verificar tipos
npm run typecheck
```

## 📁 Estructura del Proyecto

```
src/
├── app/                 # Páginas de Next.js
│   ├── page.tsx        # Dashboard principal
│   └── vineyards/      # Gestión de viñedos
├── components/         # Componentes UI reutilizables
├── services/           # Mock services (chat, forms)
├── lib/               # Utilidades y datos mock
└── types/             # Definiciones TypeScript
```

## 🎯 Funcionalidades del Chat IA Mock

El chat reconoce palabras clave y responde contextualmnte:

- **"plaga" / "pest"**: Revisa alertas de plagas
- **"resumen" / "estado"**: Muestra estadísticas generales
- **"riego" / "agua"**: Información sobre riego
- **"temperatura" / "clima"**: Datos meteorológicos
- **Otros**: Respuestas aleatorias relevantes

## 📝 Despliegue Automático

1. **Push a main**: Dispara el workflow automáticamente
2. **Build**: Next.js genera archivos estáticos en `/out`
3. **Deploy**: GitHub Actions sube los archivos a GitHub Pages
4. **URL**: `https://username.github.io/fermentai/`

## 🔄 Migración de Vuelta a Full-Stack

Para restaurar funcionalidades completas:

1. **Server Actions**: Restaurar `src/app/actions.ts`
2. **Firebase**: Reactivar `apphosting.yaml` y variables de entorno
3. **Google AI**: Conectar flows reales en `src/ai/`
4. **Base de datos**: Implementar persistencia real
5. **Deploy**: Usar Vercel, Firebase, o Netlify

## 🐛 Troubleshooting

### Error: Module not found
```bash
npm install  # Reinstalar dependencias
```

### Build falla
```bash
npm run typecheck  # Verificar errores TypeScript
```

### GitHub Pages no funciona
1. Verificar que Pages esté habilitado en Settings
2. Verificar permisos de GitHub Actions
3. Revisar el archivo `.nojekyll` en `/public`

## 📞 Contacto

- **Repositorio**: [github.com/JanoverSaldana/fermentai](https://github.com/JanoverSaldana/fermentai)
- **Demo**: [Enlace a GitHub Pages una vez desplegado]

---

**Nota**: Esta es una versión demo. Para un entorno de producción real, considera usar Firebase App Hosting, Vercel, o similar para aprovechar todas las funcionalidades de Next.js y las APIs de IA.
