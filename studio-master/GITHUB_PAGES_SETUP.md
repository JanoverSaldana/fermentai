# Instrucciones para configurar GitHub Pages

## 1. Configuración del Repositorio

1. Ve a **Settings** > **Pages** en tu repositorio GitHub
2. En **Source**, selecciona **GitHub Actions**
3. Guarda los cambios

## 2. Permisos necesarios

Verifica que en **Settings** > **Actions** > **General**:
- ✅ **Actions permissions**: Allow all actions and reusable workflows
- ✅ **Workflow permissions**: Read and write permissions
- ✅ **Allow GitHub Actions to create and approve pull requests**: ✅

## 3. Variables de entorno (opcional)

Si necesitas variables de entorno:
1. Ve a **Settings** > **Secrets and variables** > **Actions**
2. Añade las variables necesarias

## 4. Primer despliegue

1. Haz commit de todos los cambios
2. Push a la rama `main`
3. Ve a **Actions** para ver el progreso del deploy
4. Una vez completado, tu sitio estará en: `https://tu-usuario.github.io/fermentai/`

## 5. Troubleshooting

- Si el deploy falla, revisa los logs en la pestaña **Actions**
- Asegúrate de que el archivo `.nojekyll` esté presente en `/public`
- Verifica que `basePath` en `next.config.ts` coincida con el nombre del repositorio
