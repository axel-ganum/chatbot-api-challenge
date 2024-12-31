# Chatbot Sushi - Backend

Este es un backend desarrollado para gestionar un chatbot que permite a los usuarios consultar el menú, realizar pedidos y obtener información sobre el estado del restaurante (horarios).

## **Tecnologías Utilizadas**
- **Node.js** con **Express**: Framework para el desarrollo del servidor.
- **MongoDB**: Base de datos para almacenar el menú y los pedidos.
- **Mongoose**: ORM para la interacción con MongoDB.
- **dotenv**: Manejo de variables de entorno.
- **Jest y Supertest**: Para pruebas automatizadas de las rutas y controladores.
- **Babel**: Soporte para ES6 en jest.

---

## **Características del Proyecto**
1. **Consultar Menú:** Permite obtener la lista de platillos disponibles.
2. **Realizar Pedidos:** Crea pedidos con cliente, productos y total.
3. **Responder Preguntas:** Informa si el restaurante está abierto o cerrado, y da detalles de horarios.

---

## **Instalación**

### **Requisitos Previos**
- Node.js (v18 o superior).
- MongoDB configurado localmente.

### **Instrucciones**
1. Clona este repositorio:

   ```bash

   git clone https://github.com/axel-ganum/chatbot-api-challenge.git
   


2. **Instalar Dependencias**

   ```bash

    npm install

3. **Configurar las variables de entorno**

   ```bash

   MONGO_URI=<TU_URI_DE_MONGODB>

    ```

Podes configurar los horarios de apertura y cierre de la aplicación utilizando las siguientes variables de entorno en el archivo `.env`.

### Variables:

- `HORARIO_APERTURA`: Define la hora de apertura de la aplicación. El valor predeterminado es `12` (12 PM).
- `HORARIO_CIERRE`: Define la hora de cierre de la aplicación. El valor predeterminado es `23` (11 PM).




### **Para inicaiar el servidor**
    
```bash
  npm run dev
```

### **Para ejecutar los test**
    
 ```bash
  npm test
 ```
---

## **Tipos de Mensajes que el Bot Entiende**

El bot puede responder a las siguientes preguntas relacionadas con horarios y disponibilidad:

### **Estado actual del restaurante:**
- `"¿Están abiertos ahora?"`
- `"¿Está abierto?"`

### **Horarios de apertura:**
- `"¿A qué hora abren?"`
- `"¿Cuándo abren?"`


### **Horarios de cierre:**
- `"¿A qué hora cierran?"`
- `"¿Cuándo cierran?"`
- `"Hasta qué hora están"`
- `"Qué hora cierran"`

Si el mensaje no coincide con estos ejemplos, el bot responderá con un mensaje de error como este:

```json
{
   "status": "error",
   "mensaje": "No entiendo la pregunta. ¿Queres saber si estamos abiertos?"
}
```


## **Datos de Ejemplo para MongoDB**

El proyecto incluye un script que carga datos iniciales del menú en MongoDB. Estos datos representan los productos disponibles en el chatbot.

### **Datos de Ejemplo**

El menú contiene los siguientes productos:
```javascript
        
const menu = [
    {
        nombre: "California Roll",
        descripcion: "Rollo de sushi con cangrejo, aguacate y pepino",
        precio: 120,
    },
    {
        nombre: "Spicy Tuna Roll",
        descripcion: "Rollo de sushi con atún picante y mayonesa",
        precio: 140,
    },
    {
        nombre: "Ebi Tempura Roll",
        descripcion: "Rollo con camarón tempura y aguacate",
        precio: 160,
    },
    {
        nombre: "Salmon Nigiri",
        descripcion: "Porción de arroz con una lonja de salmón fresco",
        precio: 90,
    },
    {
        nombre: "Rainbow Roll",
        descripcion: "Rollo de sushi decorado con diferentes tipos de pescado y aguacate",
        precio: 180,
    },
    {
        nombre: "Veggie Roll",
        descripcion: "Rollo vegetariano con zanahoria, aguacate, y pepino",
        precio: 100,
    },
    {
        nombre: "Dragon Roll",
        descripcion: "Rollo con anguila, aguacate y topping de salsa unagi",
        precio: 200,
    },
    {
        nombre: "Miso Soup",
        descripcion: "Sopa tradicional japonesa con tofu, alga wakame y cebolleta",
        precio: 50,
    },
    {
        nombre: "Gyozas de Cerdo",
        descripcion: "Dumplings rellenos de cerdo servidos con salsa ponzu",
        precio: 80,
    },
    {
        nombre: "Sashimi Variado",
        descripcion: "Selección de cortes finos de pescado fresco",
        precio: 250,
    },
    {
        nombre: "Edamame",
        descripcion: "Frijoles de soya al vapor con sal marina",
        precio: 60,
    },
];
 
```
### **Paso para cargar los datos:** 
Ejecuta el siguiente comando en tu terminal para cargar los datos iniciales en la base de datos: 

``` bash
     node src/seedMenu.js
```
## **Endpoints Disponibles**

El chatbot expone los siguientes endpoints para interactuar con el sistema:

 ---

   ### **1. `/menu`**

 - **Método:** `GET`
 - **Descripción:** Devuelve el menú completo de productos disponibles.


 - **Ejemplo de Respuesta Exitosa:**
    ```json
    [
    {
      "_id": "63f18f9a7b8e9c42a4d4c6c9",
      "nombre": "California Roll",
      "descripcion": "Rollo de sushi con cangrejo, aguacate y pepino",
      "precio": 120
    },
    {
      "_id": "63f18f9a7b8e9c42a4d4c6ca",
      "nombre": "Spicy Tuna Roll",
      "descripcion": "Rollo de sushi con atún picante y mayonesa",
      "precio": 140
    }
    ]
   ```

  ### **2. `/pedido`**

- **Método:** `POST`
- **Descripción:** Crea un nuevo pedido con la información proporcionada.

---

#### **Cuerpo de la Solicitud (JSON):**

```json

   {
  "cliente": "Axel",
  "productos": [
    { "nombre": "California Roll", "cantidad": 2, "precio": 120 },
    { "nombre": "Spicy Tuna Roll", "cantidad": 1, "precio": 140 }
  ]
}
```
### **3. `/status`**

- **Método:** `POST`
- **Descripción:** Responde preguntas relacionadas con horarios.

---

#### **Cuerpo de la Solicitud (JSON):
```json
{
  "pregunta": "¿Están abiertos ahora?"
}
```
## **Manejo de Errores**

A continuación, se describen los errores que pueden ocurrir en cada endpoint y las respuestas asociadas.

---

### **1. `/menu`**

- **Descripción:** Devuelve el menú completo de productos.
- **Error manejado:** Fallo al obtener los datos del menú desde la base de datos.
- **Respuesta de Error:**
  ```json
  {
    "error": "No se pudo obtener el menú"
  }
  ```

  ### **Errores del Endpoint `/pedido`**

- **Descripción:** Permite crear un nuevo pedido en la base de datos.

---

#### **Errores Manejados**

1. **Datos incompletos en la solicitud**
   - **Causa:** El cliente o los productos no se enviaron, o la lista de productos está vacía.
   - **Ejemplo de Solicitud Inválida:**
     ```json
     {
       "productos": []
     }
     ```
   - **Respuesta de Error:**
     ```json
     {
       "error": "Cliente y productos son requeridos"
     }
     ```
   - **Código de estado:** `400 Bad Request`

---

2. **Error interno al guardar el pedido**
   - **Causa:** Ocurrió un problema inesperado al intentar guardar el pedido en la base de datos.
   - **Ejemplo de Solicitud Válida:**
     ```json
     {
       "cliente": "Axel",
       "productos": [
         { "nombre": "California Roll", "cantidad": 2, "precio": 120 },
         { "nombre": "Spicy Tuna Roll", "cantidad": 1, "precio": 140 }
       ]
     }
     ```
   - **Respuesta de Error:**
     ```json
     {
       "error": "Error interno del servidor"
     }
     ```
   - **Código de estado:** `500 Internal Server Error`

---

#### **Notas Adicionales**
- El backend valida que los datos enviados en el cuerpo de la solicitud incluyan:
  - El nombre del cliente.
  - Una lista de productos con sus cantidades y precios.
- Si no se proporcionan estos datos o están incompletos, el servidor devuelve un error con un mensaje claro.
- Para evitar errores internos, verifica que la base de datos esté conectada correctamente antes de realizar solicitudes.


 
 ### **Errores del Endpoint `/status`**

- **Descripción:** Responde preguntas relacionadas con horarios y disponibilidad del restaurante.

---

#### **Errores Manejados**

1. **Pregunta no relacionada o irreconocible**
   - **Causa:** La pregunta enviada no contiene palabras clave relacionadas con horarios o disponibilidad.
   - **Ejemplo de Solicitud:**
     ```json
     {
       "pregunta": "¿Cómo está el clima hoy?"
     }
     ```
   - **Respuesta de Error:**
     ```json
     {
       "status": "error",
       "mensaje": "No entiendo la pregunta. ¿Queres saber si estamos abiertos?"
     }
     ```
   - **Código de estado:** `400 Bad Request`

---

#### **Notas Adicionales**
- El bot responde preguntas relacionadas con los horarios del restaurante, considerando el horario predeterminado de **12:00 PM a 11:00 PM**.
- Si se desea ajustar estos horarios, se pueden configurar en las variables de entorno de la siguiente manera:
  ```plaintext
  HORARIO_APERTURA=12
  HORARIO_CIERRE=23
  




