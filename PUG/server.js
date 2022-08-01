import { Contenedor, Product } from "./controllers/index.js";
import express from "express";
import Router from "express";


const app = express();
const router = Router();


//Seteo motor de plantillas y carpeta contenedora
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get('/', (req, res)=>{
  res.render('form.pug');
});

////Instancio la clase
const productos = new Contenedor(); 
let producto1= new Product("Cargador",2500,"https://cdn4.iconfinder.com/data/icons/web-essential-4/64/31-web_essential-128.png")
let producto2= new Product("Mouse",1000,"https://cdn3.iconfinder.com/data/icons/computer-51/100/computer_10-128.png")
let producto3= new Product("Monitor",7000,"https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-37-128.png")
// productos.save(producto1);
// productos.save(producto2);
// productos.save(producto3);

//ROUTER

//Trae el array completo
router.get("/productos", (req, res) => {
  let products=productos.getAll();
  res.render('table.pug',{products: products});
});

//Trae un producto por id
router.get("/productos/:id", (req, res) => {
  res.json(productos.getByID(req.params.id));
});

//Agrega un elemento al array, y devuelvo el id
router.post("/productos", (req, res) => {
  console.log(req.body);
  let id = productos.save(req.body);
});

//Actualiza un elemento segun id
router.put("/productos/:id", (req, res) => {
  res.json(productos.editById(req.params.id, req.body));
});

//Elimino un elemento por id
router.delete("/productos/:id", (req, res) => {
  res.json(productos.deleteById(req.params.id));
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));
