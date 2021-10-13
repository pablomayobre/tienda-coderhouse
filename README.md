# Rulosartisticos

Esta es una e-Commerce ficticia, presentada como proyecto final del curso de React de Coderhouse (Camada 16155)

La demo esta disponible en [Netlify](https://rulosartisticos.netlify.app).


## Instalación

Para instalar esta aplicación es necesario clonar el repositorio:
```
git clone https://github.com/pablomayobre/tienda-coderhouse.git
```

### Dependencias
Luego se deberá instalar las dependencias
```
cd tienda-coderhouse
npm install
```
Si da error, se deberá usar `npm install --force` ya que se utilizan librerías experimentales y puede que existan problemas de compatibilidad con React.

### Ejecutar (Modo Desarrollo)

La aplicación fue creada con [`create-react-app`][create-react-app] por lo que se puede ejecutar en modo de desarrollo utilizando el siguiente comando:
```
npm start
```

Esto permite ejecutar la página en un entorno local y que esta responda a cambios en los archivos.

### Ejecutar (Modo Producción)

La otra alternativa es compilar en modo producción, para esto se utiliza el siguiente comando:
```
npm run build
```
Una vez compilado, se creará la carpeta `build` con nuestra app lista para ser puesta en un servidor.

Cabe destacar que se deberá configurar el servidor para que todas las URLs dirijan a `index.html` ya que este es el punto de entrada de nuestra página web.

## Dependencias

Esta es una lista de las dependencias principales del proyecto.

### React

Como ya se mencionó anteriormente esta aplicación fue hecha a partir de [`create-react-app`][create-react-app] sin embargo React fue actualizado a la version [experimental 18.0.0][react].

La razón siendo que esta versión cuenta con funcionalidades como [Suspense][suspense] y Concurrent Mode que facilitan el desarrollo de aplicaciones que deben esperar a una API para renderizar sus páginas.

Es decir que esta aplicación se beneficia de Suspense simplificando el código necesario para para mostrar pantallas de carga.


### TypeScript

Este proyecto fue desarrollado al 100% en [TypeScript][typescript], esto se logró utilizando el [template de TypeScript][typescript-template] provisto por `create-react-app`.

Cabe destacar que se modificó la configuración para hacer uso del modo estricto con `strict: true` y otras funciones provistas por TypeScript.
### Chakra UI

La siguiente dependencia más usada de este proyecto es [Chakra][chakra], un conjunto de componentes muy completo que se pueden personalizar con facilidad. Toda la interfáz de usuario fue hecha con estos componentes.

De hecho las unicas 2 librerías que se agregaron fueron [`react-icons`][react-icons] para los iconos usados en la interfaz y [`formik`][formik] para el manejo de formularios (en particular el formulario de órdenes)

Chakra a su vez depende de [`emotion`][emotion] y [`framer-motion`][framer-motion] sin embargo estas no fueron usadas directamente, sino a travez de Chakra.

### React Router

Para poder navegar a través de la página de una manera más rápida, se utiliza [React-Router][react-router], en este caso tambien se utiliza la version 6.0.0 que está actualmente en beta.

Esta versión permite utilizar Suspense para hacer [lazy-loading de rutas][lazy-loading] (es decir que solo se cargan las rutas necesarias y no toda la aplicación completa).

### Reactfire

Para interactuar con Firebase se utiliza [Reactfire][reactfire], esta librería provee una serie de Hooks y Contexts que permiten interactuar con Firebase de una forma más nativa a React.

Sin embargo la verdadera razón de su uso es la posibilidad de usar [Suspense][suspense] mientras se cargan los resultados de Firebase.

Esta librería fuerza a usar la version 9 de Firebase, por lo que se adopta la [API modular][firebase9] de Firestore.

### SWR

Por ultimo [SWR][swr] o State-while-revalidate provee un Hook llamado useSWR que permite hacer pedidos asincrónicos y obtener los resultados facilmente, empleando un cache interno para no pedir un mismo resultado dos veces.

Esta librería se integra muy bien con [Suspense][suspense] lo cual facilita mucho su uso.

Se utilizó para hacer mocks a una API ficticia antes de incorporar Firebase, y se utiliza, en la versión final, para la carga asincrónica de las imágenes de la página.

## Por Mejorar

Aún quedan cosas por mejorar, esta es una lista de cosas que me gustarían implementar en un futuro.

### Busqueda

La barra de busqueda no es funcional, la idea era implementar [Algolia Search][algolia] para realizar una busqueda en los productos de la página.

### Wishlist

Que el usuario pueda marcar sus productos favoritos y añadirlos al carrito desde su Wishlist personal

### Firebase Function

Me gustaría que la orden de compra se realizara en una [función de Firebase][cloud-function], permitiendo así que el cliente no ejecute el código de actualización de stock y que el precio se garantice desde el backend.

Esto permitiría que las reglas sean más estrictas y el cliente solo tenga permisos de escritura.

La función haría lo que [`useSaveOrder`][useSaveOrder] hace actualmente y devolvería el ID de la orden en un objeto JSON.

### Validación

El formulario de orden de compra podría contar con validación de campos, en especial los referidos a e-mail y teléfono.

### Contacto

Me gustaría agregar un formulario de contacto y linkearlo en un footer.

Este formulario guardaría la información en Firebase y contaría con un CAPTCHA para evitar el spam.

### Mejorar vistas

La vista de orden de compra no es completamente responsive.

Añadir una opción al modal de orden de compra para que aún con una cuenta iniciada se pueda comprar con otros datos.

## Licencia

Copyright (c) 2021 - Pablo Ariel Mayobre


[create-react-app]: https://create-react-app.dev/
[react]: https://es.reactjs.org/blog/2021/06/08/the-plan-for-react-18.html
[suspense]: https://es.reactjs.org/docs/concurrent-mode-suspense.html
[typescript]: https://typescriptlang.org/
[typescript-template]: https://create-react-app.dev/docs/adding-typescript/
[chakra]: https://chakra-ui.com/
[react-icons]:https://react-icons.github.io/react-icons/
[formik]:https://formik.org/
[emotion]:https://emotion.sh/docs/introduction
[framer-motion]:https://www.framer.com/motion/
[react-router]:https://github.com/remix-run/react-router/blob/dev/docs/installation/getting-started.md
[lazy-loading]:https://reactjs.org/docs/code-splitting.html
[reactfire]:https://github.com/FirebaseExtended/reactfire
[firebase9]:https://firebase.google.com/docs/web/modular-upgrade
[swr]:https://swr.vercel.app/
[algolia]:https://www.algolia.com/
[cloud-function]:https://firebase.google.com/docs/functions
[useSaveOrder]:https://github.com/pablomayobre/tienda-coderhouse/blob/main/src/api/useSaveOrder.ts#L35-L105