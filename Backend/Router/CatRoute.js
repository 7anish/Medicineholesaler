const express = require('express');
const route = express.Router()

const cat = [
    {
        "category": "cosmetic",
        "img": "pencil-outline",
        "bg": "#ffe4e1",
        "text": "#ff6347",
        "subcat": [
            {
                "name": "hair-care",
                "route": "cosmetic/hair-care",
                "bg": "#ffe8e8",
                "icon": "cut-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "oral-care",
                "route": "cosmetic/oral-care",
                "bg": "#ffe8e8",
                "icon": "happy-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "sexual-wellness",
                "route": "cosmetic/sexual-wellness",
                "bg": "#ffe8e8",
                "icon": "heart-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "skin-care",
                "route": "cosmetic/skin-care",
                "bg": "#ffe8e8",
                "icon": "rose-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "feminine-care",
                "route": "cosmetic/feminine-care",
                "bg": "#ffe8e8",
                "icon": "woman-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "baby-care",
                "route": "cosmetic/baby-care",
                "bg": "#ffe8e8",
                "icon": "happy-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "elderly-care",
                "route": "cosmetic/elderly-care",
                "bg": "#ffe8e8",
                "icon": "accessibility-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "men-grooming",
                "route": "cosmetic/men-grooming",
                "bg": "#ffe8e8",
                "icon": "man-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "other",
                "route": "cosmetic/other",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#ff6347"
            }
        ]
    },
    {
        "category": "surgical",
        "img": "cut-outline",
        "bg": "#edfefff8",
        "text": "#2dd1dd",
        "subcat": [
            {
                "name": "bandage",
                "route": "surgical/bandage",
                "bg": "#ffe8e8",
                "icon": "bandage-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "sugar-care-&-bp-machine",
                "route": "surgical/sugar-care-&-bp-machine",
                "bg": "#ffe8e8",
                "icon": "pulse-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "syringe",
                "route": "surgical/syringe",
                "bg": "#ffe8e8",
                "icon": "medkit-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "injection",
                "route": "surgical/injection",
                "bg": "#ffe8e8",
                "icon": "flash-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "other",
                "route": "surgical/other",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#2dd1dd"
            }
        ]
    },
    {
        "category": "patent-medicine",
        "img": "medkit-outline",
        "bg": "#ffe8e8",
        "text": "#ff4500",
        "subcat": []
    },
    {
        "category": "generic-medicine",
        "img": "bandage-outline",
        "bg": "#f0fff0",
        "text": "#32cd32",
        "subcat": []
    },
    {
        "category": "ayurvedic-medicine",
        "img": "leaf-outline",
        "bg": "#f5fffa",
        "text": "#228b22",
        "subcat": []
    }
]

route.get('/getcategory', (req, res) => {
    try {
        if(req.query.category === "allcategory") return res.status(200).json(cat)
        const param =  cat.find((item)=>{
            return item.category === req.query.category
        });
        console.log(param)
        return res.status(200).json([param])
    } catch (e) {
        console.log(e)
        return res.status(400).json({ "Error": "Bad request" })
    }
})

module.exports = route