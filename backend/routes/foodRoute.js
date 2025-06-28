import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) // unique file name
    }
})

const upload = multer({storage: storage}) // stores images in "uploads" folder

foodRouter.post("/add", upload.single("image"), addFood) // http://localhost:5000/api/food/add
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter;